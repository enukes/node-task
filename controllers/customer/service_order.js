const ResponseService = require('../../common/response');
const CustomerService = require('../../services/customer');
const cryptoRandomString = require('crypto-random-string');
const messages = require('../../common/messages');
const apiError = require('../../common/api-errors');
const ServicesService = require('../../services/service');
const ServiceProviderService = require('../../services/service_provider');
const ServiceOrderService = require('../../services/service_order');
const ConfigService = require('../../services/config');
const SlotService = require('../../services/slot');
const notificationMessages = require('../../common/notification-messages');
const HelperService = require('../../common/helper');
const MailerService = require('../../common/mailer');
const mongoose = require('mongoose');
const requestPromise = require('request-promise');

const ServiceOrderController = {
  async placeServiceOrder(req, res) {
    try{
      const request = {...req.body };
      const type = ServiceOrderController.getUserType(req.baseUrl);
      const userId = type === 1 ? req.body.user_id : req._userInfo._user_id;
      const orderDetails = {};
      const customer = await CustomerService.getCustomer({ _id: userId });

      if (!customer) {
        throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);
      }

      if (!request.address_id) {
        throw new apiError.ValidationError('address_id', messages.ADDRESS_ID_REQUIRED);
      }
      
      if (!request.service_provider_address_id) {
        throw new apiError.ValidationError('service_provider_address_id', messages.ADDRESS_ID_REQUIRED);
      }

      const address = customer.address.find((customerAddress) => (
        customerAddress._id.toString() === request.address_id
      )) || {};

      if (!Object.keys(address).length) {
        throw new apiError.ValidationError('address_id', messages.ADDRESS_ID_INVALID);
      }

      orderDetails.address = {};
      orderDetails.address.delivery = address;
      if (!request.service_provider_id)  {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_PROVIDER_ID_INVALID);
      }

      const serviceProvider = await ServiceProviderService.getServiceProvider({ _id: request.service_provider_id });
      if (!serviceProvider)  {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_PROVIDER_ID_INVALID);
      }
      if (!request.slot_id )  {
        throw new apiError.ValidationError('slot_id', messages.SLOT_ID_REQUIRED);
      }

      const adminConfig = await ConfigService.getConfig();

      if (request.slot_id) {
        const slot = await SlotService.getSlot({ _id: request.slot_id, store_id: serviceProvider._id });
        if (!slot)  {
          throw new apiError.ValidationError('slot_id', messages.SLOT_ID_INVALID);
        }

        if (slot.status === 2) {
          throw new apiError.ValidationError('slot_id', messages.SLOT_INACTIVE);
        }

        if (slot.ordersCount >= adminConfig.per_slot_order_limit)  {
          throw new apiError.ValidationError('slot', messages.SLOT_FULL);
        }

        const slotOrderCount = slot.ordersCount + 1;
        const updateSlot = await SlotService.updateSlot(
          { _id: request.slot_id },
          { ordersCount: slotOrderCount }
        );
        if (!updateSlot) {
          throw new apiError.ValidationError('slot_id', messages.SLOT_ID_INVALID);
        }

        orderDetails.slot_id = request.slot_id;
        orderDetails.deliver_start_time = slot.start_time;
        orderDetails.deliver_end_time = slot.end_time;
      } else {
        orderDetails.deliver_start_time = moment().toISOString();
        orderDetails.deliver_end_time = moment().add(2, 'h').toISOString();
        orderDetails.is_express_delivery = true;
      }

      orderDetails.customer_id = userId;
      orderDetails.service_provider_id = request.service_provider_id;

      const isServiceProviderAddressValid = serviceProvider.address.some((serviceProviderAddress) => {
        if (serviceProviderAddress._id.toString() === request.service_provider_address_id) {
          orderDetails.address.pickup = JSON.parse(JSON.stringify(serviceProviderAddress));
          return true;
        }
        return false;
      });

      if (!isServiceProviderAddressValid)  {
        throw new apiError.ValidationError('service_provider_address_id', messages.SERVICE_PROVIDER_ID_INVALID);
      }

      const areServicesPresent = !!request.services
        && Array.isArray(request.services)
        && request.services.every((serviceProvider) => (
          !!serviceProvider && !!serviceProvider.size && !!serviceProvider.price 
        ));

      if (!areServicesPresent) {
        throw new apiError.ValidationError('services', messages.SERVICES_REQUIRED);
      }

      orderDetails.services = [];
      orderDetails.total_amount = 0;
      const invalidQuantityProducts = [];
      const maxOrderExceedingProducts = [];

      for (let i = 0; i < request.services.length; i++) {
        const service = request.services[i];

        if (!service._id) {
          throw new apiError.ValidationError('service_id', messages.SERVICE_ID_REQUIRED);
        }

        if (!service.count) {
          throw new apiError.ValidationError('service_count', messages.COUNT_REQUIRED);
        }
        if (service.count <= 0) {
          throw new apiError.ValidationError('service_count', messages.COUNT_GREATER_THAN_0);
        }
        if (!HelperService.isValidMongoId(service._id)) {
          throw new apiError.ValidationError('id', messages.ID_INVALID);
        }

        const serviceDetail = await ServicesService.getService({
          _id: service._id,
          service_provider_id: request.service_provider_id
        });
        if (!serviceDetail) {
          throw new apiError.ValidationError('service_id', messages.ID_INVALID);
        }

        if (service.count > serviceDetail.stock_quantity) {
          invalidQuantityProducts.push({
            _id: service._id,
            stock_quantity: serviceDetail.stock_quantity,
            quantity_ordered: service.count
          });
        }

        const orderMax = serviceDetail.order_max ? serviceDetail.order_max : 30;

        if (service.count > orderMax) {
          maxOrderExceedingProducts.push({
            _id: service._id,
            quantity_ordered: service.count,
            max_order_limit: orderMax
          });
        }

        orderDetails.services.push({
          service_id: serviceDetail._id,
          pictures: serviceDetail.pictures,
          size: serviceDetail.size,
          price: serviceDetail.price.sale_price,
          stock_quantity: serviceDetail.stock_quantity,
          count: service.count,
          name: serviceDetail.name
        });

        orderDetails.total_amount += (serviceDetail.price.sale_price * service.count);
  
          }

      const { taxes } = adminConfig;
      let totalAmountAfterTax = orderDetails.total_amount;

      orderDetails.taxes = [];
      taxes.forEach((tax) => {
        const value = (Number(tax.percentage) * orderDetails.total_amount) / 100;
        totalAmountAfterTax += value;
        orderDetails.taxes.push({
          name: tax.name,
          value
        });
      });
      orderDetails.total_amount_after_tax = totalAmountAfterTax;

      let coupon;
      if (request.coupon_id) {
        coupon = await CouponService.getCoupon({ _id: request.coupon_id });
        if (!coupon || coupon.status === 2) {
          throw new apiError.ValidationError('coupon_id', messages.COUPON_ID_INVALID);
        }

        if (coupon.usage < 1)  {
          throw new apiError.ValidationError('coupon_id', messages.COUPON_ID_INVALID);
        }

        if (orderDetails.total_amount < coupon.min_order_amount)  {
          throw new apiError.ValidationError('coupon_code', `This coupon can only be applied on amount  ${coupon.min_order_amount} PKR or greater`);
        }

        orderDetails.coupon = coupon;

        const couponCopy = JSON.parse(JSON.stringify(coupon));

        const { value } = couponCopy;
        delete couponCopy.store;
        delete couponCopy.created_at;
        delete couponCopy.updated_at;

        if (couponCopy.type === 1) {
          orderDetails.discount = value;
        }
        else {
          orderDetails.discount = (value * orderDetails.total_amount) / 100;
        }
      }

      if (invalidQuantityProducts.length > 0) {
        throw new apiError.ModelValidationError({ message: 'Some Products Are Not Available Right Now', outOfStockProducts: invalidQuantityProducts });
      }
      if (maxOrderExceedingProducts.length > 0) {
        throw new apiError.ModelValidationError({ message: 'Some Products have exceeded their max order limit', maxorderExceededProducts: maxorderExceedingProducts });
      }

      orderDetails.commission_percentage = serviceProvider.commission;

      const afterDiscountPrice = orderDetails.total_amount - (orderDetails.discount || 0);

      orderDetails.admin_commission_amount = (
        orderDetails.commission_percentage * afterDiscountPrice
      ) / 100;
      orderDetails.service_provider_payout_amount = orderDetails.total_amount_after_tax
        - (orderDetails.discount || 0)
        - orderDetails.admin_commission_amount;

      let uniqueId;


      // eslint-disable-next-line no-constant-condition
      while (1) {
        uniqueId = cryptoRandomString({ length: 7 });

        const order = await ServiceOrderService.getServiceOrder({ service_order_id: uniqueId });
        if (!order) break;
        // eslint-disable-next-line no-continue
        else continue;
      }
      orderDetails.service_order_id = uniqueId;

      const serviceOrder = await ServiceOrderService.addOrder(orderDetails);

      (async () => {
        const notification = notificationMessages.orderStatusChange({
          title: 'Your Order Is Placed',
          orderId: serviceOrder.order_id,
          status: 'has been placed'
        });

        const notificationPayloadData = {
          type: config.notificationTypes.orderStatusChange,
          createdAt: moment.utc().toISOString(),
          notificationTitle: notification.title,
          notificationBody: notification.body,
          order_id: serviceOrder.order_id,
          orderStatus: `${order.status}`
        };

        PushNotification.notifySingleDevice(
          customer.fcm_token,
          notification,
          notificationPayloadData
        );
      })();
      MailerService.sendPlacedServiceOrderToCustomer({
        serviceOrder,
        customer,
        subject: `Order Status Update for: ${`${serviceOrder.order_id}`.toUpperCase()}`,
        orderStatusString: `Your order has been confirmed with order id ${`${serviceOrder.order_id}`.toUpperCase()}`
      });
      return res.status(200).send(ResponseService.success({ serviceOrder }));
      }
    catch(error) {
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }
  },

  async getServiceOrders (req, res) {
    try{
      const userId = req._userInfo._user_id;

      const customer = await CustomerService.getCustomer({ _id: userId });

      if (!customer) {
        throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);
      }

      let sort;
      if (req.query.name) sort = { [req.query.name]: Number(req.query.sortType) };

      const search = req.query.search || '';
      let orders;

      let { pageNo } = req.query;
      if (!pageNo) {
        if (search) {
          const request = {
            customer_id: mongoose.Types.ObjectId(userId),
            service_provider_id: mongoose.Types.ObjectId(search)
          };
          orders = await ServiceOrderService.getOrders(request, sort);
        } else {
          orders = await ServiceOrderService.getOrders(
            { customer_id: mongoose.Types.ObjectId(userId) },
            sort
          );
        }
        return res.status(200).send(ResponseService.success({ orders }));
      }

      pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);

      let orderCount;
      if (search) {
        const request = {
          customer_id: mongoose.Types.ObjectId(userId),
          service_provider_id: mongoose.Types.ObjectId(search)
        };
        orders = await ServiceOrderService.getOrders(request, sort, pageNo, perPage);

        orderCount = await ServiceOrderService.getTotalOrdersCount(request);
      } else {
        orders = await ServiceOrderService.getOrders(
          { customer_id: mongoose.Types.ObjectId(userId) },
          sort,
          pageNo,
          perPage
        );
        orderCount = await ServiceOrderService.getTotalOrdersCount({
          customer_id: mongoose.Types.ObjectId(userId)
        });
      }

      return res.status(200).send(ResponseService.success({ orders, totalCount: orderCount }));
    }
    catch(error) {
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }
  },

  getUserType(url) {
    const type = url.split('/')[2];

    switch (type) {
      case 'admin':
        return 1;
      case 'store':
        return 2;
      case 'customer':
        return 3;
      case 'driver':
        return 4;
      default:
        return 0;
    }
  }
};
module.exports = ServiceOrderController;

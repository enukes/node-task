/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const moment = require('moment-timezone');
const cryptoRandomString = require('crypto-random-string');
const mongoose = require('mongoose');
const CustomerService = require('../../services/customer');
const AreaService = require('../../services/area');
const StoreService = require('../../services/store');
const SlotService = require('../../services/slot');
const ProductService = require('../../services/product');
const ConfigService = require('../../services/config');
const OrderService = require('../../services/order');
const CouponService = require('../../services/coupon');
const DriverService = require('../../services/driver');
const HelperService = require('../../common/helper');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');
const PushNotification = require('../../common/push-notification');
const InvoiceService = require('../../common/invoice/invoicePdf');
const MailerService = require('../../common/mailer');
const notificationMessages = require('../../common/notification-messages');
const crypto = require('crypto');
const OrderController = {

  async placeOrder(req, res) {
    try {
      const request = { ...req.body };
      const type = OrderController.getUserType(req.baseUrl);
      const userId = type === 1 ? req.body.user_id : req._userInfo._user_id;
      const orderDetails = {};

      const customer = await CustomerService.getCustomer({ _id: userId });
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      if (!request.address_id) throw new apiError.ValidationError('address_id', messages.ADDRESS_ID_REQUIRED);
    
      if (!request.store_address_id) throw new apiError.ValidationError('store_address_id', messages.ADDRESS_ID_REQUIRED);

      const address = customer.address.find((customerAddress) => (
        customerAddress._id.toString() === request.address_id
      )) || {};

      if (!Object.keys(address).length) throw new apiError.ValidationError('address_id', messages.ADDRESS_ID_INVALID);

      orderDetails.address = {};
      orderDetails.address.delivery = address;

      if (!request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);

      const store = await StoreService.getStore({ _id: request.store_id });
      if (!store) throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);

      if (!request.slot_id && !request.is_express_delivery) throw new apiError.ValidationError('slot_id', messages.SLOT_ID_REQUIRED);

      if (!store.has_express_delivery && request.is_express_delivery) throw new apiError.ValidationError('express_Delivery', messages.STORE_DOESNT_SUPPORT_EXPRESS_DELIVERY);

      const adminConfig = await ConfigService.getConfig();

      if (request.slot_id) {
        const slot = await SlotService.getSlot({ _id: request.slot_id, store_id: store._id });
        if (!slot) throw new apiError.ValidationError('slot_id', messages.SLOT_ID_INVALID);

        if (slot.status === 2) throw new apiError.ValidationError('slot_id', messages.SLOT_INACTIVE);

        if (slot.ordersCount >= adminConfig.per_slot_order_limit) throw new apiError.ValidationError('slot', messages.SLOT_FULL);

        const slotOrderCount = slot.ordersCount + 1;
        const updateSlot = await SlotService.updateSlot(
          { _id: request.slot_id },
          { ordersCount: slotOrderCount }
        );
        if (!updateSlot) throw new apiError.ValidationError('slot_id', messages.SLOT_ID_INVALID);

        orderDetails.slot_id = request.slot_id;
        orderDetails.deliver_start_time = slot.start_time;
        orderDetails.deliver_end_time = slot.end_time;
      } else {
        orderDetails.deliver_start_time = moment().toISOString();
        orderDetails.deliver_end_time = moment().add(2, 'h').toISOString();
        orderDetails.is_express_delivery = true;
      }

      orderDetails.is_delivered_by_store = store.self_delivery;
      orderDetails.customer_id = userId;
      orderDetails.store_id = request.store_id;

      const isStoreAddressValid = store.address.some((storeAddress) => {
        if (storeAddress._id.toString() === request.store_address_id) {
          orderDetails.address.pickup = JSON.parse(JSON.stringify(storeAddress));
          return true;
        }
        return false;
      });

      if (!isStoreAddressValid) throw new apiError.ValidationError('store_address_id', messages.STORE_ADDRESS_ID_INVALID);

      const areProductsPresent = !!request.products
        && Array.isArray(request.products)
        && request.products.every((products) => (
          !!products && !!products.variants && products.variants.length > 0
        ));

      if (!areProductsPresent) throw new apiError.ValidationError('products', messages.PRODUCTS_REQUIRED);

      orderDetails.products = [];

      orderDetails.total_amount = 0;

      const invalidQuantityProducts = [];
      const maxOrderExceedingProducts = [];

      for (let i = 0; i < request.products.length; i++) {
        const product = request.products[i];

        if (!product._id) throw new apiError.ValidationError('product_id', messages.PRODUCT_ID_REQUIRED);
        if (!HelperService.isValidMongoId(product._id)) throw new apiError.ValidationError('id', messages.ID_INVALID);

        const productDetail = await ProductService.getProduct({
          _id: product._id,
          store_id: request.store_id
        });
        if (!productDetail) throw new apiError.ValidationError('product_id', messages.ID_INVALID);

        let productVariants = productDetail.variants.filter((dbVariant) => (
          product.variants.some((rqVariant) => (dbVariant._id.toString() === rqVariant._id))
        ));
        productVariants = productVariants.map((productVariant, index) => ({
          ...productVariant.toObject(),
          count: product.variants[index].count
        }));

        const finalProductVariants = productVariants.map((variant) => {
          if (!variant.count) throw new apiError.ValidationError('variant_count', messages.COUNT_REQUIRED);
          if (variant.count <= 0) throw new apiError.ValidationError('variant_count', messages.COUNT_GREATER_THAN_0);

          if (variant.count > variant.stock_quantity) {
            invalidQuantityProducts.push({
              _id: variant._id,
              stock_quantity: variant.stock_quantity,
              quantity_ordered: product.count
            });
          }

          const orderMax = variant.order_max ? variant.order_max : 30;

          if (variant.count > orderMax) {
            maxOrderExceedingProducts.push({
              _id: variant._id,
              quantity_ordered: variant.count,
              max_order_limit: orderMax
            });
          }
          orderDetails.total_amount += (variant.price.sale_price * variant.count);
          return {
            size: variant.size,
            count: variant.count,
            price: variant.price.sale_price,
            variant_id: variant._id
          };
        });

        orderDetails.products.push({
          product_id: productDetail._id,
          pictures: productDetail.pictures,
          variants: finalProductVariants,
          name: productDetail.name
        });
      }

      if (invalidQuantityProducts.length > 0) {
        throw new apiError.ModelValidationError({ message: 'Some Products Are Not Available Right Now', outOfStockProducts: invalidQuantityProducts });
      }
      if (maxOrderExceedingProducts.length > 0) {
        throw new apiError.ModelValidationError({ message: 'Some Products have exceeded their max order limit', maxOrderExceedingProducts });
      }

      const { taxes } = adminConfig;

      let totalAmountAfterTax = orderDetails.total_amount;
     

      const { delivery_charges: deliveryCharges } = store;

      // for (let i = 0; i < deliveryCharges.length; i++) {
      //   if (orderDetails.total_amount < deliveryCharges[i].order_amount) {
      //     orderDetails.delivery_charges = deliveryCharges[i].charges;
      //     break;
      //   }
      // }
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
        if (!coupon || coupon.status === 2) throw new apiError.ValidationError('coupon_id', messages.COUPON_ID_INVALID);

        if (coupon.usage < 1) throw new apiError.ValidationError('coupon_id', messages.COUPON_ID_INVALID);

        if (orderDetails.total_amount < coupon.min_order_amount) throw new apiError.ValidationError('coupon_code', `This coupon can only be applied on amount  INR ${coupon.min_order_amount} or greater`);

        orderDetails.coupon = coupon;

        const couponCopy = JSON.parse(JSON.stringify(coupon));

        const { value } = couponCopy;
        delete couponCopy.store;
        delete couponCopy.created_at;
        delete couponCopy.updated_at;

        if (couponCopy.type === 1) orderDetails.discount = value;
        else orderDetails.discount = (value * orderDetails.total_amount) / 100;
      }

      orderDetails.commission_percentage = store.commission;

      const afterDiscountPrice = orderDetails.total_amount - (orderDetails.discount || 0);

      orderDetails.admin_commission_amount = (
        orderDetails.commission_percentage * afterDiscountPrice
      ) / 100;
      orderDetails.store_payout_amount = orderDetails.total_amount_after_tax
        - (orderDetails.discount || 0)
        - orderDetails.admin_commission_amount;

      let uniqueId;

      // eslint-disable-next-line no-constant-condition
      while (1) {
        uniqueId = cryptoRandomString({ length: 7 });

        const order = await OrderService.getOrder({ order_id: uniqueId });
        if (!order) break;
        // eslint-disable-next-line no-continue
        else continue;
      }
      orderDetails.order_id = uniqueId;
      orderDetails.pickup_code = crypto.randomBytes(4).toString('utf-8');
      orderDetails.delivery_code = crypto.randomBytes(4).toString('utf-8');

      const order = await OrderService.addOrder(orderDetails);
       
      if (!store.self_delivery) {
        DriverService.getStoreDriversFCMArray(store).then((fcmArray) => {
          if (fcmArray.length > 0) PushNotification.notifyMultipleDevices('orderPlace', fcmArray, { order_id: order.order_id });
        });
      }

      // Send push notification to customer's device
      (async () => {
        const notification = notificationMessages.orderStatusChange({
          title: 'Your Order Is Placed',
          orderId: order.order_id,
          status: 'has been placed'
        });

        const notificationPayloadData = {
          type: config.notificationTypes.orderStatusChange,
          createdAt: moment.utc().toISOString(),
          notificationTitle: notification.title,
          notificationBody: notification.body,
          order_id: order.order_id,
          orderStatus: `${order.status}`
        };

        PushNotification.notifySingleDevice(
          customer.fcm_token,
          notification,
          notificationPayloadData
        );
      })();

      // Send the mail to customer
      MailerService.sendPlacedOrderToCustomer({
        order,
        customer,
        subject: `Order Status Update for: ${`${order.order_id}`.toUpperCase()}`,
        orderStatusString: `Your order has been confirmed with order id ${`${order.order_id}`.toUpperCase()}`
      });

       // Send push notification to store's device
       (async () => {
        const notification = notificationMessages.orderPlace({
          title: 'Your Order Is Placed',
          orderId: order.order_id,
          status: 'has been placed'
        });

        const notificationPayloadData = {
          type: config.notificationTypes.orderPlace,
          createdAt: moment.utc().toISOString(),
          notificationTitle: notification.title,
          notificationBody: notification.body,
          order_id: order.order_id,
          orderStatus: `${order.status}`
        };
        if(typeof store.device_token !== 'undefined' && store.device_token){
          PushNotification.notifySingleDevice(
            store.device_token,
            notification,
            notificationPayloadData
          );
        }
      })();


      return res.status(200).send(ResponseService.success({ order }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async getOrders(req, res) {
    try {
      const userId = req._userInfo._user_id;

      const customer = await CustomerService.getCustomer({ _id: userId });
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      let sort;
      if (req.query.name) sort = { [req.query.name]: Number(req.query.sortType) };

      const search = req.query.search || '';
      let orders;

      let { pageNo } = req.query;
      if (!pageNo) {
        if (search) {
          const request = {
            customer_id: mongoose.Types.ObjectId(userId),
            store_id: mongoose.Types.ObjectId(search)
          };
          orders = await OrderService.getOrders(request, sort);
        } else {
          orders = await OrderService.getOrders(
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
          store_id: mongoose.Types.ObjectId(search)
        };
        orders = await OrderService.getOrders(request, sort, pageNo, perPage);

        orderCount = await OrderService.getTotalOrdersCount(request);
      } else {
        orders = await OrderService.getOrders(
          { customer_id: mongoose.Types.ObjectId(userId) },
          sort,
          pageNo,
          perPage
        );
        orderCount = await OrderService.getTotalOrdersCount({
          customer_id: mongoose.Types.ObjectId(userId)
        });
      }

      return res.status(200).send(ResponseService.success({ orders, totalCount: orderCount }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getOrderById(req, res) {
    try {
      const { _user_id: customerId } = req._userInfo;
      const { id: orderId } = req.params;
      if (!orderId) {
        throw new apiError.ValidationError('order_id', messages.ORDER_ID_REQUIRED);
      }
      const request = {
        _id: mongoose.Types.ObjectId(orderId),
        customer_id: mongoose.Types.ObjectId(customerId)
      };
      const order = await OrderService.getOrderWithStoreDetails(request);
      // TODO: change the logic above to get the single order only
      return res.status(200).send(ResponseService.success({ order: order[0] }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async cancelOrder(req, res) {
    try {
      const userId = req._userInfo._user_id;

      const { order_id: orderId } = req.body;
      if (!orderId) throw new apiError.ValidationError('order_id', messages.ORDER_ID_REQUIRED);

      const order = await OrderService.getOrder({ _id: orderId, customer_id: userId });
      if (!order) throw new apiError.ValidationError('order_id', messages.ORDER_ID_INVALID);

      if (order.status !== 1) {
        if (order.status === 2) throw new apiError.ValidationError('order', messages.ORDER_CANNOT_BE_CANCELLED_AFTER_PICKUP);
        if (order.status === 3) throw new apiError.ValidationError('order', messages.ORDER_CANNOT_BE_CANCELLED_AFTER_DELIVERED);
        if (order.status === 4 || order.status === 5) throw new apiError.ValidationError('order', messages.ORDER_CANNOT_BE_CANCELLED_AFTER_CANCELLED);
      }

      const updationObject = {
        status: 5,
        cancelled_by: 'customer'
      };

      const updatedOrder = await OrderService.updateOrder(updationObject, { _id: order._id });

      // Send push notification to driver's device
      (async () => {
        const driver = await DriverService.getDriver({ _id: order.driver_id });
        const notification = notificationMessages.orderCancelled({
          orderId: order.order_id
        });

        const notificationPayloadData = {
          type: config.notificationTypes.orderStatusChange,
          createdAt: moment.utc().toISOString(),
          notificationTitle: notification.title,
          notificationBody: notification.body,
          order_id: orderId,
          orderStatus: `${updatedOrder.status}`
        };
        PushNotification.notifySingleDevice(
          driver.fcm_token,
          notification,
          notificationPayloadData
        );
      })();

      // Send the mail to customer
      (async () => {
        const customer = await CustomerService.getCustomer({
          _id: mongoose.Types.ObjectId(updatedOrder.customer_id)
        });
        MailerService.sendPlacedOrderToCustomer({
          order,
          customer,
          subject: 'Your Order Is Placed',
          orderStatusString: `Your order has been cancelled with order id ${`${order.order_id}`.toUpperCase()}`
        });
      })();

      return res.status(200).send(ResponseService.success({ order: updatedOrder }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getStoreswithCustomer(req, res) {
    try {
      const userId = req._userInfo._user_id;
      const stores = await OrderService.getStoreswithCustomer(userId);

      return res.status(200).send(ResponseService.success({ stores }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getInvoice(req, res) {
    try {
      const orderId = req.params.id;
      if (!orderId) throw new apiError.ValidationError('order_id', messages.ORDER_ID_REQUIRED);

      if (!HelperService.isValidMongoId(orderId)) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const order = await OrderService.getOrder({ _id: mongoose.Types.ObjectId(orderId) });
      if (!order) throw new apiError.ValidationError('order_id', messages.ORDER_ID_INVALID);

      if (order.status !== 3) throw new apiError.ValidationError('order', messages.ORDER_INVOICE_UNAVAILABLE);

      const customer = await CustomerService.getCustomer({ _id: order.customer_id });
      if (!customer) throw new apiError.InternalServerError();

      const pdf = await InvoiceService.generatePDF(order);

      const mail = await MailerService.sendInvoice(order, customer, pdf);

      return res.status(200).send(ResponseService.success({ mail }));
      // let
      // return res.status(200).send(ResponseService.success());
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getInvoiceData(req, res) {
    try {
      const orderId = req.params.id;
      if (!orderId) throw new apiError.ValidationError('order_id', messages.ORDER_ID_REQUIRED);

      if (!HelperService.isValidMongoId(orderId)) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const order = await OrderService.getOrder({ _id: orderId });
      if (!order) throw new apiError.ValidationError('order_id', messages.ORDER_ID_INVALID);

      const customer = await CustomerService.getCustomer({ _id: order.customer_id });
      if (!customer) throw new apiError.InternalServerError();

      const city = await AreaService.getCity({ _id: order.address.delivery.city_id });
      if (!city) throw new apiError.InternalServerError();

      const invoiceNo = HelperService.getInvoiceFromOrder(order.order_id);

      return res.render('layouts/invoice-template', {
        order, customer, moment, city, invoice_no: invoiceNo, config
      });
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async reviewOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const { review } = req.body;
      const rating = Number(req.body.rating);

      if (!orderId) {
        throw new apiError.ValidationError('order_id', messages.ORDER_ID_REQUIRED);
      }
      if (!rating) {
        throw new apiError.ValidationError('rating', 'Rating is required');
      } else if (rating > 5) {
        throw new apiError.ValidationError('rating', 'Rating should be less than or equal to 5');
      }

      const order = await OrderService.getOrder({ _id: orderId });
      if (!order) throw new apiError.ValidationError('order_id', messages.ORDER_ID_INVALID);
      if (order.customer_id.toString() !== req._userInfo._user_id) {
        throw new apiError.UnauthorizedError('Customer id does not match with order');
      }

      const updatedOrder = await OrderService.updateOrder({
        rating,
        review
      }, {
        _id: mongoose.Types.ObjectId(orderId),
        customer_id: req._userInfo._user_id
      });
      return res.status(200).send(ResponseService.success({ order: updatedOrder }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
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
  },

  
};

module.exports = OrderController;

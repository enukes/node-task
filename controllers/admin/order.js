const moment = require('moment-timezone');
const mongoose = require('mongoose');
const OrderService = require('../../services/order');
const DriverService = require('../../services/driver');
const SlotService = require('../../services/slot');
const StoreService = require('../../services/store');
const CustomerService = require('../../services/customer');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');
const PushNotification = require('../../common/push-notification');
const notificationMessages = require('../../common/notification-messages');
const ConfigService = require('../../services/config');
const MailerService = require('../../common/mailer');

module.exports = {
  async getOrders(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const sort = { [req.query.name]: Number(req.query.sortType) };

      const search = req.query.search || '';

      const condition = {};
      const type = req._userInfo._user_type;
      if (type === 2) condition.store_id = mongoose.Types.ObjectId(req._userInfo._user_id);

      const order = await OrderService.getOrdersWithPagination(
        condition,
        pageNo,
        perPage,
        search,
        sort
      );
      const paginationVariables = {
        pageNo,
        perPage
      };
      const totalItems = await OrderService.getTotalOrdersCountForOrderManagement(
        condition,
        search
      );

      paginationVariables.totalItems = totalItems;

      return res.status(200).send(ResponseService.success({ order, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getTodayOrdersCount(req, res) {
    try {
      const condition = {
        created_at: { $gt: moment().startOf('day').toDate(), $lte: moment().endOf('day').toDate() }
      };

      const type = req._userInfo._user_type;
      if (type === 2) condition.store_id = req._userInfo._user_id;

      const ordersCount = await OrderService.getTotalOrdersCount(condition);

      return res.status(200).send(ResponseService.success({ ordersCount }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async updateOrder(req, res) {
    try {
      const request = { ...req.body };
      delete request.created_at;
      delete request.updated_at;
      delete request.store;
      delete request.driver;
      delete request.address.delivery.city;

      request.status = JSON.parse(request.status);

      const { id: orderId } = req.params;

      if (!request.status) throw new apiError.ValidationError('order_details', messages.STATUS_REQUIRED);

      const order = await OrderService.getOrder({ _id: orderId });
      if (!order) throw new apiError.ValidationError('order_id', messages.ORDER_ID_REQUIRED);

      const type = req._userInfo._user_type;
      if (type === 2) {
        if (request.store_id !== req._userInfo._user_id) throw new apiError.ValidationError('store_id', messages.ID_INVALID);
      }

      if (!request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);

      const store = await StoreService.getStore({ _id: request.store_id });
      if (!store) throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);

      if (!request.slot_id && !request.is_express_delivery) throw new apiError.ValidationError('slot_id', messages.SLOT_ID_REQUIRED);

      if (!store.has_express_delivery && request.is_express_delivery) throw new apiError.ValidationError('express_Delivery', messages.STORE_DOESNT_SUPPORT_EXPRESS_DELIVERY);

      if (request.slot_id) {
        const slot = await SlotService.getSlot({ _id: request.slot_id, store_id: store._id });
        if (!slot) throw new apiError.ValidationError('slot_id', messages.SLOT_ID_INVALID);

        if (slot.status === 2) throw new apiError.ValidationError('slot_id', messages.SLOT_INACTIVE);

        request.deliver_start_time = slot.start_time;
        request.deliver_end_time = slot.end_time;
      } else {
        request.deliver_start_time = moment().toISOString();
        request.deliver_end_time = moment().add(2, 'h').toISOString();
        request.is_express_delivery = true;
        request.slot_id = null;
      }

      if (request.driver_id) {
        const driver = await DriverService.getDriver({ _id: request.driver_id });
        if (!driver) throw new apiError.ValidationError('driver_id', messages.DRIVER_ID_REQUIRED);
        request.driver = driver;
      }

      const updateOrder = await OrderService.updateOrder(request, { _id: orderId });

      // send push notification to the driver and the customer
      // if the status of the order has been changed
      if (order.status !== updateOrder.status) {
        (async (orderStatus) => {
          // TODO: Validate that if the status of the order is only unDelivered before
          // then send the push notification
          const customer = await CustomerService.getCustomer({
            _id: mongoose.Types.ObjectId(updateOrder.customer_id)
          });

          const notification = notificationMessages.orderStatusChange({
            orderId: order.order_id,
            status: ((orderStatusInner) => {
              let statusString = '';
              switch (orderStatusInner) {
                case 1:
                  statusString = 'has been placed';
                  break;
                case 2:
                  statusString = 'has been picked up';
                  break;
                case 3:
                  statusString = 'has been delivered';
                  break;
                case 4:
                  statusString = 'is undelivered';
                  break;
                case 5:
                  statusString = 'has been cancelled';
                  break;
                case 6:
                  statusString = 'is ready to deliver';
                  break;
                default:
                  return '';
              }
              return statusString;
            })(orderStatus),
            cancelReason: updateOrder.status === 4 ? updateOrder.undelivered_description : ''
          });

          const notificationPayloadData = {
            type: config.notificationTypes.orderStatusChange,
            createdAt: moment.utc().toISOString(),
            notificationTitle: notification.title,
            notificationBody: notification.body,
            order_id: orderId,
            orderStatus: `${updateOrder.status}`
          };
          PushNotification.notifySingleDevice(
            customer.fcm_token,
            notification,
            notificationPayloadData
          );

          if (updateOrder.driver_id) {
            const driver = await DriverService.getDriver({
              _id: mongoose.Types.ObjectId(updateOrder.driver_id)
            });
            PushNotification.notifySingleDevice(
              driver.fcm_token,
              notification,
              notificationPayloadData
            );
          }

          // Send the mail to customer
          MailerService.sendPlacedOrderToCustomer({
            order: updateOrder,
            customer,
            subject: `Order Status Update for: ${`${order.order_id}`.toUpperCase()}`,
            orderStatusString: notification.body
          });
        })(updateOrder.status);
      }

      if ((order.driver_id || '').toString() !== updateOrder.driver_id.toString()) {
        (async () => {
          // TODO: Validate that if the status of the order is only unDelivered before
          // send the push notification to the driver
          const driver = await DriverService.getDriver({ _id: updateOrder.driver_id });
          const notification = notificationMessages.driverAssigned({
            orderId: updateOrder.order_id
          });

          const notificationPayloadData = {
            type: config.notificationTypes.orderStatusChange,
            createdAt: moment.utc().toISOString(),
            notificationTitle: notification.title,
            notificationBody: notification.body,
            order_id: orderId,
            orderStatus: `${updateOrder.status}`
          };
          PushNotification.notifySingleDevice(
            driver.fcm_token,
            notification,
            notificationPayloadData
          );
        })();
      }

      return res.status(200).send(ResponseService.success({ updateOrder }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async removeProductFromOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const { productId } = req.body;
      const order = await OrderService.getOrder({ _id: mongoose.Types.ObjectId(orderId) });
      if (!order) {
        throw new apiError.ValidationError('order_id', messages.ORDER_ID_REQUIRED);
      }
      if (order.status === 3) {
        throw new apiError.ValidationError('order_id', messages.PRODUCTS_CANNOT_BE_REMOVED_AFTER_DELIVERY);
      }
      if (order.products && order.products.length === 1) {
        throw new apiError.ValidationError('order_id', messages.PRODUCTS_CANNOT_BE_REMOVED_THERE_IS_SINGLE_PRODUCT);
      }

      const productToBeRemoved = order.products.find(
        (product) => product.product_id.toString() === productId
      );
      const orderToBeUpdated = {
        ...await (async () => {
          const adminConfig = await ConfigService.getConfig();
          const store = await StoreService.getStore({
            _id: mongoose.Types.ObjectId(order.store_id)
          });
          const { taxes } = adminConfig;

          const totalAmount = order.total_amount - (
            productToBeRemoved.price * productToBeRemoved.count
          );

          const { delivery_charges: deliveryCharges } = store;
          let orderDeliveryCharges = 0;
          deliveryCharges.some((deliveryCharge) => {
            if (totalAmount < deliveryCharge.order_amount) {
              orderDeliveryCharges = deliveryCharge.charges;
              return true;
            }
            return false;
          });

          let totalAmountAfterTax = totalAmount;
          const orderTaxes = [];

          taxes.forEach((tax) => {
            const value = (Number(tax.percentage) * totalAmount) / 100;
            totalAmountAfterTax += value;
            orderTaxes.push({
              name: tax.name,
              value
            });
          });

          let coupon = null;
          let orderDiscount = 0;
          if (order.coupon && order.discount > 0) {
            const { coupon: innerCoupon } = order;
            coupon = totalAmount < innerCoupon.min_order_amount ? null : innerCoupon;
            if (coupon) {
              if (coupon.type === 1) orderDiscount = coupon.value;
              else orderDiscount = (coupon.value * totalAmount) / 100;
            }
          }

          const afterDiscountPrice = totalAmount - (orderDiscount || 0);
          const adminCommissionAmount = (
            order.commission_percentage * afterDiscountPrice
          ) / 100;
          const storePayoutAmount = totalAmountAfterTax
            - (orderDiscount || 0)
            - adminCommissionAmount;

          return {
            admin_commission_amount: adminCommissionAmount,
            coupon,
            delivery_charges: orderDeliveryCharges,
            discount: orderDiscount,
            store_payout_amount: storePayoutAmount,
            taxes: orderTaxes,
            total_amount_after_tax: totalAmountAfterTax,
            total_amount: totalAmount
          };
        })()
      };
      const updatedOrder = await OrderService.updateOrder({
        ...orderToBeUpdated,
        $pull: { products: { product_id: productId } }
      }, { _id: mongoose.Types.ObjectId(orderId) });

      const store = await StoreService.getStore({
        _id: mongoose.Types.ObjectId(updatedOrder.store_id)
      });
      updatedOrder.store = store;

      // Send the mail to customer
      (async () => {
        const customer = await CustomerService.getCustomer({
          _id: mongoose.Types.ObjectId(updatedOrder.customer_id)
        });
        MailerService.sendPlacedOrderToCustomer({
          order: updatedOrder,
          customer,
          subject: `Order Status Update for: ${`${order.order_id}`.toUpperCase()}`,
          orderStatusString: 'Your order has been updated as per your request'
        });
      })();

      return res.status(200).send(ResponseService.success({ order: updatedOrder }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
};

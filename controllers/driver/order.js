const mongoose = require('mongoose');
const moment = require('moment-timezone');
const DriverService = require('../../services/driver');
const CustomerService = require('../../services/customer');
const OrderService = require('../../services/order');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');
const PushNotification = require('../../common/push-notification');
const notificationMessages = require('../../common/notification-messages');
const MailerService = require('../../common/mailer');

module.exports = {

  async getUnassignedOrders(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const { _user_id: driverId } = req._userInfo;
      let sort;

      if (req.query.name) sort = { [req.query.name]: Number(req.query.sortType) };
      else sort = { created_at: -1 };

      const orders = await OrderService.getUnassignedOrder(driverId, pageNo, perPage, sort);
      const documents = await OrderService.getUnassignedOrderCount(driverId, sort);
      const totalCount = documents.length;

      res.send(ResponseService.success({ orders, totalCount }));
    } catch (e) {
      res.status(500).send(ResponseService.failure(e));
    }
  },

  async acceptOrder(req, res) {
    try {
      const driverId = req._userInfo._user_id;

      const orderId = req.params.id;
      if (!HelperService.isValidMongoId(orderId)) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const order = await OrderService.getOrder({ _id: orderId });
      if (!order) throw new apiError.ValidationError('order_id', messages.ID_INVALID);

      if (order.driver_assigned) throw new apiError.ValidationError('order', messages.ORDER_ALREADY_ACCEPTED);

      const driver = await DriverService.getDriver({ _id: driverId });
      if (!driver) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      if (!driver.is_online) throw new apiError.ValidationError('driver', messages.DRIVER_NOT_ONLINE);

      const updateObject = {
        driver_assigned: true,
        driver_id: driverId
      };

      const updatedOrder = await OrderService.updateOrder(updateObject, { _id: orderId });

      // Send push notification to customer's device
      (async () => {
        const customer = await CustomerService.getCustomer({
          _id: mongoose.Types.ObjectId(updatedOrder.customer_id)
        });
        const notification = notificationMessages.orderStatusChange({
          orderId: updatedOrder.order_id,
          status: 'has been accepted',
          driverName: driver.full_name
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
          customer.fcm_token,
          notification,
          notificationPayloadData
        );

        // Send the mail to the customer
        MailerService.sendPlacedOrderToCustomer({
          order,
          customer,
          subject: `Order Status Update for: ${`${order.order_id}`.toUpperCase()}`,
          orderStatusString: notification.body
        });
      })();

      res.send(ResponseService.success({ order: updatedOrder }));
    } catch (e) {
      res.status(500).send(ResponseService.failure(e));
    }
  },

  async scheduledOrders(req, res) {
    try {
      const driverId = req._userInfo._user_id;
      // const orders = await OrderService.getOrders({ driver_id: mongoose.Types.ObjectId(driverId), status: 1, deliver_start_time: { $gte: moment().startOf('day').toDate() } });
      const orders = await OrderService.getOrders({ driver_id: mongoose.Types.ObjectId(driverId), status: 1 });
      res.send(ResponseService.success({ orders }));
    } catch (e) {
      res.status(500).send(ResponseService.failure(e));
    }
  },

  async getDriverOrders(req, res) {
    try {
      const condition = {};

      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);

      if (req.query.status) {
        if (!req.query.status || `${req.query.status}` === '1') {
          condition.status = { $in: [1, 2, 6] };
        } else {
          condition.status = Number(req.query.status);
        }
      } else {
        condition.status = 3;
      }
      if (req.query.from_date && req.query.to_date) {
        condition.deliver_start_time = {
          $gte: moment(req.query.from_date).startOf('day').toDate(), $lt: moment(req.query.to_date).endOf('day').toDate()
        };
      } else {
        condition.deliver_start_time = {
          $gte: moment().startOf('day').toDate(), $lt: moment().endOf('day').toDate()
        };
      }

      const driverId = req._userInfo._user_id;
      condition.driver_id = mongoose.Types.ObjectId(driverId);

      const orders = await OrderService.getOrders(condition, null, pageNo, perPage);
      const totalCount = await OrderService.getTotalOrdersCount(condition);
      const totalDriverCommission = orders.reduce(
        (total, order) => (total + (order.driver_commission || 0)),
        0
      );

      delete condition.status;

      const orderStatusCounts = await OrderService.getTodayOrderCountBasedOnStatus(condition);

      let total = 0;
      let unDelivered = 0;
      let completed = 0;

      orderStatusCounts.forEach((element) => {
        if (element.status === 1 || element.status === 2 || element.status === 6) {
          total += element.order;
        }
        if (element.status === 3) completed = element.order;
        if (element.status === 4) unDelivered = element.order;
      });

      res.send(ResponseService.success({
        orders, totalCount, totalDriverCommission, orderCounts: { total, unDelivered, completed }
      }));
    } catch (e) {
      res.status(500).send(ResponseService.failure(e));
    }
  },

  async changeOrderStatus(req, res) {
    try {
      const updateObject = {};
      const status = Number(req.body.status || 1);
      const { id: orderId } = req.params;
      updateObject.status = status;

      const order = await OrderService.getOrder({ _id: orderId });
      const driver = await DriverService.getDriver({ _id: order.driver_id });
      if (status === 4) {
        const { undelivered_description: undeliveredDescription } = req.body;
        if (!undeliveredDescription) throw new apiError.ValidationError('undelivered_description', 'Description is Required');
        updateObject.undelivered_description = undeliveredDescription;
      } else if (status === 3) {
        if (order && order.driver_assigned && order.driver_id) {
          const driverPercentageCommission = driver.percentageCommission;
          updateObject.driver_commission_percentage = driverPercentageCommission;
          updateObject.driver_commission = (order.total_amount * driverPercentageCommission) / 100;
        }
      }

      const customer = await CustomerService.getCustomer({
        _id: mongoose.Types.ObjectId(order.customer_id)
      });

      const updateOrder = await OrderService.updateOrder(updateObject, { _id: orderId });
      if (!updateOrder) throw new apiError.InternalServerError();

      // Send push notification to customer's device
      (async (orderStatus) => {
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
          driverName: driver ? driver.full_name : '',
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

        // Send the mail to customer
        MailerService.sendPlacedOrderToCustomer({
          order: updateOrder,
          customer,
          subject: `Order Status Update for: ${`${order.order_id}`.toUpperCase()}`,
          orderStatusString: notification.body
        });
      })(status);

      res.send(ResponseService.success({ order: updateOrder }));
    } catch (e) {
      res.status(500).send(ResponseService.failure(e));
    }
  }

};

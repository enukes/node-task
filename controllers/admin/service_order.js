const ServiceOrderService = require('../../services/service_order');
const ServiceProviderService = require('../../services/service_provider');
const config = require('../../config/constants');
const messages = require('../../common/messages');
const PushNotification = require('../../common/push-notification');
const MailerService = require('../../common/mailer');
const SlotService = require('../../services/slot');
const ResponseService = require('../../common/response');

module.exports = {
  async updateServiceOrder(req, res) {
    try {
      const request = { ...req.body };
      delete request.createdAt;
      delete request.created_at;
      delete request.updated_at;
      delete request.service_provider;
      delete request.address.delivery.city;

      request.status = JSON.parse(request.status);
      const { id: orderId } = req.params;

      if (!request.status) {
        throw new apiError.ValidationError('service_order_details', messages.STATUS_REQUIRED);
      }

      const serviceOrder = await ServiceOrderService.getServiceOrder({ _id: orderId });
      if (!serviceOrder) {
        throw new apiError.ValidationError('service_order_id', messages.SERVICE_ORDER_ID_REQUIRED);
      }

      const type = req._userInfo._user_type;
      if (type === 2) {
        if (request.service_provider_id !== req._userInfo._user_id) {
          throw new apiError.ValidationError('service_provider_id', messages.ID_INVALID);
        }
      }

      if (!request.service_provider_id) {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_PROVIDER_ORDER_ID_REQUIRED);
      }

      const serviceProvider = await ServiceProviderService.getServiceProvider({ _id: request.service_provider_id });
      if (!serviceProvider) {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_PROVIDER_ID_INVALID);
      }

      if (!request.slot_id) {
        throw new apiError.ValidationError('slot_id', messages.SLOT_ID_REQUIRED);
      }

      if (request.slot_id) {
        const slot = await SlotService.getSlot({ _id: request.slot_id, store_id: serviceProvider._id });
        if (!slot) {
          throw new apiError.ValidationError('slot_id', messages.SLOT_ID_INVALID);
        }

        if (slot.status === 2) {
          throw new apiError.ValidationError('slot_id', messages.SLOT_INACTIVE);
        }

        request.deliver_start_time = slot.start_time;
        request.deliver_end_time = slot.end_time;
      } else {
        request.deliver_start_time = moment().toISOString();
        request.deliver_end_time = moment().add(2, 'h').toISOString();
        request.slot_id = null;
      }

      const updateServiceOrder = await ServiceOrderService.updateServiceOrder(request, { _id: orderId });


      // send push notification to the driver and the customer
      // if the status of the order has been changed
      if (serviceOrder.status !== updateServiceOrder.status) {
        (async (orderStatus) => {
          // TODO: Validate that if the status of the order is only unDelivered before
          // then send the push notification
          const customer = await CustomerService.getCustomer({
            _id: mongoose.Types.ObjectId(updateServiceOrder.customer_id)
          });

          const notification = notificationMessages.orderStatusChange({
            orderId: serviceOrder.order_id,
            status: ((orderStatusInner) => {
              let statusString = '';
              switch (orderStatusInner) {
                case 1:
                  statusString = 'has been placed';
                  break;
                case 2:
                  statusString = 'has been fulfilled';
                  break;
                case 3:
                  statusString = 'has been unfulfilled';
                  break;
                case 4:
                  statusString = 'is cancelled';
                  break;

                default:
                  return '';
              }
              return statusString;
            })(orderStatus),
            cancelReason: updateServiceOrder.status === 4 ? updateServiceOrder.undelivered_description : ''
          });

          const notificationPayloadData = {
            type: config.notificationTypes.orderStatusChange,
            createdAt: moment.utc().toISOString(),
            notificationTitle: notification.title,
            notificationBody: notification.body,
            order_id: orderId,
            orderStatus: `${updateServiceOrder.status}`
          };
          PushNotification.notifySingleDevice(
            customer.fcm_token,
            notification,
            notificationPayloadData
          );

          // if (updateServiceOrder.driver_id) {
          //   const driver = await DriverService.getDriver({
          //     _id: mongoose.Types.ObjectId(updateServiceOrder.driver_id)
          //   });
          //   PushNotification.notifySingleDevice(
          //     driver.fcm_token,
          //     notification,
          //     notificationPayloadData
          //   );
          // }

          // Send the mail to customer
          MailerService.sendPlacedServiceOrderToCustomer({
            serviceOrder: updateServiceOrder,
            customer,
            subject: `Order Status Update for: ${`${order.order_id}`.toUpperCase()}`,
            orderStatusString: notification.body
          });
        })(updateServiceOrder.status);
      }
      return res.status(200).send(ResponseService.success({ updateServiceOrder }));

    }
    catch (error) {
      return res.status(error.code || 500).json(ResponseService.failure(error));
    }
  },

  async getServiceOrder(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const sort = { [req.query.name]: Number(req.query.sortType) };

      const search = req.query.search || '';
      const condition = {};
      const type = req._userInfo._user_type;
      if (type === 2) {
        condition.store_id = mongoose.Types.ObjectId(req._userInfo._user_id);
      }
      const serviceOrder = await ServiceOrderService.getServiceOrdersWithPagination(
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
      const totalItems = await ServiceOrderService.getTotalOrdersCountForServiceOrderManagement(
        condition,
        search
      );
      paginationVariables.totalItems = totalItems;
      return res.status(200).send(ResponseService.success({ serviceOrder, paginationVariables }));

    }
    catch (error) {
      return res.status(500).send(ResponseService.failure(error))
    }
  }

}

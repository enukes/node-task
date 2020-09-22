const moment = require('moment-timezone');
const mongoose = require('mongoose');
const OrderService = require('../../services/order');
const StoreService = require('../../services/store');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');


module.exports = {
  async updateSeviceOrder(req, res) {
    try {
      const request = { ...req.body };
      delete request.updated_at;
      

      request.status = JSON.parse(request.status);

      const { id: orderId } = req.params;
      if (!request.status) {
        throw new apiError.ValidationError('status', messages.STATUS_REQUIRED);
      }

      const order = await OrderService.getService({ _id: orderId });
      if (!order) {
        throw new apiError.NotFoundError('order_id', messages.ORDER_ID_INVALID);
      }
     
      
      if (order.service_provider_id != req._userInfo._user_id) throw new apiError.UnauthorizedError('status', messages.STATUS_PERMISSION);

      if (order.status === request.status) {
        throw new apiError.ResourceAlreadyExistError('status', messages.STATUS_ALREADY_EXIST);
      }
      
      if (request.status === 1 || request.status === 7) {
        const updateOrder = await OrderService.updateServiceOrder(request, { _id: orderId });
        return res.status(200).send(ResponseService.success({ updateOrder }));
      } else {
        throw new apiError.UnauthorizedError('status', messages.STATUS_PERMISSION);
      }

    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getTodayOrders(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const sort = { [req.query.name]: Number(req.query.sortType) };
      const search = req.query.search || '';


      const condition = {};
      const type = req._userInfo._user_type;
      if (type === 5) condition.service_provider_id = mongoose.Types.ObjectId(req._userInfo._user_id);
      condition.testStartDate = moment('2020-04-13T14:30:00.000Z').startOf('day').toDate();
      condition.testEndDate = moment('2020-04-13T14:30:00.000Z').endOf('day').toDate();
      if (req.query.status) {
        condition.status = Number(req.query.status)
      }  
      const order = await OrderService.getTodayServiceWithPagination(
        condition,
        pageNo,
        perPage,
        search,
        sort
      );
     
      return res.status(200).send(ResponseService.success({
        order
      }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }

};

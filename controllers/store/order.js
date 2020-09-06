const moment = require('moment-timezone');
const mongoose = require('mongoose');
const OrderService = require('../../services/order');
const StoreService = require('../../services/store');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');


module.exports = {

  async updateOrder(req, res) {
    try {
      const request = { ...req.body };
      
      delete request.updated_at;

      request.status = JSON.parse(request.status);

      const { id: orderId } = req.params;

      if (!request.status) {
        throw new apiError.ValidationError('status', messages.STATUS_REQUIRED);
      }
      if (!request.store_id) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      }

      const order = await OrderService.getOrder({ _id: orderId });
      if (!order) {
        throw new apiError.NotFoundError('order_id', messages.ORDER_ID_INVALID);
      }
      
      const store = await StoreService.getStore({ _id: request.store_id });
      if (!store) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);
      }

      const type = req._userInfo._user_type;

      if (type === 2) {
        if (request.store_id !== req._userInfo._user_id) throw new apiError.ValidationError('store_id', messages.ID_INVALID);
      }
   
      if (order.status===request.status) {
        throw new apiError.ResourceAlreadyExistError('status', messages.STATUS_ALREADY_EXIST);
      }
      
      if(request.status === 7){
        const updateOrder = await OrderService.updateOrder(request, { _id: orderId });
        return res.status(200).send(ResponseService.success({ updateOrder }));
      }else{
        throw new apiError.UnauthorizedError('status', messages.STATUS_PERMISSION);
      }
     
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },
};
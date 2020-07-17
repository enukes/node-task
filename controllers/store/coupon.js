const CouponService = require('../../services/coupon');
const StoreService = require('../../services/store');
const ResponseService = require('../../common/response');
const messages = require('../../common/messages');
const apiError = require('../../common/api-errors');

class CouponController {
  async addCoupon(req, res) {
    try {
      const request = { ...req.body };

      // console.log('request', request);

      if (!request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);

      const store = await StoreService.getStore({ _id: request.store_id });
      if (!store) throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);

      delete request.store_id;

      request.store = {
        name: store.name,
        _id: store._id
      };

      const coupon = await CouponService.addCoupon(request);

      return res.status(200).send(ResponseService.success({ coupon }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new CouponController();

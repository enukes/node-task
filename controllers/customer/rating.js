const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const RatingService = require('../../services/rating');
const DriverService = require('../../services/driver');
const OrderService = require('../../services/order');


module.exports = {
  driverRating: async (req, res) => {
    try {
      const reqBody = req.body;
      if (!reqBody.orderId) {
        throw new apiError.ValidationError('orderId', messages.ORDER_ID_REQUIRED);
      }
      if (!reqBody.driverId) {
        throw new apiError.ValidationError('driverId', messages.DRIVER_ID_REQUIRED);
      }
      if (!reqBody.rating) {
        throw new apiError.ValidationError('rating', messages.RATING_REQUIRED);
      }
      const driver = await DriverService.getDriver({ _id: driverId });
      if(!driver) {
        throw new apiError.ValidationError('driverId', messages.DRIVER_ID_INVALID);
      }
      const order = await OrderService.getOrder({ _id: orderId});
      if(!order) {
        throw new apiError.ValidationError('orderId', messages.ORDER_ID_INVALID);
      }

      const rating = await RatingService.acceptRating(reqBody);
      return res.status(200).send(ResponseService.success({ rating }));
    }
    catch (error) {
      return res.status(500).send(ResponseService.failure(error))
    }
  }

}

const jsonwebtoken = require('jsonwebtoken');
const StoreService = require('../../services/store');
const ProductService = require('../../services/product');
const OrderService = require('../../services/order');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const config = require('../../config/constants');
const apiError = require('../../common/api-errors');

class OpenApiController {
  async updateProductsFromSku(req, res) {
    try {
      if (!req.headers.authorization) throw new Error('Auth Token is Invalid.');

      const token = req.headers.authorization.split(' ')[1];
      const decoded = jsonwebtoken.verify(token, config.authSecretToken);

      const store_id = decoded.id;
      const store = await StoreService.getStore({ _id: store_id });
      if (!store) throw new Error(messages.STORE_ID_INVALID);

      const request = { ...req.body };

      const data = await ProductService.addProductsFromSku(request.products, store_id);

      if (data.success) {
        res.send(ResponseService.success({ messages: data.message }));
      } else {
        throw new Error(data.error);
      }
    } catch (e) {
      if (e.name == 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Auth Token is Invalid.' });
      }
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async verifyOrder(req, res) {
    try{
      const reqBody = req.body;
      if(!reqBody.scannedBy) {
        throw new apiError.ValidationError('scannedBy', messages.SCANNED_BY_REQUIRED)
      }
      if(!reqBody.codeType) {
        throw new apiError.ValidationError('codeType', messages.CODE_TYPE_REQUIRED)
      }
      if(!reqBody.code) {
        throw new apiError.ValidationError('code', messages.CODE_REQUIRED)
      }
      if (!(reqBody.codeType === 'pickup' || reqBody.codeType === 'delivery')) {
        throw new apiError.ValidationError('codeType', messages.CODE_TYPE_INVALID)
      }
      let request = {
        pickup_code: reqBody.code,
      }
      let order = null;
      if(reqBody.codeType === 'pickup') {
        request = {
          store_id: reqBody.scannedBy
        }
        order = await OrderService.getOrder(request)
      } else {
        request = {
          driver_id: reqBody.scannedBy
        } 
        order = await OrderService.getOrder(request);
      }
      if(order) {
        return res.status(200).send(ResponseService.success({ message: messages.ORDER_VERIFIED }));
      }
      return res.status(401).send(ResponseService.failure({ message: messages.ORDER_UNVERIFIED}));
    }
    catch(error) {
      if(error.name == 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Auth Token is Invalid.' });
      }
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }
  }
}

module.exports = new OpenApiController();

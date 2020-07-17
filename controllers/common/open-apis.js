const jsonwebtoken = require('jsonwebtoken');
const StoreService = require('../../services/store');
const ProductService = require('../../services/product');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const config = require('../../config/constants');

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
}


module.exports = new OpenApiController();

const uuidv4 = require('uuid/v4');
const StoreService = require('../../services/store');
const CartService = require('../../services/cart');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const CustomerService = require('../../services/customer');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

class CartController {
  async addToCart(req, res) {
    try {
      const request = { ...req.body };
      let cart;
      let sum = 0;

      if (!request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);

      if (req._is_logged_in) {
        cart = await CartService.getCart({ 'customer._id': req._userInfo._user_id });

        if (!cart) {
          const cartObject = {};

          const customer = await CustomerService.getCustomer({ _id: req._userInfo._user_id });

          if (!HelperService.isValidMongoId(request.store_id)) throw new apiError.ValidationError('store_id', messages.ID_INVALID);

          const store = await StoreService.getStore({ _id: request.store_id });
          if (!store) throw new apiError.ValidationError('store_id', messages.ID_INVALID);

          request.products.forEach((element) => {
            sum += (element.price * element.quantity);
          });

          cartObject.total_amount = sum;

          cartObject.customer = customer;
          cartObject.store_id = request.store_id;
          cart.products = request.products;

          cart = await CartService.addCart(cartObject);
        } else {
          const updateObject = {};
          request.products.forEach((element) => {
            sum += (element.price * element.quantity);
          });

          updateObject.total_amount = sum;
          updateObject.products = request.products;

          if (cart.store_id != request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_MISMATCH);

          const updatedCart = await CartService.updateProductsInCart({ 'customer._id': req._userInfo._user_id }, request.products);
          res.send(ResponseService.success({ cart: updatedCart }));
        }

        res.send(ResponseService.success({ cart: updatedCart }));
      } else {
        cart = await CartService.getCart({ token: request.user_token });

        if (request.user_token) {
          console.log('request', request);

          const updateObject = {};

          request.products.forEach((element) => {
            sum += (element.price * element.quantity);
          });

          updateObject.total_amount = sum;
          updateObject.products = request.products;

          if (cart.store_id != request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_MISMATCH);

          const updatedCart = await CartService.updateProductsInCart({ token: request.user_token }, updateObject);
          res.send(ResponseService.success({ cart: updatedCart }));
        } else {
          const cartObject = {};
          if (!HelperService.isValidMongoId(request.store_id)) throw new apiError.ValidationError('store_id', messages.ID_INVALID);

          const store = await StoreService.getStore({ _id: request.store_id });
          if (!store) throw new apiError.ValidationError('store_id', messages.ID_INVALID);

          cartObject.token = uuidv4();
          cartObject.store_id = request.store_id;
          cartObject.products = request.products;

          request.products.forEach((element) => {
            sum += (element.price * element.quantity);
          });

          console.log('sum', sum);

          cartObject.total_amount = sum;

          console.log('request', request);

          cart = await CartService.addCart(cartObject);

          // let updatedCart = await CartService.updateProductsInCart({ token: cartObject.token }, request.products);
          res.send(ResponseService.success({ cart }));
        }
      }
    } catch (e) {
      console.log('error', e);
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new CartController();

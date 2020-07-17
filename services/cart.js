const Cart = require('../models/cart');

class CartService {
  getCart(request) {
    return Cart.findOne(request);
  }

  addCart(details) {
    return new Cart(details).save();
  }

  updateProductsInCart(request, products) {
    const data = { products };
    return Cart.findOneAndUpdate(request, data, { new: true, upsert: false });
  }
}

module.exports = new CartService();

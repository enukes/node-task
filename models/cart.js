const mongoose = require('mongoose');
const messages = require('../common/messages');

const schema = new mongoose.Schema({
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: [true, messages.STORE_ID_REQUIRED]
  },
  customer: {
    type: Object,
    required: false
  },
  token: {
    type: String,
    required: false
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId
      },
      pictures: [{
        type: String,
        required: [true, messages.PRODUCT_PICTURE_REQUIRED]
      }],
      size: {
        type: String,
        required: [true, messages.PRODUCT_SIZE_REQUIRED]
      },
      price: {
        type: Number,
        required: [true, messages.PRICE_REQUIRED],
        min: [1, messages.PRICE_GREATER_THAN_0]
      },
      quantity: {
        type: Number,
        required: [true, messages.QUANTITY_REQUIRED],
        min: [1, messages.QUANTITY_NON_NEGATIVE]
      },
      stock_quantity: {
        type: Number,
        required: [true, messages.STOCK_QUANTITY_REQUIRED],
        min: [0, messages.STOCK_QUANTITY_NON_NEGATIVE]
      },
      name: {
        type: String,
        required: [true, messages.NAME_REQUIRED]
      }
    }
  ],

  total_amount: {
    type: Number,
    required: [true, messages.TOTAL_AMOUNT_REQUIRED],
    min: [0, messages.TOTAL_AMOUNT_NON_NEGATIVE]
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Cart', schema);

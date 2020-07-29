const mongoose = require('mongoose');
const messages = require('../common/messages');

const schema = new mongoose.Schema({
  name: {
  type: String,
  required: [true, messages.NAME_REQUIRED]
  },
  description: {
    type: String
  },
  service_provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider'
  },
  pictures: [{
    type: String,
    required: [true, messages.PRODUCT_PICTURE_REQUIRED]
  }],
  tags: [{
    type: String
  }],
  size: {
    type: String,
    required: [true, messages.PRODUCT_SIZE_REQUIRED]
  },
  price: {
    cost_price: {
      type: Number,
      required: [true, messages.PRICE_REQUIRED],
      min: [1, messages.PRICE_GREATER_THAN_0]
    },
    sale_price: {
      type: Number,
      required: [true, messages.PRICE_REQUIRED],
      min: [1, messages.PRICE_GREATER_THAN_0]
    }
  },
  stock_quantity: {
    type: Number,
    required: [true, messages.STOCK_QUANTITY_REQUIRED],
    min: [0, messages.STOCK_QUANTITY_NON_NEGATIVE]
  },
  status: {
    type: Number,
    enum: [
      1, // Active
      2 // Inactive
    ],
    default: 1
  },
  order_max: {
    type: Number,
    default: 20
  },
  keyFeature: {
    type: String
  },
  description: {
    type: String
  }
},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
  module.exports = mongoose.model('Service', schema);

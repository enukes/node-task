const mongoose = require('mongoose');
const messages = require('../common/messages');

const schema = new mongoose.Schema({

  code: {
    type: String,
    required: [true, messages.NAME_REQUIRED]
  },
  type: {
    type: Number,
    enum: [
      1, // Fixed
      2 // Percentage
    ],
    required: true
  },
  store: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: [true, messages.STORE_ID_REQUIRED]
    },
    name: {
      type: String,
      required: [true, messages.STORE_NAME_REQUIRED]
    }
  },

  value: {
    type: Number,
    required: [true, messages.COUPON_VALUE_REQUIRED],
    min: [1, messages.COUPON_VALUE_GREATER_THAN_0]
  },

  start_date: {
    type: Date,
    required: true
  },
  usage: {
    type: Number,
    required: true,
    default: 10
  },
  end_date: {
    type: Date,
    required: true
  },

  min_order_amount: {
    type: Number,
    required: [true, messages.COUPON_ORDER_MIN_VALUE_REQUIRED],
    min: [1, messages.COUPON_ORDER_MIN_VALUE]
  },

  status: {
    type: Number,
    enum: [
      1, // Active
      2 // Inactive
    ],
    default: 1
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Coupon', schema);

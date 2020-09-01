const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  taxes: {
    type: Array,
    required: true
  },
  per_slot_order_limit: {
    type: Number,
    required: true
  },
  minimumDistance: {
    type: Number,
    default: 3
  },
  basePrice: {
    type: Number,
    default: 10
  },
  perKmPrice: {
    type: Number,
    default: 5
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Config', schema);

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  taxes: {
    type: Array,
    required: true
  },
  per_slot_order_limit: {
    type: Number,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Config', schema);

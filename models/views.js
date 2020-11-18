const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  
  productId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    default: true
  },
}, {
  timestamps: { createdAt: 'viewDate', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Views', schema);

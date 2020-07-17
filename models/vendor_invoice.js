const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  total: {
    type: Number,
    required: [true]
  },
  name: {
    type: String,
    allowNull: false
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('vendor_invoice', schema);

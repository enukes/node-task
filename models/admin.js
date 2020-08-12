const mongoose = require('mongoose');
const messages = require('../common/messages');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: [true, messages.EMAIL_REQUIRED],
    unique: true,
    sparse: true
  },
  contact_number: {
    type: String,
    required: false,
    sparse: true
  },
  password: {
    type: String,
    required: false
  },

  permissions: {
    type: [String],
    enum: ['DASHBOARD', 'STORE', 'CUSTOMER', 'DRIVER', 'CATEGORY', 'PRODUCT', 'ORDER', 'REPORT', 'COUPON', 'SETTING', 'SERVICE_PROVIDER', 'SERVICE']
  },

  status: {
    type: Number,
    enum: [1, 2], // 1-> Active , 2->Inactive
    default: 1
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Admin', schema);

const mongoose = require('mongoose');
const messages = require('../common/messages');

const schema = new mongoose.Schema({
  name: {
    type: Object,
    required: true
  },
  status: {
    type: Number,
    enum: [1, 2],
    default: 1 // 1-> Active, 2-> InActive
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  picture: {
    type: String,
    required: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('CategoryNew', schema);

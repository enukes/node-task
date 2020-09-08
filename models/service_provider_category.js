const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    enum: [1, 2], // 1-> Active , 2->Inactive,
    default: 1
  },
  picture: {
    type: String,
    required: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('ServiceProviderCategory', schema);

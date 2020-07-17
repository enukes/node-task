const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  amount: {
    type: Date,
    allowNull: false,
    required: true
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('StorePayout', schema);

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  start_time: {
    type: Date,
    allowNull: false,
    required: true
  },
  end_time: {
    type: Date,
    allowNull: false,
    required: true
  },

  status: {
    type: Number,
    enum: [1, 2], // 1-> Active, 2-> InActive
    default: 1
  },
  ordersCount: {
    type: Number,
    allowNull: false,
    default: 0
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Slot', schema);

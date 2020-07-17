const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    allowNull: false
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('State', schema);

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  name: {
    type: String,
    allowNull: false,
    required: true
  },
  areas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area'
    }
  ],

  status: {
    type: Number,
    enum: [1, 2], // 1-> Active , 2->Inactive
    default: 1
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('City', schema);

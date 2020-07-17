const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    enum: [
      1, // Active
      2 // Inactive
    ],
    default: 1
  },
  type: {
    type: Number,
    enum: [
      1, // Banner
      2 // Offer
    ],
    default: 1
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Offer', schema);

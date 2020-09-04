const mongoose = require('mongoose');
const Constants = require('../config/constants');

const { Schema } = mongoose;

const schema = new Schema({
  itemType: {
    type: String,
    enum: Object.keys(Constants.homeConfigWidgets).map((key) => Constants.homeConfigWidgets[key]),
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stores',
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('HomeConfig', schema);

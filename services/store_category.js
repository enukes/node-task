const StoreCategory = require('../models/store_category');

module.exports = {
  addStoreCategory(storeCategoryDetails) {
    return new StoreCategory(storeCategoryDetails).save();
  },

  getAllStoreCategory(search, pageNo, perPage, status) {
    return StoreCategory.find({
      name: new RegExp(search, 'i'),
      ...(!!status && { status })
    }).skip((pageNo - 1) * perPage).limit(perPage);
  },

  getStoreCategoryCount(request, search) {
    const condition = {
      $and:
        [
          {
            $or:
              [
                { name: new RegExp(search, 'i') }
              ]
          },
          request
        ]
    };
    return StoreCategory.countDocuments(condition);
  },

  getStoreCategoryById(id) {
    return StoreCategory.findById(id);
  },

  updateStoreCategory(criteria, storeCategoryDetails) {
    return StoreCategory.findOneAndUpdate(criteria, storeCategoryDetails, { new: true });
  },

  deleteStoreCategory(storeCategoryId) {
    return StoreCategory.deleteMany({ _id: storeCategoryId });
  }
};

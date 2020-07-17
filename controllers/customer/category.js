const CategoryService = require('../../services/category');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

module.exports = {
  async getAllStoreCategories(req, res) {
    try {
      const { store_id: storeId } = req.query;

      if (!storeId) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      if (!HelperService.isValidMongoId(storeId)) throw new apiError.ValidationError('store_id', messages.ID_INVALID);

      const categories = await CategoryService.getAllCategoriesWithSubCategories(storeId);

      return res.status(200).send(ResponseService.success({ categories }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getCategoryDetails(req, res) {
    try {
      const { id } = req.params;
      if (!HelperService.isValidMongoId(id)) throw new apiError.ValidationError('category_id', messages.ID_INVALID);

      let category = await CategoryService.getActiveCategory(id);
      category = category.length > 0 ? category[0] : {};

      return res.status(200).send(ResponseService.success(category));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
};

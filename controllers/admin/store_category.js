const StoreCategoryService = require('../../services/store_category');
const StoreService = require('../../services/store');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');

module.exports = {
  async addStoreCategory(req, res) {
    try {
      const request = { ...req.body };
      if (!request.name) throw new apiError.ValidationError('storeCategoryDetails', messages.NAME_REQUIRED);
      const storeCategory = await StoreCategoryService.addStoreCategory(request);
      return res.status(200).send(ResponseService.success({ storeCategory }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async getStoreCategories(req, res) {
    try {
      const search = req.query.search || '';
      const status = Number(req.query.status);
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);

      const storeCategories = await StoreCategoryService.getAllStoreCategory(
        search,
        pageNo,
        perPage,
        status
      );
      if (!storeCategories) throw apiError.InternalServerError();

      const totalStoreCategoriesCount = await StoreCategoryService.getStoreCategoryCount(
        {}, search
      );
      return res.status(200).send(ResponseService.success({
        storeCategories,
        totalStoreCategoriesCount
      }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async updateStoreCategory(req, res) {
    try {
      const storeCategoryId = req.params.id;
      const request = { ...req.body };
      delete request._id;
      let storeCategory = await StoreCategoryService.getStoreCategoryById(storeCategoryId);
      if (!storeCategory) throw new apiError.InternalServerError();
      storeCategory = await StoreCategoryService.updateStoreCategory(
        { _id: storeCategoryId },
        { name: request.name, status: request.status }
      );
      return res.status(200).send(ResponseService.success({ storeCategory }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async deleteStoreCategory(req, res) {
    try {
      const storeCategoryId = req.params.id;
      const storeCategory = await StoreCategoryService.getStoreCategoryById(storeCategoryId);
      if (!storeCategory) throw new apiError.ValidationError('storeCategoryId', messages.STORE_CATEGORY_ID_INVALID);

      // Don't delete the store category if the store is associated with it
      const associatedStore = await StoreService.getStoreByCategoryId(storeCategoryId);
      if (associatedStore) throw new apiError.ValidationError('storeCategoryId', messages.STORE_CATEGORY_ID_ASSOCIATED);

      const deletedStoreCategory = await StoreCategoryService.deleteStoreCategory(storeCategoryId);
      return res.status(200).send(ResponseService.success({ storeCategory: deletedStoreCategory }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
};

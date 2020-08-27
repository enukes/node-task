const mongoose = require('mongoose');
const HelperService = require('../../common/helper');
const CategoryService = require('../../services/category');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');

module.exports = {
  async addCategory(req, res) {
    try {
      const request = { ...req.body };
      if (!request.name) {
        throw new apiError.ValidationError('category_name', messages.NAME_REQUIRED);
      }
      if (!request.status) {
        throw new apiError.ValidationError('category_status', messages.STATUS_REQUIRED);
      }

      // const type = req._userInfo._user_type;

      // if (type !== 2 && !request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);

      if (!req.files.length > 0) {
        throw new apiError.ValidationError('picture', messages.CATEGORY_PICTURE_REQUIRED);
      }
      if (req.files && req.files.length) {
        request.picture = req.files.find((ele) => ele.fieldname === 'picture').filename;
      }

      const categoryExist = await CategoryService.findCategoryByName({
        name: request.name.trim(),
        parent: request.parent || null
      });

      if (categoryExist) {
        return res.status(302).send(ResponseService.failure({ code: 302, message: 'category/subcategory exist', name: 'category/subcategory add' }));
      }

      const category = await CategoryService.addCategory(request);
      return res.status(200).send(ResponseService.success(category));
    } catch (e) {
      return res.status(e.code).send(ResponseService.failure(e));
    }
  },

  async updateCategory(req, res) {
    try {
      const request = { ...req.body };
      const type = req._userInfo._user_type;
      // if (type === 2) {
      //   if (req._userInfo._user_id !== request.store_id) {
      //     throw new apiError.UnauthorizedError(messages.STORE_CATEGORY_MISMATCH);
      //   }
      // }

      delete request._id;
      delete request.subcategories;
      // delete request.store_id;
      if (!request.name) {
        throw new apiError.ValidationError('category_details', messages.NAME_REQUIRED);
      }
      if (!request.status) {
        throw new apiError.ValidationError('categorry_details', messages.STATUS_REQUIRED);
      }
      if (req.files.length > 0) {
        request.picture = req.files.find((ele) => ele.fieldname === 'picture').filename;
      }
      const { id } = req.params;
      if (!HelperService.isValidMongoId(id)) {
        throw new apiError.ValidationError('category_id', messages.ID_INVALID);
      }
      const condition = {
        _id: id
      };
      if (type === 2) condition.store_id = req._userInfo._user_id;
      const category = await CategoryService.getOnlyCategory(condition);
      if (!category) {
        throw new apiError.ValidationError('category_id', messages.ID_INVALID);
      }
      const updatedCategory = await CategoryService.updateCategory(request, { _id: id });
      return res.status(200).send(ResponseService.success({ category: updatedCategory }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async getAllStoreCategories(req, res) {
    try {
      const type = req._userInfo._user_type;

      // let storeId;

      // if (type === 2) storeId = req._userInfo._user_id;
      // else storeId = req.query.store_id;

      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const search = req.query.search || '';
      const sort = { [req.query.name]: Number(req.query.sortType) };

      // if (!storeId) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      // if (!HelperService.isValidMongoId(storeId)) throw new apiError.ValidationError('store_id', messages.ID_INVALID);

      const categories = await CategoryService.getCategoriesWithPagination(
        pageNo,
        perPage,
        search,
        sort
      );

      const paginationVariables = {
        pageNo,
        perPage
      };

      const count = await CategoryService.getTotalCategoriesCount(search);
      paginationVariables.totalItems = count.length;

      return res.status(200).send(ResponseService.success({ categories, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getAllStoreCategoriesForCategoryManagement(req, res) {
    try {
      const type = req._userInfo._user_type;

      // let storeId;

      // if (type === 2) storeId = req._userInfo._user_id;
      // else storeId = req.query.store_id;

      // if (!storeId) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      // if (!HelperService.isValidMongoId(storeId)) throw new apiError.ValidationError('store_id', messages.ID_INVALID);

      const categories = await CategoryService.getAllStoreCategoriesForCategoryManagement(storeId);

      return res.status(200).send(ResponseService.success({ categories }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getCategoryDetails(req, res) {
    try {
      const { id } = req.params;

      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const search = req.query.search || '';

      if (!HelperService.isValidMongoId(id)) {
        throw new apiError.ValidationError('category_id', messages.ID_INVALID);
      }

      const condition = {
        _id: id
      };

      const type = req._userInfo._user_type;
      // if (type === 2) condition.store_id = req._userInfo._user_id;

      let category = await CategoryService.getOnlyCategory(condition);
      if (!category) {
        throw new apiError.ValidationError('id', messages.ID_INVALID);
      }

      category = await CategoryService.getCategorySubcategories(id, pageNo, perPage, search);
      category = category.length > 0 ? category[0] : {};

      const paginationVariables = {
        pageNo,
        perPage
      };

      const count = await CategoryService.getTotalSubCategoriesCount(
        { parent: mongoose.Types.ObjectId(id) },
        search
      );
      paginationVariables.totalItems = count.length;

      return res.status(200).send(ResponseService.success({ category, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async deleteCategory(req, res) {
    try {
      const type = req._userInfo._user_type;
      const { id } = req.params;
      if (!HelperService.isValidMongoId(id)) {
        throw new apiError.ValidationError('product_id', messages.ID_INVALID);
      }
      let category;
      if (type === 2) {
        category = await CategoryService.getOnlyCategory({
          _id: id,
          store_id: req._userInfo._user_id
        });
        if (!category) {
          throw new apiError.ValidationError('category_id', messages.ID_INVALID);
        }
      } else {
        category = await CategoryService.getCategory(id);
        [category] = category;
        if (!category) {
          throw new apiError.ValidationError('category_id', messages.ID_INVALID);
        }
      }

      if (!category.parent) {
        const data = await CategoryService.deleteCategory(category);
        return res.status(200).send(ResponseService.success({ data }));
      }
      const data = await CategoryService.deleteSubCategory(category._id);
      return res.status(200).send(ResponseService.success({ data }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
};

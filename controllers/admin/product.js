const mongoose = require('mongoose');
const ProductService = require('../../services/product');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');

module.exports = {
  async getProducts(req, res) {
    try {
      const criteria = {};
      const type = req._userInfo._user_type;
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      criteria.search = req.query.search || '';
      const sort = { [req.query.name]: Number(req.query.sortType) };
      const request = { ...req.query };

      if (!request.store_id && type !== 2) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      }

      // criteria.search = request.search ? request.search : '';

      if (type === 2) criteria.store_id = req._userInfo._user_id;
      else criteria.store_id = request.store_id;

      if (request.subcategory_id) {
        criteria.subcategory_id = request.subcategory_id;
      }
      if (request.category_id) {
        criteria.category_id = request.category_id;
      }
      const paginationVariables = { pageNo, perPage };
      const subcategories = await ProductService.getProductsWithPagination(
        {},
        pageNo,
        perPage,
        criteria,
        sort
      );

      paginationVariables.totalItems = await ProductService.getTotalProductsCount({}, criteria);
      return res.status(200).send(ResponseService.success({ subcategories, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async addProduct(req, res) {
    try {
      const request = { ...req.body };
      const userType = req._userInfo._user_type;

      request.pictures = (req.files && req.files.length)
        ? req.files.map((file) => file.filename)
        : [];

      if (!request.store_id && `${userType}` !== '2') throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);

      if (`${userType}` === '2') request.store_id = req._userInfo._user_id;
      if (request.tags) {
        request.tags = JSON.parse(request.tags);
        request.tags = request.tags.map((tag) => (tag || '').trim()).filter((tag) => !!tag);
      }

      if (request.sku_id) {
        const product = await ProductService.getProduct({
          sku_id: request.sku_id,
          store_id: request.store_id
        });
        if (product) throw new apiError.ValidationError('sku_id', 'Sku ID already exists for another product.');
      }
      if (request.variants) {
        request.variants = JSON.parse(request.variants);
      }

      const product = await ProductService.addProductToStore(request);
      return res.status(200).send(ResponseService.success(product));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async updateProduct(req, res) {
    try {
      const request = { ...req.body };
      const { id } = req.params;

      if (request.sku_id) {
        const product = await ProductService.getProduct({
          sku_id: request.sku_id,
          store_id: request.store_id
        });
        if (product && product._id !== id) throw new apiError.ValidationError('sku_id', 'Sku ID already exists for another product.');
      }

      delete request.created_at;
      delete request.updated_at;
      delete request._id;
      delete request.__v;
      delete request.store_id;

      if (!request.name) throw new apiError.ValidationError('product_name', messages.NAME_REQUIRED);

      if (!HelperService.isValidMongoId(id)) throw new apiError.ValidationError('product_id', messages.ID_INVALID);

      const foundProduct = await ProductService.getProduct({
        _id: mongoose.Types.ObjectId(id)
      });
      if (!foundProduct) throw new apiError.ValidationError('product_id', messages.ID_INVALID);
      request.pictures = [...(foundProduct.pictures || []), ...(req.files && req.files.length)
        ? req.files.map((file) => file.filename)
        : []];

      if (request.tags) {
        request.tags = JSON.parse(request.tags);
        request.tags = request.tags.map((tag) => (tag || '').trim()).filter((tag) => !!tag);
      }
      if (request.variants) {
        request.variants = JSON.parse(request.variants);
      }

      const updatedProduct = await ProductService.updateProduct({ _id: id }, request);
      if (!updatedProduct) throw new apiError.InternalServerError();

      return res.status(200).send(ResponseService.success({ product: updatedProduct }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!HelperService.isValidMongoId(id)) throw new apiError.ValidationError('product_id', messages.ID_INVALID);

      const type = req._userInfo._user_type;

      const condition = {
        _id: id
      };

      if (`${type}` === '2') condition.store_id = req._userInfo._user_id;

      const product = await ProductService.getProduct(condition);
      if (!product) throw new apiError.ValidationError('product_id', messages.ID_INVALID);

      const deletedProduct = await ProductService.deleteProduct({ _id: id });

      return res.status(200).send(ResponseService.success({ product: deletedProduct }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
};

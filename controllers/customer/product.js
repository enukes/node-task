const ProductService = require('../../services/product');
const StoreService = require('../../services/store');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');

module.exports = {
  async getProducts(req, res) {
    try {
      const criteria = {};

      const request = { ...req.query };

      if (!request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);

      criteria.search = request.search ? request.search : '';
      criteria.store_id = request.store_id;
      criteria.perPage = Number(req.query.perPage || config.pagination.perPage);
      criteria.pageNo = Number(req.query.pageNo || config.pagination.pageNo);

      if (request.subcategory_id) criteria.subcategory_id = request.subcategory_id;
      if (request.category_id) criteria.category_id = request.category_id;

      if (request.category_id) {
        const subcategories = await ProductService.getProducts(criteria);
        return res.status(200).send(ResponseService.success({ subcategories }));
      }
      const products = await ProductService.getProducts(criteria);
      return res.status(200).send(ResponseService.success({ products }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async checkProductAvailability(req, res) {
    try {
      const request = { ...req.body };

      if (!request.store_id) throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);

      const store = await StoreService.getStore({ _id: request.store_id });
      if (!store) throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);

      if (!request.products || request.products.length === 0) throw new apiError.ValidationError('products', messages.PRODUCTS_REQUIRED);

      const invalidQuantityProducts = [];

      for (let i = 0; i < request.products.length; i++) {
        const product = request.products[i];

        if (!product._id) throw new apiError.ValidationError('product_id', messages.PRODUCT_ID_REQUIRED);
        if (!product.count) throw new apiError.ValidationError('product_count', messages.COUNT_REQUIRED);
        if (product.count <= 0) throw new apiError.ValidationError('product_count', messages.COUNT_GREATER_THAN_0);

        if (!HelperService.isValidMongoId(product._id)) throw new apiError.ValidationError('id', messages.ID_INVALID);

        // eslint-disable-next-line no-await-in-loop
        const productDetail = await ProductService.getProduct({
          _id: product._id,
          store_id: request.store_id
        });
        if (!productDetail) throw new apiError.ValidationError('product_id', messages.ID_INVALID);

        if (product.count > productDetail.stock_quantity) {
          invalidQuantityProducts.push({
            _id: product._id,
            stock_quantity: productDetail.stock_quantity,
            quantity_ordered: product.count
          });
        }
      }
      let message = '';
      if (invalidQuantityProducts.length === 0) message = 'All Products Are Available';
      else message = 'Some Products Are Not Available Right Now';

      return res.send(ResponseService.success({
        message,
        outOfStockProducts: invalidQuantityProducts
      }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
};

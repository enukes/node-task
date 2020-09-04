const ResponseService = require('../common/response');
const config = require('../config/constants');
const CategoryService = require('../services/category');

const CategoryHelper = {
  /**
   * Get all categories 
   */
  getAllCategories: async (req) => {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const search = req.query.search || '';
      const sort = { [req.query.name]: Number(req.query.sortType) };
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
      return {
        success: true,
        data: ResponseService.success({ categories, paginationVariables })
      }
    }
    catch (error) {
      return {
        success: false,
        error: ResponseService.failure(error)
      }
    }
  }
}

module.exports = CategoryHelper;

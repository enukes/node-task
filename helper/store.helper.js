const ResponseService = require('../common/response');
const config = require('../config/constants');
const StoreService = require('../services/store');
const CategoryService = require('../services/category');


const StoreHelper = {
  /**
   * Get all categories 
   */
  getAllStoreByCategory: async (req) => {
    try {
      const subCategoryId=req.query.subCategory || '';
      const lat = req.query.lat || '';
      const long = req.query.long || '';  
      const search = req.query.search || '';
      const categoryDetail=await CategoryService.findCategoryByName({ _id: subCategoryId });
      const stores = await StoreService.getStoresBySubCategory(
        categoryDetail.parent,
        lat,
        long,
        search
      );
      return {
        success: true,
        data: ResponseService.success({ stores })
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

module.exports = StoreHelper;

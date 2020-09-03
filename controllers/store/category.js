const CategoryService = require('../../services/category');
const StoreService = require('../../services/store');
const ResponseService = require('../../common/response');
const messages = require('../../common/messages');
const apiError = require('../../common/api-errors');

class CategoryController {
  async addCategory(req, res) {
    try {
      const request = { ...req.body };
      if (req.files.length == 0) throw new apiError.ValidationError('picture', messages.IMAGE_REQUIRED);
      const category_picture = req.files.filter((ele) => ele.fieldname === 'picture');
      request.picture = category_picture[0].filename;

      const category = await CategoryService.addCategory(request);

      return res.status(200).send(ResponseService.success(category));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }

  /**
   * Get All Categories of a Store
   */

  async getCategoriesOfaStore(req, res) {
    try {
      const id = req._userInfo._user_id;
      const store = await StoreService.getStoresWithCategories(id);
      return res.status(200).send(ResponseService.success({ store }))
    }
    catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }
  }

}

module.exports = new CategoryController();

const CategoryService = require('../../services/category');
const ResponseService = require('../../common/response');
const messages = require('../../common/messages');
const apiError = require('../../common/api-errors');

class CategoryController {
  async addCategory(req, res) {
    try {
      console.log('rhgeugfuyeggfefygyu');
      const request = { ...req.body };

      console.log('req.body', req.body);

      if (req.files.length == 0) throw new apiError.ValidationError('picture', messages.IMAGE_REQUIRED);

      const category_picture = req.files.filter((ele) => ele.fieldname === 'picture');
      request.picture = category_picture[0].filename;

      const category = await CategoryService.addCategory(request);

      return res.status(200).send(ResponseService.success(category));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new CategoryController();

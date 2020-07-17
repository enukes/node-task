const ProductService = require('../../services/product');
const ResponseService = require('../../common/response');
const messages = require('../../common/messages');
const apiError = require('../../common/api-errors');

class ProductController {
  async addProducts(req, res) {
    try {
      const request = { ...req.body };

      // console.log('request', request);

      request.price = JSON.parse(request.price);
      if (!req.files) throw new apiError.ValidationError('pictures', messages.IMAGE_REQUIRED);

      // console.log('req.files', req.files);

      const product_pictures = req.files.filter((ele) => ele.fieldname === 'pictures');
      // console.log('product_picture', product_picture)
      request.pictures = [];
      product_pictures.forEach((element) => {
        request.pictures.push(element.filename);
      });

      // console.log('pictures', request.picture);

      const product = await ProductService.addProductToStore(request);

      return res.status(200).send(ResponseService.success(product));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new ProductController();

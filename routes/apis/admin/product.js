const router = require('express').Router();
const ProductController = require('../../../controllers/admin/product');
const Upload = require('../../../common/multer');

router.get('/', ProductController.getProducts);
router.post('/', Upload.array('pictures[]'), ProductController.addProduct);
router.put('/:id', Upload.any(), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;

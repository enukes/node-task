const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const Upload = require(path('common/multer'));
const ProductController = require('../../../controllers/admin/product');

router.get('/', ProductController.getProducts);
router.post('/', Upload.array('pictures[]'), ProductController.addProduct);
router.put('/:id', Upload.array('pictures[]'), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;

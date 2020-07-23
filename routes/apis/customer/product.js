const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const ProductController = require('../../../controllers/customer/product');

router.get('/', ProductController.getProducts);
router.post('/availability', ProductController.checkProductAvailability);

module.exports = router;

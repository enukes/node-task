const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const CategoryController = require('../../../controllers/customer/category');

router.get('/', CategoryController.getAllStoreCategories);
router.get('/:id', CategoryController.getCategoryDetails);

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const CategoryController = require('../../../controllers/admin/category-new');
const Upload = require(path('common/multer'));

router.get('/', CategoryController.getAllStoreCategories);
router.get('/categories', CategoryController.getAllStoreCategoriesForCategoryManagement); // for super-admin category management
router.get('/:id', CategoryController.getCategoryDetails);
router.post('/', Upload.any(), CategoryController.addCategory);
router.put('/:id', Upload.any(), CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;

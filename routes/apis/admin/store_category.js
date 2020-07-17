const express = require('express');

const router = express.Router();

const StoreCategoryController = require('../../../controllers/admin/store_category');

router.get('/', StoreCategoryController.getStoreCategories);
router.post('/', StoreCategoryController.addStoreCategory);
router.put('/:id', StoreCategoryController.updateStoreCategory);
router.delete('/:id', StoreCategoryController.deleteStoreCategory);

module.exports = router;

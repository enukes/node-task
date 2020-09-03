const express = require('express');
const router = express.Router();
const OpenApiController = require('../../../controllers/common/open-apis');


// router.post('/', dsd)
router.post('/verify-order', OpenApiController.verifyOrder);
router.post('/store-register', OpenApiController.createStore.bind(OpenApiController));
router.get('/categories', OpenApiController.getAllCategoriesForStoreRegister);

module.exports = router;

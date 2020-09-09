const express = require('express');
const router = express.Router();
const OpenApiController = require('../../../controllers/common/open-apis');
const Upload = require('../../../common/multer');

// router.post('/', dsd)
router.post('/driver-register', OpenApiController.addDriver);
router.post('/service-provider-register',Upload.single('picture'), OpenApiController.addAServiceProvider);
router.post('/verify-order', OpenApiController.verifyOrder);
router.post('/store-register', Upload.any(), OpenApiController.createStore.bind(OpenApiController));
router.get('/categories', OpenApiController.getAllCategoriesForStoreRegister);

module.exports = router;

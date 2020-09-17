const express = require('express');
const router = express.Router();
const OpenApiController = require('../../../controllers/common/open-apis');
const Upload = require('../../../common/multer');
const AreaController = require('../../../controllers/customer/area');
const ConfigController = require('../../../controllers/admin/config');
const AuthController = require('../../../controllers/common/auth');


// router.post('/', dsd)
router.post('/driver-register', OpenApiController.addDriver);
router.post('/service-provider-register',Upload.single('picture'), OpenApiController.addAServiceProvider);
router.post('/service-provider-login', AuthController.login.bind(AuthController));

router.post('/verify-order', OpenApiController.verifyOrder);
router.post('/store-register', Upload.any(), OpenApiController.createStore.bind(OpenApiController));
router.get('/stores-by-subcategory', OpenApiController.getAllStoreBySubCategory);
router.get('/categories', OpenApiController.getAllCategoriesForStoreRegister);
router.get('/cities', AreaController.getCitiesList);
router.get('/areas', AreaController.getAreasList);
router.get('/config',ConfigController.getConfig);




module.exports = router;

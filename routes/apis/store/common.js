const express = require('express');
const router = express.Router();
const CommonController = require('../../../controllers/admin/common'); 
const StoreController = require('../../../controllers/store/common'); 

router.post('/dashboard', CommonController.dashboard);
router.get('/file-exists', CommonController.checkIfFileAlreadyExists);
router.put('/store-info', CommonController.updateStoreInfo);
router.get('/profile', StoreController.getStoreProfile);
router.put('/device-token', StoreController.updateDeviceToken);  

module.exports = router;

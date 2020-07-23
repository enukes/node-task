const express = require('express');
const router = express.Router();
const CommonController = require('../../../controllers/admin/common');

router.post('/dashboard', CommonController.dashboard);
router.get('/file-exists', CommonController.checkIfFileAlreadyExists);
router.put('/store-info', CommonController.updateStoreInfo);

module.exports = router;

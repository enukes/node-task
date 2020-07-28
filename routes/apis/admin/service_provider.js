const router = require('express').Router();
const path = require('path').resolve;
const Upload = require(path('common/multer'));
const ServiceProviderController = require('../../../controllers/admin/service_provider');

router.post('/', Upload.any(), ServiceProviderController.addAServiceProvider);
module.exports = router;

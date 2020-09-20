const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const Upload = require(path('common/multer'));
const ServiceadminController = require('../../../controllers/admin/service_provider'); 
const ServiceproviderController = require('../../../controllers/serviceprovider/common'); 


router.put('/update-profile/:id', Upload.single('picture'),ServiceadminController.updateAServiceProvider);
router.get('/profile', ServiceproviderController.getServiceproviderProfile);

module.exports = router;

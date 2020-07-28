const router = require('express').Router();
const ServiceProviderCategeoryController = require('../../../controllers/admin/service_provider_category');

router.post('/', ServiceProviderCategeoryController.addServiceCategory);


module.exports = router; 

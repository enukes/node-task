const router = require('express').Router();
const ServiceProviderCategoryController = require('../../../controllers/admin/service_provider_category');

router.get('/', ServiceProviderCategoryController.getServiceProviderCategories);
router.post('/', ServiceProviderCategoryController.addServiceCategory);
router.put('/:id', ServiceProviderCategoryController.updateServiceProviderCategory);
router.delete('/:id', ServiceProviderCategoryController.deleteServiceProviderCategory);

module.exports = router; 

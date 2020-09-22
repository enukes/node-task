const router = require('express').Router();
const ServiceProviderCategoryController = require('../../../controllers/admin/service_provider_category');
const Upload = require('../../../common/multer');

//router.get('/', ServiceProviderCategoryController.getServiceProviderCategories);
router.post('/', Upload.single('pictures'),  ServiceProviderCategoryController.addServiceCategory);
router.put('/:id', Upload.single('pictures'), ServiceProviderCategoryController.updateServiceProviderCategory);
router.delete('/:id', ServiceProviderCategoryController.deleteServiceProviderCategory);

module.exports = router;

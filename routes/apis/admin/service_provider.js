const router = require('express').Router();
const Upload = require('../../../common/multer');
const ServiceProviderController = require('../../../controllers/admin/service_provider');

router.post('/', Upload.single('picture'), ServiceProviderController.addAServiceProvider);
router.put('/:id', Upload.any(), ServiceProviderController.updateAServiceProvider);
router.get('/', ServiceProviderController.getServiceProviderList);
router.delete('/:id', ServiceProviderController.deleteServiceProvider);

module.exports = router;

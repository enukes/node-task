const router = require('express').Router();
const Upload = require('../../../common/multer');
const ServiceController = require('../../../controllers/admin/service');

router.post('/', Upload.array('pictures[]'), ServiceController.addAService);
router.get('/', ServiceController.getServices);
router.put('/:id', Upload.any(), ServiceController.updateAService)

module.exports = router;

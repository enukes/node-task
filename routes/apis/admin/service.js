const router = require('express').Router();
const Upload = require('../../../common/multer');
const ServiceController = require('../../../controllers/admin/service');

router.post('/', Upload.array('pictures[]'), ServiceController.addAService);
router.get('/', ServiceController.getServices);

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const Upload = require(path('common/multer'));
const ServiceController = require('../../../controllers/serviceprovider/product');

router.get('/', ServiceController.getService);
router.post('/', Upload.any(), ServiceController.addService);
router.put('/:id', Upload.array('pictures[]'), ServiceController.updateAService);
router.delete('/:id', ServiceController.deleteService);

module.exports = router;

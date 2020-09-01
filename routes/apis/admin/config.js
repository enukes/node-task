const express = require('express');
const router = express.Router();
const ConfigController = require('../../../controllers/admin/config');

// router.post('/', ConfigController.addConfig)

router.get('/', ConfigController.getConfig);
router.put('/', ConfigController.updateConfig);
router.get('/delivery-charges', ConfigController.getDeliveryCharges);
router.put('/delivery-charges', ConfigController.updateDeliveryCharges)

module.exports = router;

const express = require('express');
const router = express.Router();
const ConfigController = require('../../../controllers/admin/config');

// router.post('/', ConfigController.addConfig)

router.get('/', ConfigController.getConfig);
router.put('/', ConfigController.updateConfig);

module.exports = router;

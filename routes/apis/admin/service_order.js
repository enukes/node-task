const router = require('express').Router();
const ServiceOrderController = require('../../../controllers/admin/service_order');

router.put('/:id', ServiceOrderController.updateServiceOrder);

module.exports = router;

const router = require('express').Router();
const ServiceOrderController = require('../../../controllers/admin/service_order');

router.get('/', ServiceOrderController.getServiceOrder);
router.put('/:id', ServiceOrderController.updateServiceOrder);
module.exports = router;

const router = require('express').Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const ServiceOrderController = require('../../../controllers/customer/service_order');

router.post('/checkout', jwtAuth, ServiceOrderController.placeServiceOrder.bind(ServiceOrderController));
router.get('/', jwtAuth, ServiceOrderController.getServiceOrders);

module.exports = router;

const express = require('express');
const router = express.Router();
const OrderController = require('../../../controllers/driver/order');
const jwtAuth = require('../../../middlewares/jwt-auth');

router.get('/unassigned', jwtAuth, OrderController.getUnassignedOrders);
router.put('/accept/:id', jwtAuth, OrderController.acceptOrder);
router.get('/scheduled', jwtAuth, OrderController.scheduledOrders);
router.get('/', jwtAuth, OrderController.getDriverOrders);
router.put('/status-update/:id', jwtAuth, OrderController.changeOrderStatus);

module.exports = router;

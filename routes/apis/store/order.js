const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const OrderController = require('../../../controllers/admin/order');
const OrderControllerStore = require('../../../controllers/store/order');

router.get('/', OrderController.getOrders);
router.put('/:id', OrderController.updateOrder);
router.put('/status/:id', OrderControllerStore.updateOrder);  
router.get('/today-count', OrderController.getTodayOrdersCount);

module.exports = router;

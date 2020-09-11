const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const OrderController = require('../../../controllers/admin/order');
const StoreOrderController = require('../../../controllers/store/order');

router.get('/', OrderController.getOrders);
router.get('/today-orders', StoreOrderController.getTodayOrders);
router.get('/total-count', StoreOrderController.getTodayOrdersCountForStore);
router.put('/:id', OrderController.updateOrder);
router.put('/status/:id', StoreOrderController.updateOrder);  
router.get('/today-count', OrderController.getTodayOrdersCount);

module.exports = router;

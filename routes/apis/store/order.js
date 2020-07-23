const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const OrderController = require('../../../controllers/admin/order');

router.get('/', OrderController.getOrders);
router.put('/:id', OrderController.updateOrder);
router.get('/today-count', OrderController.getTodayOrdersCount);

module.exports = router;

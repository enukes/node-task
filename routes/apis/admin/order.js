const router = require('express').Router();
const OrderController = require('../../../controllers/admin/order');
const CustomerOrderController = require('../../../controllers/customer/order');

router.get('/', OrderController.getOrders);
router.put('/:id', OrderController.updateOrder);
router.put('/:id/remove-product', OrderController.removeProductFromOrder);
router.get('/today-count', OrderController.getTodayOrdersCount);
router.post('/checkout', CustomerOrderController.placeOrder);

module.exports = router;

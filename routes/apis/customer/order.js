const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const OrderController = require('../../../controllers/customer/order');

router.post('/checkout', jwtAuth, OrderController.placeOrder.bind(OrderController));
router.get('/', jwtAuth, OrderController.getOrders);
router.get('/:id', jwtAuth, OrderController.getOrderById);
router.put('/cancel', jwtAuth, OrderController.cancelOrder);
router.get('/getOrderedStores', jwtAuth, OrderController.getStoreswithCustomer);
router.get('/invoice/:id', OrderController.getInvoice);
router.get('/invoice-layout/:id', OrderController.getInvoiceData);
router.post('/:id/review', jwtAuth, OrderController.reviewOrder);

module.exports = router;

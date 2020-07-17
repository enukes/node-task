const express = require('express');

const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');

const CartController = require('../../../controllers/customer/cart');

router.post('/', CartController.addToCart);

module.exports = router;

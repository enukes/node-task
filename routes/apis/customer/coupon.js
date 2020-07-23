const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const CouponController = require('../../../controllers/customer/coupon');

router.get('/check', jwtAuth, CouponController.checkCoupon.bind(CouponController));

module.exports = router;

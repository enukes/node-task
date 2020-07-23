const express = require('express');
const router = express.Router();
const CouponController = require('../../../controllers/admin/coupon');
const CouponCustomerController = require('../../../controllers/customer/coupon');

router.get('/', CouponController.getCoupons);
router.post('/', CouponController.addCoupon);
router.get('/check', CouponCustomerController.checkCoupon.bind(CouponCustomerController));
router.put('/:id', CouponController.updateCoupon);
router.delete('/:id', CouponController.deleteCoupon);

module.exports = router;

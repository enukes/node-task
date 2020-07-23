const express = require('express');
const router = express.Router();
const CouponController = require('../../../controllers/admin/coupon');

router.get('/', CouponController.getCoupons);
router.post('/', CouponController.addCoupon);
router.put('/:id', CouponController.updateCoupon);
router.delete('/:id', CouponController.deleteCoupon);

module.exports = router;

const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth');
const ProductRoutes = require('./product');
const CategoryRoutes = require('./category');
const OrderRoutes = require('./order');
const SlotRoutes = require('./slot');
const CouponRoutes = require('./coupon');
const ReportRoutes = require('./report');
const CommonRoutes = require('./common');
const isStoreAdminMiddleware = require('../../../middlewares/is-store-admin');

router.use('/auth', AuthRoutes);
router.use('/product', isStoreAdminMiddleware, ProductRoutes);
router.use('/category', isStoreAdminMiddleware, CategoryRoutes);
router.use('/order', isStoreAdminMiddleware, OrderRoutes);
router.use('/slots', SlotRoutes);
router.use('/coupon', isStoreAdminMiddleware, CouponRoutes);
router.use('/report', isStoreAdminMiddleware, ReportRoutes);
router.use('/', isStoreAdminMiddleware, CommonRoutes);

module.exports = router;

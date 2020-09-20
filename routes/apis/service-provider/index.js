const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth');
const ServiceRoutes = require('./services');
const OrderRoutes = require('./order');
const CommonRoutes = require('./common');
const ServiceProviderCategoryRoutes = require('./service_provider_category');
const isServiceproviderMiddleware = require('../../../middlewares/is-service-provider');

router.use('/auth', AuthRoutes);
router.use('/services', isServiceproviderMiddleware, ServiceRoutes);
router.use('/order', isServiceproviderMiddleware, OrderRoutes);
router.use('/', isServiceproviderMiddleware, CommonRoutes);
router.use('/service-category', isServiceproviderMiddleware, ServiceProviderCategoryRoutes);

module.exports = router;

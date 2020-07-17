const express = require('express');

const router = express.Router();

const adminRoutes = require('./admin');
const customerRoutes = require('./customer');
const driverRoutes = require('./driver');
const storeRoutes = require('./store');
const openApiRoutes = require('./open-apis');

router.use('/admin', adminRoutes);
router.use('/customer', customerRoutes);
router.use('/driver', driverRoutes);
router.use('/store', storeRoutes);
router.use('/', openApiRoutes);

module.exports = router;

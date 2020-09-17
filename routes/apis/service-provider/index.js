const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth');
const ServiceRoutes = require('./services');
const isServiceAdminMiddleware = require('../../../middlewares/is-service-provider');

router.use('/auth', AuthRoutes);
router.use('/services', isServiceAdminMiddleware, ServiceRoutes);

module.exports = router;

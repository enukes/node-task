const express = require('express');
const router = express.Router();
const AuthRoutes = require('./auth');
const OrderRoutes = require('./order');
const UserRoutes = require('./user');

router.use('/auth', AuthRoutes);
router.use('/order', OrderRoutes);
router.use('/user', UserRoutes);

module.exports = router;

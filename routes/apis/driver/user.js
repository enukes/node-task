const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const path = require('path').resolve;
const UserController = require('../../../controllers/driver/user');
const UserUpload = require(path('common/user-multer'));

router.get('/profile', jwtAuth, UserController.getProfile);
router.put('/profile/:id', jwtAuth, UserUpload.any(), UserController.updateProfile);
router.get('/status-change', jwtAuth, UserController.driverOnlineOffline);

module.exports = router;

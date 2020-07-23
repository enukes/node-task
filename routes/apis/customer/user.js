const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const path = require('path').resolve;
const UserController = require('../../../controllers/customer/user');
const UserUpload = require(path('common/user-multer'));

router.get('/address', jwtAuth, UserController.getAddress.bind(UserController));
router.post('/address', jwtAuth, UserController.addAddress.bind(UserController));
router.put('/address/:id', jwtAuth, UserController.updateAddress.bind(UserController));
router.delete('/address/:id', jwtAuth, UserController.deleteAddress.bind(UserController));
router.get('/profile', jwtAuth, UserController.getProfile);
router.put('/profile/:id', jwtAuth, UserUpload.any(), UserController.updateProfile);
router.get('/slot-mgmt', UserController.addSlot);
router.post('/fcm-token', jwtAuth, UserController.addFcmToken);

module.exports = router;

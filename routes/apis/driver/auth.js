const express = require('express');
const router = express.Router();
const AuthController = require('../../../controllers/common/auth');
const jwtAuth = require('../../../middlewares/jwt-auth');

// router.post('/register', AuthController.register.bind(AuthController)) //only testing purpose
router.post('/login', AuthController.login.bind(AuthController));
// router.post('/verify-otp', AuthController.verifyOTP.bind(AuthController))
router.post('/verify-otp', AuthController.verifyOTP.bind(AuthController));
router.post('/forget-password', AuthController.forgetPassword.bind(AuthController));
router.post('/reset-password', jwtAuth, AuthController.resetPassword.bind(AuthController));
router.post('/change-password', jwtAuth, AuthController.changePassword.bind(AuthController));
router.get('/logout', jwtAuth, AuthController.logout.bind(AuthController));

module.exports = router;

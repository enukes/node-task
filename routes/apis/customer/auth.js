const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const AuthController = require('../../../controllers/common/auth');

router.post('/register', AuthController.register.bind(AuthController));
router.post('/login', AuthController.login.bind(AuthController));
router.post('/verify-otp', AuthController.verifyOTP.bind(AuthController));
router.post('/forget-password', AuthController.forgetPassword.bind(AuthController));
router.post('/reset-password', jwtAuth, AuthController.resetPassword.bind(AuthController));
router.post('/change-password', jwtAuth, AuthController.changePassword.bind(AuthController));
router.post('/google-login', AuthController.googleLogin.bind(AuthController));
router.post('/facebook-login', AuthController.facebookLogin.bind(AuthController));
router.get('/logout', jwtAuth, AuthController.logout.bind(AuthController));

module.exports = router;

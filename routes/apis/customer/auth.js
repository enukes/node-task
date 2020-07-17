const express = require('express');

const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');

const AuthController = require('../../../controllers/common/auth');

router.post('/register', AuthController.register.bind(AuthController));

/**
 * @api {post} /api/customer/auth/register User Registration
 * @apiName Register User
 * @apiGroup Customer-Auth
 *
 * @apiParam {String} email user's email .
 * @apiParam {String} contact_number user's contact number.
 * @apiParam {String} full_name user's name.
 * @apiParam {String} password user's password.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "verification_token": "68f63534-631f-41a4-8cde-2d7b55e2a276",
 *         "message": "An OTP was sent to your contact number. Please check."
 *     }
 * }
 *
 * @apiError UserAlreadyExists The user already exists.
 *
 * @apiErrorExample Error-Response:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "Email address already exists.",
 *     "error": {
 *         "validation": {
 *             "email": [
 *                 "Email address already exists."
 *             ]
 *         }
 *     }
 * }
 */

router.post('/login', AuthController.login.bind(AuthController));

/**
 * @api {post} /api/customer/auth/login User Login
 * @apiName User Login
 * @apiGroup Customer-Auth
 *
 * @apiParam {String} username user's email or contact number.
 * @apiParam {String} password user's password.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDQwYmExZTVjNTZiMzQwYWEyYTliYyIsImlhdCI6MTU1NzQwMTM1NX0.owNAZZXZP9BcannAZb6SmCJdDIn0xwj81WzrtCLhbAE",
 *         "user": {
 *             "picture": null,
 *             "gmail_id": null,
 *             "facebook_id": null,
 *             "status": 1,
 *             "_id": "5cd40ba1e5c56b340aa2a9bc",
 *             "email": "khushal.pahuja@enukesoftware.com",
 *             "contact_number": "9711669906",
 *             "full_name": "khushal pahuja",
 *             "password": null,
 *             "verification_token": "68f63534-631f-41a4-8cde-2d7b55e2a276",
 *             "address": [],
 *             "created_at": "2019-05-09T11:14:41.688Z",
 *             "updated_at": "2019-05-09T11:14:41.688Z",
 *             "__v": 0
 *         }
 *     }
 * }
 *
 * @apiError UnauthorizedError Username or Password is invalid.
 *
 * @apiErrorExample Error-Response:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 401,
 *         "name": "UNAUTHORIZED",
 *         "description": "You are not logged in, e.g. using a valid access token."
 *     },
 *     "singleStringMessage": "Username or Password is invalid",
 *     "error": {}
 * }
 */

router.post('/verify-otp', AuthController.verifyOTP.bind(AuthController));

/**
 * @api {post} /api/customer/auth/verify-otp User Otp Verification
 * @apiName User Otp Verification
 * @apiGroup Customer-Auth
 *
 * @apiParam {String} contact_number user's contact number.
 * @apiParam {String} otp otp.
 * @apiParam {String} verification_token verification token send in previous response.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "user": {
 *             "picture": null,
 *             "gmail_id": null,
 *             "facebook_id": null,
 *             "status": 1,
 *             "_id": "5cd40ba1e5c56b340aa2a9bc",
 *             "email": "khushal.pahuja@enukesoftware.com",
 *             "contact_number": "9711669906",
 *             "full_name": "khushal pahuja",
 *             "password": "$2b$10$kDWy7UMqIXmqxMSq6hcgpuiSb4BjDQcB5WcNGTYsNB3ZqI0BNnuqq",
 *             "verification_token": "68f63534-631f-41a4-8cde-2d7b55e2a276",
 *             "address": [],
 *             "created_at": "2019-05-09T11:14:41.688Z",
 *             "updated_at": "2019-05-09T11:14:41.688Z",
 *             "__v": 0
 *         },
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDQwYmExZTVjNTZiMzQwYWEyYTliYyIsInR5cGUiOjMsImlhdCI6MTU1NzQwMTgxOH0.osWeW6W3X6j74wVYaAwgjbH2vR0rWQyegX0HUw-5O1o"
 *     }
 * }
 *
 * @apiError ValidationError Verification token is invalid.
 *
 * @apiErrorExample Verification token is invalid:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "Verification token is invalid",
 *     "error": {
 *         "validation": {
 *             "verification_token": [
 *                 "Verification token is invalid"
 *             ]
 *         }
 *     }
 * }
 *
 * @apiError ValidationError Otp is invalid.
 *
 * @apiErrorExample Otp is invalid:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "Invalid otp. Please try again."
 *     error: {
 *            message: "Invalid otp. Please try again."
 *     }
 * }
 */

router.post('/forget-password', AuthController.forgetPassword.bind(AuthController));

/**
 * @api {post} /api/customer/auth/forget-password Forgot Password
 * @apiName Forgot Password
 * @apiGroup Customer-Auth
 *
 * @apiParam {String} contact_number user's contact number.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "verification_token": "4afee0fe-e6cd-4dbf-8d6f-9c87c1af3f6d",
 *         "message": "An OTP was sent to your contact number. Please check."
 *     }
 * }
 *
 * @apiError ValidationError Contact Number is invalid.
 *
 * @apiErrorExample Contact Number is invalid:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "Contact number is not registered With Us",
 *     "error": {
 *         "validation": {
 *             "contact_number": [
 *                 "Contact number is not registered With Us"
 *             ]
 *         }
 *     }
 * }
 */

router.post('/reset-password', jwtAuth, AuthController.resetPassword.bind(AuthController));

/**
 * @api {post} /api/customer/auth/reset-password Reset Password
 * @apiName Reset Password
 * @apiGroup Customer-Auth
 *
 * @apiHeader {String} Authorization 'Bearer' + user token
 *
 * @apiParam {String} password user's password.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "user": {
 *             "picture": null,
 *             "gmail_id": null,
 *             "facebook_id": null,
 *             "status": 1,
 *             "_id": "5cd40ba1e5c56b340aa2a9bc",
 *             "email": "khushal.pahuja@enukesoftware.com",
 *             "contact_number": "9711669906",
 *             "full_name": "khushal pahuja",
 *             "password": null,
 *             "verification_token": "4afee0fe-e6cd-4dbf-8d6f-9c87c1af3f6d",
 *             "address": [],
 *             "created_at": "2019-05-09T11:14:41.688Z",
 *             "updated_at": "2019-05-09T12:00:31.950Z",
 *             "__v": 0
 *         },
 *         "message": "Password has been updated Successfully"
 *     }
 * }
 *
 * @apiError ValidationError Password is required.
 *
 * @apiErrorExample Password is required:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "Password is a required field",
 *     "error": {}
 * }
 */

router.post('/change-password', jwtAuth, AuthController.changePassword.bind(AuthController));

/**
* @api {post} /api/customer/auth/change-password Change Password
* @apiName Change Password
* @apiGroup Customer-Auth
*
* @apiHeader {String} Authorization 'Bearer' + user token
*
* @apiParam {String} password user's password.
* @apiParam {String} new_password user's new password.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* {
*     "success": true,
*     "code": 200,
*     "data": {
*         "user": {
*             "picture": null,
*             "gmail_id": null,
*             "facebook_id": null,
*             "status": 1,
*             "_id": "5cd40ba1e5c56b340aa2a9bc",
*             "email": "khushal.pahuja@enukesoftware.com",
*             "contact_number": "9711669906",
*             "full_name": "khushal pahuja",
*             "password": null,
*             "verification_token": "4afee0fe-e6cd-4dbf-8d6f-9c87c1af3f6d",
*             "address": [],
*             "created_at": "2019-05-09T11:14:41.688Z",
*             "updated_at": "2019-05-09T12:00:31.950Z",
*             "__v": 0
*         },
*         "message": "Password has been updated Successfully"
*     }
* }
*
* @apiError ValidationError Password is invalid.
*
* @apiErrorExample Password is invalid:
* {
*     "success": false,
*     "code": {
*         "code": 401,
*         "name": "UNAUTHORIZED",
*         "description": "You are not logged in, e.g. using a valid access token."
*     },
*     "singleStringMessage": "Password is invalid",
*     "error": {}
* }
*/

router.post('/google-login', AuthController.googleLogin.bind(AuthController));

/**
 * @api {post} /api/customer/auth/google-login Google Login
 * @apiName  Google Login
 * @apiGroup Customer-Auth
 *
 * @apiParam {String} id_token google token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "user": {
 *             "picture": null,
 *             "gmail_id": 64736438,
 *             "facebook_id": null,
 *             "status": 1,
 *             "_id": "5cd40ba1e5c56b340aa2a9bc",
 *             "email": "khushal.pahuja@enukesoftware.com",
 *             "full_name": "khushal pahuja",
 *             "password": null,
 *             "address": [],
 *             "created_at": "2019-05-09T11:14:41.688Z",
 *             "updated_at": "2019-05-09T12:00:31.950Z",
 *             "__v": 0
 *         },
 *     }
 * }
 *
 * @apiError ValidationError Google Error.
 *
 * @apiErrorExample Google error invalid token:
 * {
 *     "success": false,
 *     "singleStringMessage": "Token used too late, 1557405751.128 > 1556626806: {\"iss\":\"accounts.google.com\",\"azp\":\"210682269861-pruagrtf51m3t90cn9eru3lk0hs1gaic.apps.googleusercontent.com\",\"aud\":\"210682269861-pruagrtf51m3t90cn9eru3lk0hs1gaic.apps.googleusercontent.com\",\"sub\":\"111692623871330382648\",\"email\":\"khushalp1996@gmail.com\",\"email_verified\":true,\"at_hash\":\"-ZHn89tIf-KuMnR6nbqFSA\",\"name\":\"Khushal Pahuja\",\"picture\":\"https://lh5.googleusercontent.com/-p6ZLexYjO5U/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfSeiuC8r2fgg-IBhfkho9fn0kGLQ/s96-c/photo.jpg\",\"given_name\":\"Khushal\",\"family_name\":\"Pahuja\",\"locale\":\"en\",\"iat\":1556622906,\"exp\":1556626506,\"jti\":\"f3c7b936c63244316f76415b1b0442b626e4087c\"}",
 *     "error": {}
 * }
 */

router.post('/facebook-login', AuthController.facebookLogin.bind(AuthController));

/**
 * @api {post} /api/customer/auth/facebook-login Facebook Login
 * @apiName  Facebook Login
 * @apiGroup Customer-Auth
 *
 * @apiParam {String} user_id user id obtained from facebook.
 * @apiParam {String} access_token token obtained from facebook.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "user": {
 *             "picture": null,
 *             "gmail_id": null,
 *             "facebook_id": 438468363,
 *             "status": 1,
 *             "_id": "5cd40ba1e5c56b340aa2a9bc",
 *             "email": "khushal.pahuja@enukesoftware.com || null",
 *             "full_name": "khushal pahuja",
 *             "password": null,
 *             "address": [],
 *             "created_at": "2019-05-09T11:14:41.688Z",
 *             "updated_at": "2019-05-09T12:00:31.950Z",
 *             "__v": 0
 *         },
 *     }
 * }
 *
 * @apiError ValidationError Facebook Error.
 *
 * @apiErrorExample Facebook error invalid token:
 * {
 *     "success": false,
 *     "singleStringMessage": "400 - {\"error\":{\"message\":\"Error validating access token: Session has expired on Thursday, 02-May-19 09:00:00 PDT. The current time is Thursday, 09-May-19 05:47:57 PDT.\",\"type\":\"OAuthException\",\"code\":190,\"error_subcode\":463,\"fbtrace_id\":\"AYxofrM9uxc\"}}",
 *     "error": {
 *         "error": {
 *             "message": "Error validating access token: Session has expired on Thursday, 02-May-19 09:00:00 PDT. The current time is Thursday, 09-May-19 05:47:57 PDT.",
 *             "type": "OAuthException",
 *             "code": 190,
 *             "error_subcode": 463,
 *             "fbtrace_id": "AYxofrM9uxc"
 *         }
 *     }
 * }
 */

router.get('/logout', jwtAuth, AuthController.logout.bind(AuthController));


module.exports = router;

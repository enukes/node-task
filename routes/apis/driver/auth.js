const express = require('express');

const router = express.Router();

const AuthController = require('../../../controllers/common/auth');
const jwtAuth = require('../../../middlewares/jwt-auth');

// router.post('/register', AuthController.register.bind(AuthController)) //only testing purpose
router.post('/login', AuthController.login.bind(AuthController));

/**
 * @api {post} /api/driver/auth/login User Login
 * @apiName User Login
 * @apiGroup Driver-Auth
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
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMDlkNjFlMjFkMDM1MTZkMjRiYmU3YSIsImlhdCI6MTU2MDkyNTc1MX0.-kEWw_nlKWZzvn_wxTOMPOj8OvR9iQo1Bd-qbAXMlSs",
 *         "user": {
 *             "picture": null,
 *             "status": 1,
 *             "_id": "5d09d61e21d03516d24bbe7a",
 *             "full_name": "khushal",
 *             "email": "khushal.pahuja@enukesoftware.com",
 *             "password": null,
 *             "contact_number": "9711669906",
 *             "address": "Test Street",
 *             "created_at": "2019-06-19T06:28:46.600Z",
 *             "updated_at": "2019-06-19T06:28:46.600Z",
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

// router.post('/verify-otp', AuthController.verifyOTP.bind(AuthController))

router.post('/verify-otp', AuthController.verifyOTP.bind(AuthController));

/**
 * @api {post} /api/driver/auth/verify-otp User Otp Verification
 * @apiName User Otp Verification
 * @apiGroup Driver-Auth
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
 * @api {post} /api/driver/auth/forget-password Forgot Password
 * @apiName Forgot Password
 * @apiGroup Driver-Auth
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
 * @api {post} /api/driver/auth/reset-password Reset Password
 * @apiName Reset Password
 * @apiGroup Driver-Auth
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
* @api {post} /api/driver/auth/change-password Change Password
* @apiName Change Password
* @apiGroup Driver-Auth
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

router.get('/logout', jwtAuth, AuthController.logout.bind(AuthController));

module.exports = router;

const express = require('express');

const router = express.Router();

const AuthController = require('../../../controllers/common/auth');

router.post('/register', AuthController.register.bind(AuthController));
router.post('/login', AuthController.login.bind(AuthController));
/**
 * @api {post} /api/admin/auth/login  Admin Login
 * @apiName Admin Login
 * @apiGroup Admin
 *
 * @apiParam {String} username Admin's email
 * @apiParam {String} password Admin's password
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "code": 200,
 *   "data": {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 *       eyJpZCI6IjVjZjY1ZDFjMWM5ZDQ0MDAwMDkyNWQ1MiIsInR5c
 *       GUiOjEsImlhdCI6MTU4NDQyOTg4OH0.jAyIKa9yeri-
 *       3DpPltN9BDVpUcddqKXHyWrF_BD_Zow",
 *       "user": {
 *           "permissions": [
 *               "DASHBOARD",
 *               "STORE",
 *               "CUSTOMER",
 *               "DRIVER",
 *               "CATEGORY",
 *               "PRODUCT",
 *               "ORDER",
 *               "REPORT",
 *               "COUPON",
 *               "SETTING"
 *           ],
 *           "status": 1,
 *           "_id": "5cf65d1c1c9d440000925d52",
 *           "name": "Khushal Pahuja",
 *           "email": "khushal.pahuja@enukesoftware.com",
 *           "password": null,
 *           "updated_at": "2020-02-24T09:27:57.799Z"
 *       }
 *   }
 *}
@apiError UnauthorizedError Username or Password is invalid.
      HTTP/1.1 200 OK
{
    "success": false,
    "code": {
        "code": 401,
        "name": "UNAUTHORIZED",
        "description": "You are not logged in, e.g. using a valid access token."
    },
    "singleStringMessage": "Username or Password is invalid",
    "error": {}
}
 */
module.exports = router;

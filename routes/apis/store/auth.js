const express = require('express');

const router = express.Router();

const AuthController = require('../../../controllers/common/auth');
const jwtAuth = require('../../../middlewares/jwt-auth');

router.post('/register', AuthController.register.bind(AuthController)); // only testing purpose
router.post('/login', AuthController.login.bind(AuthController));
/**
 * @api {Post} /api/store/auth/login Store Login
 * @apiName Login
 * @apiGroup Store-Auth
 *
 * @apiParam (Body) {String} username Email Id of the Store
 * @apiParam (Body) {String} password Password of the Store
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NTAzMTExMn0.PINUvpQKU5HqYlpB3QpdfmjeLH6ytXt0kl3sKM9UB3Q",
 *        "user": {
 *            "timings": {
 *                "open_time": "5:00",
 *                "close_time": "23:00"
 *            },
 *            "owner": {
 *                "email": "enuke@enuke.com",
 *                "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                "full_name": "Enuke",
 *                "contact_number": "9999988888"
 *            },
 *            "picture": "img store.jpg",
 *            "has_express_delivery": false,
 *            "drivers": [
 *                "5d79f10ed22f1e78b7671d74"
 *            ],
 *            "status": 1,
 *            "_id": "5d778327d22f1e78b7671bd2",
 *            "self_delivery": false,
 *            "address": [
 *                {
 *                    "coordinates": {
 *                        "latitude": 24.8607,
 *                        "longitude": 67.0011
 *                    },
 *                    "_id": "5d778327d22f1e78b7671bd3",
 *                    "city_id": "5d7603909b5f0f76ee4f68ad",
 *                    "area_id": "5e469966d21fe166d8c9356f",
 *                    "shop_no": "20",
 *                    "locality": "test locality",
 *                    "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                    "unique_link": "Z1xaR9L"
 *                }
 *            ],
 *            "name": "Enuke Test store",
 *            "commission": 20,
 *            "created_at": "2019-09-10T11:04:07.991Z",
 *            "updated_at": "2020-03-24T06:24:16.648Z",
 *            "__v": 0,
 *            "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *            "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NTAzMTA1Nn0.ixUzo5UC7PhGrzjhKom1F5Fqzf2v4V3oAifIKssjK-0",
 *            "delivery_charges": [
 *                {
 *                    "_id": "5e5dc219f2b4181e2319f026",
 *                    "order_amount": 500,
 *                    "charges": 100
 *                },
 *                {
 *                    "_id": "5e5dc219f2b4181e2319f025",
 *                    "order_amount": 800,
 *                    "charges": 50
 *                },
 *                {
 *                    "_id": "5e5dc219f2b4181e2319f024",
 *                    "order_amount": 1000,
 *                    "charges": 30
 *                }
 *            ],
 *            "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *        }
 *    }
 *}
 *
 * @apiError 422 Username is a required field
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Username is a required field.",
 *    "error": {
 *        "validation": {
 *            "username": [
 *                "Username is a required field."
 *            ]
 *        }
 *    }
 *}
 *
 * @apiError 422 Password is a required field.
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Password is a required field.",
 *    "error": {
 *        "validation": {
 *            "password": [
 *                "Password is a required field."
 *            ]
 *        }
 *    }
 *}
 *
 */
router.post('/verify-otp', AuthController.verifyOTP.bind(AuthController));
router.post('/forget-password', AuthController.forgetPassword.bind(AuthController));
router.post('/reset-password', jwtAuth, AuthController.resetPassword.bind(AuthController));

module.exports = router;

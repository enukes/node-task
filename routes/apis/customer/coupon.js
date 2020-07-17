const express = require('express');

const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');

const CouponController = require('../../../controllers/customer/coupon');

router.get('/check', jwtAuth, CouponController.checkCoupon.bind(CouponController));

/**
 * @api {get} /api/customer/coupon/check Check Coupon Validation
 * @apiName Coupon Validation
 * @apiGroup Customer-Coupon
 *
 * @apiParam (Query String) {String} coupon_code Coupon code to be applied.
 * @apiParam (Query String) {String} store_id ID of the store to which coupon is applied.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "coupon": {
 *             "store": {
 *                 "name": "Health Store",
 *                 "_id": "5ce513d4a2041b29b2543750"
 *             },
 *             "status": 1,
 *             "_id": "5cf10cda19e5af3ad9d1dd38",
 *             "code": "10OFF",
 *             "type": 2,
 *             "value": 10,
 *             "start_date": "2019-05-31T11:05:56.000Z",
 *             "end_date": "2019-06-04T11:05:56.000Z",
 *             "created_at": "2019-05-31T11:15:38.820Z",
 *             "updated_at": "2019-05-31T11:15:38.820Z",
 *             "__v": 0
 *         }
 *     }
 * }
 *
 * @apiError ValidationError Coupon Code is Invalid.
 *
 * @apiErrorExample Coupon Code is Invalid.
 *{
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Coupon Code is Not Valid",
 *    "error": {
 *        "validation": {
 *            "coupon_code": [
 *                "Coupon Code is Not Valid"
 *            ]
 *        }
 *    }
 *}
 */

module.exports = router;

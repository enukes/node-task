const express = require('express');

const router = express.Router();
const CouponController = require('../../../controllers/admin/coupon');
const CouponCustomerController = require('../../../controllers/customer/coupon');

router.get('/', CouponController.getCoupons);
/**
 * @api {Get} /api/admin/coupon Get Coupon List
 * @apiName Get Coupon List
 * @apiGroup Admin-Coupon
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Coupon to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "coupon": [
 *            {
 *                "store": {
 *                    "_id": "5e05d5ff954bc84f45786dd6",
 *                    "name": "KNN General Store"
 *                },
 *                "usage": 50,
 *                "status": 1,
 *                "_id": "5e47d81ed21fe166d8c9375b",
 *                "type": 1,
 *                "code": "WELCOME100",
 *                "value": 100,
 *                "start_date": "2020-02-14T19:00:00.000Z",
 *                "end_date": "2020-02-22T18:59:59.999Z",
 *                "min_order_amount": 500,
 *                "created_at": "2020-02-15T11:38:06.552Z",
 *                "updated_at": "2020-02-15T11:38:06.552Z",
 *                "__v": 0
 *            },
 *            {
 *                "store": {
 *                    "_id": "5d9eda647a30b1642ce9cb77",
 *                    "name": "Saveway Super Store"
 *                },
 *                "usage": 50,
 *                "status": 1,
 *                "_id": "5debbd2568a40316a20bfb03",
 *                "type": 1,
 *                "code": "WELCOME100",
 *                "value": 100,
 *                "start_date": "2019-12-06T19:00:00.000Z",
 *                "end_date": "2019-12-31T18:59:59.999Z",
 *                "min_order_amount": 1000,
 *                "created_at": "2019-12-07T14:54:29.821Z",
 *                "updated_at": "2019-12-18T05:27:56.762Z",
 *                "__v": 0
 *            },
 *            {
 *                "store": {
 *                    "_id": "5d7607c59b5f0f76ee4f68b0",
 *                    "name": "METRO"
 *                },
 *                "usage": 9,
 *                "status": 1,
 *                "_id": "5e6b35536c789d243501e0b5",
 *                "type": 1,
 *                "code": "COUPONCODE",
 *                "value": 100,
 *                "start_date": "2020-03-12T18:30:00.000Z",
 *                "end_date": "2020-04-12T18:29:59.999Z",
 *                "min_order_amount": 100,
 *                "created_at": "2020-03-13T07:25:07.968Z",
 *                "updated_at": "2020-03-13T07:28:49.233Z",
 *                "__v": 0
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10,
 *            "totalItems": 3
 *        }
 *    }
 *}
 * @apiError ValidationError 401
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */
router.post('/', CouponController.addCoupon);
/**
 * @api {POST} /api/admin/coupon Add a Coupon
 * @apiName Add a Coupon
 * @apiGroup Admin-Coupon
 *
 * @apiParam (Body) {Object} store with fields "_id" Id of the Store "name" Name of the Store.
 * @apiParam (Body) {String} type Coupon Type
 * @apiParam (Body) {String} code Coupon Code
 * @apiParam (Body) {String} value Coupon Value
 * @apiParam (Body) {String} start_date Coupon Start date
 * @apiParam (Body) {String} end_date Coupon End Date
 * @apiParam (Body) {String} status Coupon Status
 * @apiParam (Body) {String} min_order_amount Coupon Minimum Order Amount
 * @apiParam (Body) {String} usage Coupon Usage
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "coupon": {
 *            "usage": 1,
 *            "status": 1,
 *            "_id": "5e7356c82aabe529abfca61b",
 *            "store": {
 *                "_id": "5e71fa41397c6558cd4813b4",
 *                "name": "Test Store"
 *            },
 *            "type": 1,
 *            "code": "COUPON500",
 *            "value": 50,
 *            "start_date": "2020-03-18T18:30:00.000Z",
 *            "end_date": "2020-03-31T18:29:59.999Z",
 *            "min_order_amount": 500,
 *            "created_at": "2020-03-19T11:26:00.447Z",
 *            "updated_at": "2020-03-19T11:26:00.447Z",
 *            "__v": 0
 *        }
 *    }
 *}
 *
 * @apiError CONFLICT Coupon already exists.
 *
 * @apiErrorExample
 *{
 *    "success": false,
 *    "code": {
 *        "code": 409,
 *        "name": "CONFLICT",
 *        "description": "The resource you are requesting already exists."
 *    },
 *    "singleStringMessage": "Coupon already exists.",
 *    "error": {
 *        "code": [
 *            "Coupon already exists."
 *        ]
 *    }
 *}
 *
 */
router.get('/check', CouponCustomerController.checkCoupon.bind(CouponCustomerController));
router.put('/:id', CouponController.updateCoupon);
/**
 * @api {Post} /api/admin/driver Update a Coupon
 * @apiName Update a Coupon
 * @apiGroup Admin-Coupon
 *
 * @apiParam (Body) {Object} store An Object with field "id" Unique id of a Store "name" Name of the Store
 * @apParam (Body) {String}  usage
 * @apParam (Body) {String}  status Status of the Coupon
 * @apParam (Body) {String}  _id Unique Id of the Coupon
 * @apParam (Body) {String}  type Type of the Coupon,
 * @apParam (Body) {String}  code Coupon Coupon
 * @apParam (Body) {String}  value Value of the Coupon
 * @apParam (Body) {String}  "start_date" Start date of the Coupon
 * @apParam (Body) {String}  "end_date" End Date of the Coupon
 * @apParam (Body) {String}  "min_order_amount" Minimum Order Amount of the Coupon
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "coupon": {
 *            "store": {
 *                "_id": "5e71fa41397c6558cd4813b4",
 *                "name": "Test Store"
 *            },
 *            "usage": 1,
 *            "status": 1,
 *            "_id": "5e734e76d84ff72540a87a79",
 *            "type": 1,
 *            "code": "COUPON50",
 *            "value": 100,
 *            "start_date": "2020-03-18T18:30:00.000Z",
 *            "end_date": "2020-03-31T18:29:59.999Z",
 *            "min_order_amount": 1000,
 *            "created_at": "2020-03-19T10:50:30.312Z",
 *            "updated_at": "2020-03-19T11:56:12.862Z",
 *            "__v": 0
 *        }
 *    }
 *}
*
* @apiError Minimum Order Amount is Required
*
* @apiErrorExample
*
 *<!DOCTYPE html>
 *<html lang="en">
 *
 *<head>
 *	<meta charset="utf-8">
 *	<title>Error</title>
 *</head>
 *
 *<body>
 *	<pre>SyntaxError: Unexpected token } in JSON at position 316<br> &nbsp; &nbsp;at JSON.parse (&lt;anonymous&gt;)<br> &nbsp; &nbsp;at parse (/home/enuke/Desktop/Projects/Aapkidokan/Backend_APIS/node_modules/body-parser/lib/types/json.js:89:19)<br> &nbsp; &nbsp;at /home/enuke/Desktop/Projects/Aapkidokan/Backend_APIS/node_modules/body-parser/lib/read.js:121:18<br> &nbsp; &nbsp;at invokeCallback (/home/enuke/Desktop/Projects/Aapkidokan/Backend_APIS/node_modules/raw-body/index.js:224:16)<br> &nbsp; &nbsp;at done (/home/enuke/Desktop/Projects/Aapkidokan/Backend_APIS/node_modules/raw-body/index.js:213:7)<br> &nbsp; &nbsp;at IncomingMessage.onEnd (/home/enuke/Desktop/Projects/Aapkidokan/Backend_APIS/node_modules/raw-body/index.js:273:7)<br> &nbsp; &nbsp;at IncomingMessage.emit (events.js:333:22)<br> &nbsp; &nbsp;at IncomingMessage.EventEmitter.emit (domain.js:485:12)<br> &nbsp; &nbsp;at endReadableNT (_stream_readable.js:1220:12)<br> &nbsp; &nbsp;at processTicksAndRejections (internal/process/task_queues.js:84:21)</pre>
 *</body>
 *
 *</html>
 */
router.delete('/:id', CouponController.deleteCoupon);
/**
 * @api {Delete} /api/admin/coupon:id Delete Coupon
 * @apiName Delete a Coupon
 * @apiGroup Admin-Coupon
 *
 * @apiSuccessExample success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "coupon": {
 *            "n": 1,
 *            "opTime": {
 *                "ts": "6805899146831069185",
 *                "t": 67
 *            },
 *            "electionId": "7fffffff0000000000000043",
 *            "ok": 1,
 *            "$clusterTime": {
 *                "clusterTime": "6805899146831069185",
 *                "signature": {
 *                    "hash": "cp3HqDvVtLUqmAh/G33Bs1XJoJw=",
 *                    "keyId": "6753601258507993089"
 *                }
 *            },
 *            "operationTime": "6805899146831069185",
 *            "deletedCount": 1
 *        }
 *    }
 *}
 *
 * @apiError UNPROCESSABLE_ENTITY Id is Invalid
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Id is invalid",
 *    "error": {
 *        "validation": {
 *            "coupon_id": [
 *                "Id is invalid"
 *            ]
 *        }
 *    }
 *}


 */


module.exports = router;

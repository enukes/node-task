const express = require('express');

const router = express.Router();

const OrderController = require('../../../controllers/driver/order');
const jwtAuth = require('../../../middlewares/jwt-auth');

router.get('/unassigned', jwtAuth, OrderController.getUnassignedOrders);

/**
 * @api {get} /api/driver/order/unassigned Get Unassigned Order
 * @apiName Get Unassigned Order
 * @apiGroup Driver-Order
 *
 * @apiHeader {String} Authorization 'Bearer' + user token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "orders": [
 *             {
 *                 "_id": "5cf67b33b4deea62d01e4b1c",
 *                 "address": {
 *                     "pickup": {
 *                         "house_no": "21/3",
 *                         "street": "XYZ street",
 *                         "area_id": "5cd01b02c1a6f3317fd9f072",
 *                         "city_id": "5cd01c1839b32d325085052d"
 *                     },
 *                     "delivery": {
 *                         "full_name": "Love",
 *                         "email": "Love@gmail.com",
 *                         "contact_number": "9900887766",
 *                         "house_no": "G-78",
 *                         "locality": "Srs",
 *                         "city_id": "5cd01c1839b32d325085052d",
 *                         "alias": "home"
 *                     }
 *                 },
 *                 "status": 2,
 *                 "is_express_delivery": false,
 *                 "payment_type": 1,
 *                 "discount": 0,
 *                 "slot_id": "5cf4faaaaef3b62836047c7e",
 *                 "deliver_start_time": "2019-06-06T10:30:00.000Z",
 *                 "deliver_end_time": "2019-06-06T12:30:00.000Z",
 *                 "customer_id": "5cf67a6fb4deea62d01e4b18",
 *                 "store_id": "5cd1259b63aff817c37afb02",
 *                 "products": [
 *                     {
 *                         "pictures": [
 *                             "z7re7faj1hjvzafr9e.jpeg"
 *                         ],
 *                         "_id": "5cf67b33b4deea62d01e4b1d",
 *                         "product_id": "5ce68f90ff79ad6065d5ba15",
 *                         "size": "1 litre",
 *                         "price": 30,
 *                         "count": 3,
 *                         "name": "Amul Milk"
 *                     }
 *                 ],
 *                 "total_amount": 90,
 *                 "order_id": "c4486c0",
 *                 "driver_assigned": false,
 *                 "created_at": "2019-06-04T14:07:47.918Z",
 *                 "updated_at": "2019-06-04T14:07:47.918Z",
 *                 "__v": 0
 *             }
 *         ]
 *     }
 * }
 */

router.put('/accept/:id', jwtAuth, OrderController.acceptOrder);

/**
 * @api {put} /api/driver/order/accept/:id Accept Order
 * @apiName Accept Order
 * @apiGroup Driver-Order
 *
 * @apiHeader {String} Authorization 'Bearer' + user token
 * @apiParam (Params) {String} id id of the order to be accepted.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "order": {
 *             "address": {
 *                 "pickup": {
 *                     "house_no": "21/3",
 *                     "street": "XYZ street",
 *                     "area_id": "5cd01b02c1a6f3317fd9f072",
 *                     "city_id": "5cd01c1839b32d325085052d"
 *                 },
 *                 "delivery": {
 *                     "alias": "work",
 *                     "full_name": "Najam ul Saqib",
 *                     "email": "najam.sahto@gmail.com",
 *                     "contact_number": "3012999901",
 *                     "house_no": "Office number 309, Progressive Plaza",
 *                     "locality": "Beaumont Road",
 *                     "landmark": "Near Marriet Hotel",
 *                     "city_id": "5cd02537b1ef5e3bfb165f5c"
 *                 }
 *             },
 *             "status": 1,
 *             "is_express_delivery": false,
 *             "payment_type": 1,
 *             "discount": 0,
 *             "delivery_charges": 0,
 *             "driver_assigned": true,
 *             "_id": "5cf6b2d5b4deea62d01e4b2a",
 *             "slot_id": "5cf4faaaaef3b62836047c7e",
 *             "deliver_start_time": "2019-06-06T10:30:00.000Z",
 *             "deliver_end_time": "2019-06-06T12:30:00.000Z",
 *             "customer_id": "5ceb927146c8cf13bc2e0db6",
 *             "store_id": "5cd1259b63aff817c37afb02",
 *             "products": [
 *                 {
 *                     "pictures": [
 *                         "z7re7faj1hjvzafr9e.jpeg"
 *                     ],
 *                     "_id": "5cf6b2d5b4deea62d01e4b2c",
 *                     "product_id": "5ce55461ff79ad6065d5b9fe",
 *                     "size": "1 litre",
 *                     "price": 30,
 *                     "count": 1,
 *                     "name": "Amul Milk"
 *                 },
 *                 {
 *                     "pictures": [
 *                         "z7re7faj1hjvzafr9e.jpeg"
 *                     ],
 *                     "_id": "5cf6b2d5b4deea62d01e4b2b",
 *                     "product_id": "5ce68f90ff79ad6065d5ba15",
 *                     "size": "1 litre",
 *                     "price": 30,
 *                     "count": 1,
 *                     "name": "Amul Milk"
 *                 }
 *             ],
 *             "total_amount": 60,
 *             "order_id": "f1444c7",
 *             "created_at": "2019-06-04T18:05:09.150Z",
 *             "updated_at": "2019-06-20T10:55:26.817Z",
 *             "__v": 0,
 *             "driver_id": "5d09d61e21d03516d24bbe7a",
 *             "taxes": []
 *         }
 *     }
 * }
 * @apiError ValidationError Order Already Accepted BY other Driver.
 *
 * @apiErrorExample Order Already Accepted BY other Driver:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "This Order has already been accepted by other driver.",
 *     "error": {
 *         "validation": {
 *             "order": [
 *                 "This Order has already been accepted by other driver."
 *             ]
 *         }
 *     }
 * }
 */

router.get('/scheduled', jwtAuth, OrderController.scheduledOrders);

/**
 * @api {get} /api/driver/order/scheduled Scheduled Orders
 * @apiName Scheduled Orders
 * @apiGroup Driver-Order
 *
 * @apiHeader {String} Authorization 'Bearer' + user token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "orders": [
 *             {
 *                 "_id": "5cf6b2d5b4deea62d01e4b2a",
 *                 "address": {
 *                     "pickup": {
 *                         "house_no": "21/3",
 *                         "street": "XYZ street",
 *                         "area_id": "5cd01b02c1a6f3317fd9f072",
 *                         "city_id": "5cd01c1839b32d325085052d"
 *                     },
 *                     "delivery": {
 *                         "alias": "work",
 *                         "full_name": "Najam ul Saqib",
 *                         "email": "najam.sahto@gmail.com",
 *                         "contact_number": "3012999901",
 *                         "house_no": "Office number 309, Progressive Plaza",
 *                         "locality": "Beaumont Road",
 *                         "landmark": "Near Marriet Hotel",
 *                         "city_id": "5cd02537b1ef5e3bfb165f5c",
 *                         "city": {
 *                             "_id": "5cd02537b1ef5e3bfb165f5c",
 *                             "areas": [
 *                                 "5cd01b12c96f3731b5639a17",
 *                                 "5cd01b1d14310e31d2ffff6d"
 *                             ],
 *                             "name": "Lahore",
 *                             "created_at": "2019-05-06T12:14:47.699Z",
 *                             "updated_at": "2019-05-06T12:14:47.699Z",
 *                             "__v": 0
 *                         }
 *                     }
 *                 },
 *                 "status": 1,
 *                 "is_express_delivery": false,
 *                 "payment_type": 1,
 *                 "discount": 0,
 *                 "slot_id": "5cf4faaaaef3b62836047c7e",
 *                 "deliver_start_time": "2019-06-06T10:30:00.000Z",
 *                 "deliver_end_time": "2019-06-06T12:30:00.000Z",
 *                 "customer_id": "5ceb927146c8cf13bc2e0db6",
 *                 "store_id": "5cd1259b63aff817c37afb02",
 *                 "products": [
 *                     {
 *                         "pictures": [
 *                             "z7re7faj1hjvzafr9e.jpeg"
 *                         ],
 *                         "_id": "5cf6b2d5b4deea62d01e4b2c",
 *                         "product_id": "5ce55461ff79ad6065d5b9fe",
 *                         "size": "1 litre",
 *                         "price": 30,
 *                         "count": 1,
 *                         "name": "Amul Milk"
 *                     },
 *                     {
 *                         "pictures": [
 *                             "z7re7faj1hjvzafr9e.jpeg"
 *                         ],
 *                         "_id": "5cf6b2d5b4deea62d01e4b2b",
 *                         "product_id": "5ce68f90ff79ad6065d5ba15",
 *                         "size": "1 litre",
 *                         "price": 30,
 *                         "count": 1,
 *                         "name": "Amul Milk"
 *                     }
 *                 ],
 *                 "total_amount": 60,
 *                 "order_id": "f1444c7",
 *                 "driver_assigned": true,
 *                 "created_at": "2019-06-04T18:05:09.150Z",
 *                 "updated_at": "2019-06-20T10:55:26.817Z",
 *                 "__v": 0,
 *                 "driver_id": "5d09d61e21d03516d24bbe7a",
 *                 "store": {
 *                     "_id": "5cd1259b63aff817c37afb02",
 *                     "picture": "ivvf6q6jx4hu1j7.png",
 *                     "status": 1,
 *                     "email": "khushal.pahuja@enukesoftware.com",
 *                     "contact_number": "9711669906",
 *                     "name": "XYZ store",
 *                     "owner": {
 *                         "full_name": "khushal pahuja",
 *                         "email": "khushal.pahuja@enukesoftware.com",
 *                         "contact_number": "9711669906",
 *                         "password": "$2b$10$.tTIIkskAAhZqEg20cfVx.sHXlnPB93/zVLBFldR6anWN1Qdc8MIC"
 *                     },
 *                     "commission": 2,
 *                     "address": {
 *                         "area_id": "5cd01b02c1a6f3317fd9f072",
 *                         "city_id": "5cd01c1839b32d325085052d",
 *                         "shop_no": "123",
 *                         "locality": "Near Test Corner"
 *                     },
 *                     "timings": {
 *                         "open_time": "08:00",
 *                         "close_time": "20:00"
 *                     },
 *                     "created_at": "2019-05-07T06:28:43.580Z",
 *                     "updated_at": "2019-05-07T06:28:43.580Z",
 *                     "drivers": [
 *                         "5d09d61e21d03516d24bbe7a"
 *                     ],
 *                     "__v": 0,
 *                     "has_express_delivery": false,
 *                     "self_delivery": false
 *                 }
 *             },
 *             {
 *                 "_id": "5cf67b33b4deea62d01e4b1c",
 *                 "address": {
 *                     "pickup": {
 *                         "house_no": "21/3",
 *                         "street": "XYZ street",
 *                         "area_id": "5cd01b02c1a6f3317fd9f072",
 *                         "city_id": "5cd01c1839b32d325085052d"
 *                     },
 *                     "delivery": {
 *                         "full_name": "Love",
 *                         "email": "Love@gmail.com",
 *                         "contact_number": "9900887766",
 *                         "house_no": "G-78",
 *                         "locality": "Srs",
 *                         "city_id": "5cd01c1839b32d325085052d",
 *                         "alias": "home",
 *                         "city": {
 *                             "_id": "5cd01c1839b32d325085052d",
 *                             "areas": [
 *                                 "5cd01b02c1a6f3317fd9f072",
 *                                 "5cd01b0cf03a5831a00732d9"
 *                             ],
 *                             "name": "Islamabad",
 *                             "created_at": "2019-05-06T11:35:52.520Z",
 *                             "updated_at": "2019-05-06T11:35:52.520Z",
 *                             "__v": 0
 *                         }
 *                     }
 *                 },
 *                 "status": 1,
 *                 "is_express_delivery": false,
 *                 "payment_type": 1,
 *                 "discount": 0,
 *                 "slot_id": "5cf4faaaaef3b62836047c7e",
 *                 "deliver_start_time": "2019-06-20T00:30:00.000Z",
 *                 "deliver_end_time": "2019-06-20T02:30:00.000Z",
 *                 "customer_id": "5cf67a6fb4deea62d01e4b18",
 *                 "store_id": "5cd1259b63aff817c37afb02",
 *                 "products": [
 *                     {
 *                         "pictures": [
 *                             "z7re7faj1hjvzafr9e.jpeg"
 *                         ],
 *                         "_id": "5cf67b33b4deea62d01e4b1d",
 *                         "product_id": "5ce68f90ff79ad6065d5ba15",
 *                         "size": "1 litre",
 *                         "price": 30,
 *                         "count": 3,
 *                         "name": "Amul Milk"
 *                     }
 *                 ],
 *                 "total_amount": 90,
 *                 "order_id": "c4486c0",
 *                 "driver_assigned": true,
 *                 "created_at": "2019-06-04T14:07:47.918Z",
 *                 "updated_at": "2019-06-20T05:40:38.015Z",
 *                 "__v": 0,
 *                 "driver_id": "5d09d61e21d03516d24bbe7a",
 *                 "store": {
 *                     "_id": "5cd1259b63aff817c37afb02",
 *                     "picture": "ivvf6q6jx4hu1j7.png",
 *                     "status": 1,
 *                     "email": "khushal.pahuja@enukesoftware.com",
 *                     "contact_number": "9711669906",
 *                     "name": "XYZ store",
 *                     "owner": {
 *                         "full_name": "khushal pahuja",
 *                         "email": "khushal.pahuja@enukesoftware.com",
 *                         "contact_number": "9711669906",
 *                         "password": "$2b$10$.tTIIkskAAhZqEg20cfVx.sHXlnPB93/zVLBFldR6anWN1Qdc8MIC"
 *                     },
 *                     "commission": 2,
 *                     "address": {
 *                         "area_id": "5cd01b02c1a6f3317fd9f072",
 *                         "city_id": "5cd01c1839b32d325085052d",
 *                         "shop_no": "123",
 *                         "locality": "Near Test Corner"
 *                     },
 *                     "timings": {
 *                         "open_time": "08:00",
 *                         "close_time": "20:00"
 *                     },
 *                     "created_at": "2019-05-07T06:28:43.580Z",
 *                     "updated_at": "2019-05-07T06:28:43.580Z",
 *                     "drivers": [
 *                         "5d09d61e21d03516d24bbe7a"
 *                     ],
 *                     "__v": 0,
 *                     "has_express_delivery": false,
 *                     "self_delivery": false
 *                 }
 *             }
 *         ]
 *     }
 * }
 */

router.get('/', jwtAuth, OrderController.getDriverOrders);

/**
 * @api {get} /api/driver/order Get driver orders
 * @apiName Get driver orders
 * @apiGroup Driver-Order
 *
 * @apiParam (Query String) {String} status (optional) Status of the order to be displayed.
 * @apiParam (Query String) {String} from_date (optional) (YYYY-MM-DD) Start Date of the order to be displayed Otherwise today's date is considered .
 * @apiParam (Query String) {String} to_date (optional) (YYYY-MM-DD) End Date of the order to be displayed Otherwise today's date is considered.
 *
 * @apiHeader {String} Authorization 'Bearer' + user token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "orders": [
 *             {
 *                 "_id": "5cf67b33b4deea62d01e4b1c",
 *                 "address": {
 *                     "pickup": {
 *                         "house_no": "21/3",
 *                         "street": "XYZ street",
 *                         "area_id": "5cd01b02c1a6f3317fd9f072",
 *                         "city_id": "5cd01c1839b32d325085052d"
 *                     },
 *                     "delivery": {
 *                         "full_name": "Love",
 *                         "email": "Love@gmail.com",
 *                         "contact_number": "9900887766",
 *                         "house_no": "G-78",
 *                         "locality": "Srs",
 *                         "city_id": "5cd01c1839b32d325085052d",
 *                         "alias": "home",
 *                         "city": {
 *                             "_id": "5cd01c1839b32d325085052d",
 *                             "areas": [
 *                                 "5cd01b02c1a6f3317fd9f072",
 *                                 "5cd01b0cf03a5831a00732d9"
 *                             ],
 *                             "name": "Islamabad",
 *                             "created_at": "2019-05-06T11:35:52.520Z",
 *                             "updated_at": "2019-05-06T11:35:52.520Z",
 *                             "__v": 0
 *                         }
 *                     }
 *                 },
 *                 "status": 3,
 *                 "is_express_delivery": false,
 *                 "payment_type": 1,
 *                 "discount": 0,
 *                 "slot_id": "5cf4faaaaef3b62836047c7e",
 *                 "deliver_start_time": "2019-06-20T00:30:00.000Z",
 *                 "deliver_end_time": "2019-06-20T02:30:00.000Z",
 *                 "customer_id": "5cf67a6fb4deea62d01e4b18",
 *                 "store_id": "5cd1259b63aff817c37afb02",
 *                 "products": [
 *                     {
 *                         "pictures": [
 *                             "z7re7faj1hjvzafr9e.jpeg"
 *                         ],
 *                         "_id": "5cf67b33b4deea62d01e4b1d",
 *                         "product_id": "5ce68f90ff79ad6065d5ba15",
 *                         "size": "1 litre",
 *                         "price": 30,
 *                         "count": 3,
 *                         "name": "Amul Milk"
 *                     }
 *                 ],
 *                 "total_amount": 90,
 *                 "order_id": "c4486c0",
 *                 "driver_assigned": true,
 *                 "created_at": "2019-06-04T14:07:47.918Z",
 *                 "updated_at": "2019-06-20T05:40:38.015Z",
 *                 "__v": 0,
 *                 "driver_id": "5d09d61e21d03516d24bbe7a",
 *                 "store": {
 *                     "_id": "5cd1259b63aff817c37afb02",
 *                     "picture": "ivvf6q6jx4hu1j7.png",
 *                     "status": 1,
 *                     "email": "khushal.pahuja@enukesoftware.com",
 *                     "contact_number": "9711669906",
 *                     "name": "XYZ store",
 *                     "owner": {
 *                         "full_name": "khushal pahuja",
 *                         "email": "khushal.pahuja@enukesoftware.com",
 *                         "contact_number": "9711669906",
 *                         "password": "$2b$10$.tTIIkskAAhZqEg20cfVx.sHXlnPB93/zVLBFldR6anWN1Qdc8MIC"
 *                     },
 *                     "commission": 2,
 *                     "address": {
 *                         "area_id": "5cd01b02c1a6f3317fd9f072",
 *                         "city_id": "5cd01c1839b32d325085052d",
 *                         "shop_no": "123",
 *                         "locality": "Near Test Corner"
 *                     },
 *                     "timings": {
 *                         "open_time": "08:00",
 *                         "close_time": "20:00"
 *                     },
 *                     "created_at": "2019-05-07T06:28:43.580Z",
 *                     "updated_at": "2019-05-07T06:28:43.580Z",
 *                     "drivers": [
 *                         "5d09d61e21d03516d24bbe7a"
 *                     ],
 *                     "__v": 0,
 *                     "has_express_delivery": false,
 *                     "self_delivery": false
 *                 }
 *             }
 *         ],
 *         "orderCounts": {
 *             "total": 3,
 *             "unDelivered": 0,
 *             "completed": 1
 *         }
 *     }
 * }
 */

router.put('/status-update/:id', jwtAuth, OrderController.changeOrderStatus);

/**
 * @api {put} /api/driver/order/status-update/:id Update order status
 * @apiName Update order status
 * @apiGroup Driver-Order
 *
 * @apiParam (param) {String} id Id of the order to be updated.
 *
 * @apiParam (body) {String} status Status of the order.
 *
 * @apiHeader {String} Authorization 'Bearer' + user token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "order": {
 *             "address": {
 *                 "pickup": {
 *                     "house_no": "21/3",
 *                     "street": "XYZ street",
 *                     "area_id": "5cd01b02c1a6f3317fd9f072",
 *                     "city_id": "5cd01c1839b32d325085052d"
 *                 },
 *                 "delivery": {
 *                     "alias": "work",
 *                     "full_name": "Najam ul Saqib",
 *                     "email": "najam.sahto@gmail.com",
 *                     "contact_number": "3012999901",
 *                     "house_no": "Office number 309, Progressive Plaza",
 *                     "locality": "Beaumont Road",
 *                     "landmark": "Near Marriet Hotel",
 *                     "city_id": "5cd02537b1ef5e3bfb165f5c"
 *                 }
 *             },
 *             "status": 4,
 *             "is_express_delivery": false,
 *             "payment_type": 1,
 *             "discount": 0,
 *             "delivery_charges": 0,
 *             "driver_assigned": true,
 *             "_id": "5cf6b2d5b4deea62d01e4b2a",
 *             "slot_id": "5cf4faaaaef3b62836047c7e",
 *             "deliver_start_time": "2019-06-06T10:30:00.000Z",
 *             "deliver_end_time": "2019-06-06T12:30:00.000Z",
 *             "customer_id": "5ceb927146c8cf13bc2e0db6",
 *             "store_id": "5cd1259b63aff817c37afb02",
 *             "products": [
 *                 {
 *                     "pictures": [
 *                         "z7re7faj1hjvzafr9e.jpeg"
 *                     ],
 *                     "_id": "5cf6b2d5b4deea62d01e4b2c",
 *                     "product_id": "5ce55461ff79ad6065d5b9fe",
 *                     "size": "1 litre",
 *                     "price": 30,
 *                     "count": 1,
 *                     "name": "Amul Milk"
 *                 },
 *                 {
 *                     "pictures": [
 *                         "z7re7faj1hjvzafr9e.jpeg"
 *                     ],
 *                     "_id": "5cf6b2d5b4deea62d01e4b2b",
 *                     "product_id": "5ce68f90ff79ad6065d5ba15",
 *                     "size": "1 litre",
 *                     "price": 30,
 *                     "count": 1,
 *                     "name": "Amul Milk"
 *                 }
 *             ],
 *             "total_amount": 60,
 *             "order_id": "f1444c7",
 *             "created_at": "2019-06-04T18:05:09.150Z",
 *             "updated_at": "2019-06-20T14:17:31.411Z",
 *             "__v": 0,
 *             "driver_id": "5d09d61e21d03516d24bbe7a",
 *             "taxes": []
 *         }
 *     }
 * }
 */

module.exports = router;

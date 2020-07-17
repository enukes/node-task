const express = require('express');

const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');

const OrderController = require('../../../controllers/customer/order');

router.post('/checkout', jwtAuth, OrderController.placeOrder.bind(OrderController));

/**
* @api {post} /api/customer/order/checkout Order Checkout
* @apiName Order Checkout
* @apiGroup Customer-Order
*
* @apiHeader {String} Authorization 'Bearer' + user token
*
* @apiParam (Body) {String} store_id Id of the store.
* @apiParam (Body) {String} slot_id Id of the Slot in which it is to be delivered.
* @apiParam (Body) {String} address_id Address Id of the customer at which the order is to be delivered.
* @apiParam (Body) {Object[]} products An object with fields "quantity" (quantity of product ) ,  "_id" (product id).
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
*                     "street": "test street",
*                     "area_id": "5cd01b02c1a6f3317fdBoo9f072",
*                     "city_id": "5cd01c1839b32d325085052d"
*                 },
*                 "delivery": {
*                     "house_no": "23-R",
*                     "locality": "xyz colony",
*                     "city_id": "5cd01c1839b32d325085052d",
*                     "alias": "home",
*                     "landmark": "xyz park",
*                     "email": "khushal@gmail.com",
*                     "contact_number": "9711669906",
*                     "full_name": "khushal"
*                 }
*             },
*             "status": 1,
*             "is_express_delivery": false,
*             "payment_type": 1,
*             "discount": 0,
*             "_id": "5cefc0819527d436cfca3b21",
*             "deliver_start_time": "2019-05-30T11:37:37.789Z",
*             "deliver_end_time": "2019-05-30T13:37:37.789Z",
*             "customer_id": "5ce7f068b9c00379c7d8564b",
*             "store_id": "5ce513d4a2041b29b2543750",
*             "products": [
*                 {
*                     "pictures": [
*                         "ivvffb3jvz9rs8h.jpg"
*                     ],
*                     "_id": "5cefc0819527d436cfca3b22",
*                     "product_id": "5ce55003a047874d7fc513ed",
*                     "size": "250 g",
*                     "price": 30,
*                     "count": 2,
*                     "name": "Bru Coffee"
*                 }
*             ],
*             "total_amount": 60,
*             "created_at": "2019-05-30T11:37:37.866Z",
*             "updated_at": "2019-05-30T11:37:37.866Z",
*             "__v": 0
*         }
*     }
* }
*
* @apiError ValidationError Invalid Data.
*
* @apiErrorExample Address Id is invalid:
*{
*    "success": false,
*    "code": {
*        "code": 422,
*        "name": "UNPROCESSABLE_ENTITY",
*        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
*    },
*    "singleStringMessage": "Address Id is invalid",
*    "error": {
*        "validation": {
*            "address_id": [
*                "Address Id is invalid"
*            ]
*        }
*    }
*}

* @apiErrorExample Slot Id is invalid:
*{
*    "success": false,
*    "code": {
*        "code": 422,
*        "name": "UNPROCESSABLE_ENTITY",
*        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
*    },
*    "singleStringMessage": "Slot Id is Invalid",
*    "error": {
*        "validation": {
*            "slot_id": [
*                "Slot Id is Invalid"
*            ]
*        }
*    }
*}
* @apiErrorExample Some Products are not available:
*{
*    "success": false,
*    "code": {
*        "code": 422,
*        "name": "UNPROCESSABLE_ENTITY",
*        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
*    },
*    "singleStringMessage": "Some Products Are Not Available Right Now",
*    "error": {
*        "validation": {
*            "message": "Some Products Are Not Available Right Now",
*            "outOfStockProducts": [
*                {
*                    "_id": "5ce55003a047874d7fc513ed",
*                    "stock_quantity": 0,
*                    "quantity_ordered": 100
*                }
*            ]
*        }
*    }
*}
*/

router.get('/', jwtAuth, OrderController.getOrders);

/**
* @api {get} /api/customer/order Order History
* @apiName Order History
* @apiGroup Customer-Order
*
* @apiHeader {String} Authorization 'Bearer' + user token
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*{
*    "success": true,
*    "code": 200,
*    "data": {
*        "orders": [
*            {
*                "_id": "5cefc0819527d436cfca3b21",
*                "address": {
*                    "pickup": {
*                        "street": "test street",
*                        "area_id": "5cd01b02c1a6f3317fd9f072",
*                        "city_id": "5cd01c1839b32d325085052d"
*                    },
*                    "delivery": {
*                        "house_no": "23-R",
*                        "locality": "xyz colony",
*                        "city_id": "5cd01c1839b32d325085052d",
*                        "alias": "home",
*                        "landmark": "xyz park",
*                        "email": "khushal@gmail.com",
*                        "contact_number": "9711669906",
*                        "full_name": "khushal"
*                    }
*                },
*                "status": 1,
*                "is_express_delivery": false,
*                "payment_type": 1,
*                "discount": 0,
*                "deliver_start_time": "2019-05-30T11:37:37.789Z",
*                "deliver_end_time": "2019-05-30T13:37:37.789Z",
*                "customer_id": "5ce7f068b9c00379c7d8564b",
*                "store_id": "5ce513d4a2041b29b2543750",
*                "products": [
*                    {
*                        "pictures": [
*                            "ivvffb3jvz9rs8h.jpg"
*                        ],
*                        "_id": "5cefc0819527d436cfca3b22",
*                        "product_id": "5ce55003a047874d7fc513ed",
*                        "size": "250 g",
*                        "price": 30,
*                        "count": 2,
*                        "name": "Bru Coffee"
*                    }
*                ],
*                "total_amount": 60,
*                "created_at": "2019-05-30T11:37:37.866Z",
*                "updated_at": "2019-05-30T11:37:37.866Z",
*                "__v": 0,
*                "store": {
*                    "_id": "5ce513d4a2041b29b2543750",
*                    "picture": "ivvf88ijvz0lk37.png",
*                    "status": 3,
*                    "name": "Health Store",
*                    "address": {
*                        "street": "test street",
*                        "area_id": "5cd01b02c1a6f3317fd9f072",
*                        "city_id": "5cd01c1839b32d325085052d"
*                    },
*                    "commission": 10,
*                    "owner": {
*                        "full_name": "Aditya",
*                        "email": "aditya@gmail.com",
*                        "contact_number": "1234567890",
*                        "password": "$2b$10$3/e.Z01e6SoeAht85tyrK.oqiMd/amt.WqfEY7qeYj.VZ5Lx.lRue"
*                    },
*                    "timings": {
*                        "open_time": "08:00",
*                        "close_time": "20:00"
*                    },
*                    "has_express_delivery": true,
*                    "created_at": "2019-05-22T09:18:12.315Z",
*                    "updated_at": "2019-05-22T09:18:12.315Z",
*                    "__v": 0
*                }
*            }
*        ]
*    }
*}
*
*/

router.get('/:id', jwtAuth, OrderController.getOrderById);
router.put('/cancel', jwtAuth, OrderController.cancelOrder);

/**
* @api {put} /api/customer/order/cancel Cancel Order
* @apiName Cancel Order
* @apiGroup Customer-Order
*
* @apiHeader {String} Authorization 'Bearer' + user token
*
* @apiParam (Body) {String} order_id Id of the order to be cancelled.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*{
*    "success": true,
*    "code": 200,
*    "data": {
*        "orders": [
*            {
*                "_id": "5cefc0819527d436cfca3b21",
*                "address": {
*                    "pickup": {
*                        "street": "test street",
*                        "area_id": "5cd01b02c1a6f3317fd9f072",
*                        "city_id": "5cd01c1839b32d325085052d"
*                    },
*                    "delivery": {
*                        "house_no": "23-R",
*                        "locality": "xyz colony",
*                        "city_id": "5cd01c1839b32d325085052d",
*                        "alias": "home",
*                        "landmark": "xyz park",
*                        "email": "khushal@gmail.com",
*                        "contact_number": "9711669906",
*                        "full_name": "khushal"
*                    }
*                },
*                "status": 5,
*                "is_express_delivery": false,
*                "payment_type": 1,
*                "discount": 0,
*                "deliver_start_time": "2019-05-30T11:37:37.789Z",
*                "deliver_end_time": "2019-05-30T13:37:37.789Z",
*                "customer_id": "5ce7f068b9c00379c7d8564b",
*                "store_id": "5ce513d4a2041b29b2543750",
*                "products": [
*                    {
*                        "pictures": [
*                            "ivvffb3jvz9rs8h.jpg"
*                        ],
*                        "_id": "5cefc0819527d436cfca3b22",
*                        "product_id": "5ce55003a047874d7fc513ed",
*                        "size": "250 g",
*                        "price": 30,
*                        "count": 2,
*                        "name": "Bru Coffee"
*                    }
*                ],
*                "total_amount": 60,
*                "created_at": "2019-05-30T11:37:37.866Z",
*                "updated_at": "2019-05-30T11:37:37.866Z",
*                "__v": 0,
*                "store": {
*                    "_id": "5ce513d4a2041b29b2543750",
*                    "picture": "ivvf88ijvz0lk37.png",
*                    "status": 3,
*                    "name": "Health Store",
*                    "address": {
*                        "street": "test street",
*                        "area_id": "5cd01b02c1a6f3317fd9f072",
*                        "city_id": "5cd01c1839b32d325085052d"
*                    },
*                    "commission": 10,
*                    "owner": {
*                        "full_name": "Aditya",
*                        "email": "aditya@gmail.com",
*                        "contact_number": "1234567890",
*                        "password": "$2b$10$3/e.Z01e6SoeAht85tyrK.oqiMd/amt.WqfEY7qeYj.VZ5Lx.lRue"
*                    },
*                    "timings": {
*                        "open_time": "08:00",
*                        "close_time": "20:00"
*                    },
*                    "has_express_delivery": true,
*                    "created_at": "2019-05-22T09:18:12.315Z",
*                    "updated_at": "2019-05-22T09:18:12.315Z",
*                    "__v": 0
*                }
*            }
*        ]
*    }
*}
* @apiError ValidationError Order cannot be cancelled.
*
* @apiErrorExample Order cannot be cancelled:
*{
*    "success": false,
*    "code": {
*        "code": 422,
*        "name": "UNPROCESSABLE_ENTITY",
*        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
*    },
*    "singleStringMessage": "The Order cannot be cancelled. Please Contact Customer Support.",
*    "error": {
*        "validation": {
*            "order": [
*                "The Order cannot be cancelled. Please Contact Customer Support."
*            ]
*        }
*    }
*}
*/

router.get('/getOrderedStores', jwtAuth, OrderController.getStoreswithCustomer);

/**
 * @api {Get} /api/customer/order/getOrderedStores Get Ordered Stores
 * @apiName Get Ordered Store
 * @apiGroup Customer-Order
 *
* @apiHeader {String} Authorization 'Bearer' + user token
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "stores": [
 *            {
 *                "_id": "5e05d5ff954bc84f45786dd6",
 *                "picture": "KNN STORE.jpg",
 *                "has_express_delivery": true,
 *                "drivers": [
 *                    "5d9dda22d22f1e78b76728c3",
 *                    "5dea5445d85c19035ebf121e",
 *                    "5dea892ed85c19035ebf1238",
 *                    "5dea53edd85c19035ebf121d",
 *                    "5e4e2a39d21fe166d8c94153",
 *                    "5e537a88d21fe166d8c94568",
 *                    "5e58ec2a2daf030e5c835e34"
 *                ],
 *                "status": 1,
 *                "timings": {
 *                    "open_time": "11:00",
 *                    "close_time": "23:00"
 *                },
 *                "owner": {
 *                    "email": "najam.sahto@gmail.com",
 *                    "password": "$2b$10$oJMcgQDP2Ml8SO0lxoCHmu.gblcisq8Ue18wiKtAX0ZL6KUTbqjsm",
 *                    "full_name": "Najam",
 *                    "contact_number": "03012999901"
 *                },
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "_id": "5e05d5ff954bc84f45786dd7",
 *                        "coordinates": {
 *                            "latitude": 24.9237623,
 *                            "longitude": 67.1405999
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d10d21fe166d8c93049",
 *                        "shop_no": "Shop #101  Street 5, Block 10 Gulistan-e-Johar, Karachi, Karachi City, Sindh Pakistan",
 *                        "locality": "Kamran Chorangi",
 *                        "gps_address": "Street 5, Block 10 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "1K9RNH"
 *                    },
 *                    {
 *                        "_id": "5e26d1f5d21fe166d8c9305b",
 *                        "coordinates": {
 *                            "latitude": 24.901932227546816,
 *                            "longitude": 67.08738320527952
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d43d21fe166d8c9304a",
 *                        "shop_no": "Shop B 170, Block 18 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan",
 *                        "locality": "Itehad Park",
 *                        "gps_address": "Plot B 170, Block 18 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "2nq4ow"
 *                    }
 *                ],
 *                "name": "KNN General Store",
 *                "commission": 2,
 *                "created_at": "2019-12-27T09:59:27.130Z",
 *                "updated_at": "2020-03-19T09:03:59.547Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDVkNWZmOTU0YmM4NGY0NTc4NmRkNiIsInR5cGUiOjIsImlhdCI6MTU4NDYwODYzOX0.g8s1cZ1vlgZJVRQOSwdfq2NQjtBlHVSm_IM21cmKqdk"
 *            }
 *        ]
 *    }
 *}
 *
 * @apiError 401 Unauthorized
 *
 * {
 *    "success": false,
 *    "error": 401
 *}
 *
 *
 */


router.get('/invoice/:id', OrderController.getInvoice);
router.get('/invoice-layout/:id', OrderController.getInvoiceData);
router.post('/:id/review', jwtAuth, OrderController.reviewOrder);


module.exports = router;

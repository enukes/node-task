const express = require('express');

const router = express.Router();
const path = require('path').resolve;

const OrderController = require('../../../controllers/admin/order');

router.get('/', OrderController.getOrders);
/**
 *
 * @api {Get} /api/store/order Get Orders
 * @apiName Get Orders
 * @apiGroup Store-Orders
 *
 * @apiParam (Query String) {String} pageNo Current Page Number
 * @apiParam (Query String) {String} perPage Items to be displayed in per page.
 * @apiParam (Query String) {String} search Orders to be searched
 * @apiParam (Query String) {String} name Sort Field
 * @apiParam (Query String) {String} {Option} sortType Sort Type
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "order": [
 *            {
 *                "_id": "5dfa1983954bc84f45786cf7",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Shahroz",
 *                        "contact_number": "9999999999",
 *                        "locality": "Test",
 *                        "landmark": "Ind",
 *                        "email": "shahroz.ansari@enukesoftware.com",
 *                        "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                        "house_no": "22",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": true,
 *                "store_paid": false,
 *                "slot_id": "5df9f3aa4648a37afa44d183",
 *                "deliver_start_time": "2019-12-21T10:00:00.000Z",
 *                "deliver_end_time": "2019-12-21T12:00:00.000Z",
 *                "customer_id": "5df72e9d4648a37afa44d12e",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "0080010.jpg0080010.jpg"
 *                        ],
 *                        "_id": "5dfa1983954bc84f45786cf8",
 *                        "product_id": "5de8a00dd85c19035ebf116e",
 *                        "size": "1 Pc",
 *                        "price": 275,
 *                        "count": 1,
 *                        "name": "Ceramic Mug"
 *                    }
 *                ],
 *                "total_amount": 275,
 *                "taxes": [],
 *                "total_amount_after_tax": 275,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 55,
 *                "store_payout_amount": 220,
 *                "order_id": "63aa8c2",
 *                "created_at": "2019-12-18T12:20:19.422Z",
 *                "updated_at": "2020-01-10T14:01:11.089Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e186dc0c011a50c3ad3cdb5",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.86137168713979,
 *                            "longitude": 67.0001451335907
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "pratibha",
 *                        "email": "pratibha.chaudhary@enukesoftware.com",
 *                        "contact_number": "8796231458",
 *                        "house_no": "sdfdsf",
 *                        "locality": "dfdsf",
 *                        "landmark": "dfdsfdsf",
 *                        "gps_address": "Pitchar Rd, Shiddi Village, Karachi, Karachi City, Sindh, Pakistan",
 *                        "what_3_words": "dfdf gryrty",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 3,
 *                "is_express_delivery": true,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": true,
 *                "store_paid": false,
 *                "deliver_start_time": "2020-01-10T12:27:44.427Z",
 *                "deliver_end_time": "2020-01-10T14:27:44.427Z",
 *                "customer_id": "5e186d7c08f1d10c6f28809d",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "0080010.jpg0080010.jpg"
 *                        ],
 *                        "_id": "5e186dc0c011a50c3ad3cdb8",
 *                        "product_id": "5de8a00dd85c19035ebf116e",
 *                        "size": "1 Pc",
 *                        "price": 275,
 *                        "count": 2,
 *                        "name": "Ceramic Mug"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "0080011.jpg"
 *                        ],
 *                        "_id": "5e186dc0c011a50c3ad3cdb7",
 *                        "product_id": "5de8a015d85c19035ebf116f",
 *                        "size": "1 Pc",
 *                        "price": 100,
 *                        "count": 2,
 *                        "name": "China Mug (Size - L)"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "0080012.jpg"
 *                        ],
 *                        "_id": "5e186dc0c011a50c3ad3cdb6",
 *                        "product_id": "5de8a01ed85c19035ebf1170",
 *                        "size": "1 Pc",
 *                        "price": 70,
 *                        "count": 3,
 *                        "name": "China Mug (Size - M)"
 *                    }
 *                ],
 *                "total_amount": 960,
 *                "taxes": [],
 *                "total_amount_after_tax": 960,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 192,
 *                "store_payout_amount": 768,
 *                "order_id": "26050c3",
 *                "created_at": "2020-01-10T12:27:44.465Z",
 *                "updated_at": "2020-01-10T14:16:18.852Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e187c28401e1a0c41f65dc3",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.86187788373269,
 *                            "longitude": 67.00032752380372
 *                        },
 *                        "alias": "work",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Ruqaiya",
 *                        "email": "ruqaiya@guerrillamail.com",
 *                        "contact_number": "8796231458",
 *                        "house_no": "gjuyt",
 *                        "locality": "eredf",
 *                        "landmark": "dfdsf",
 *                        "gps_address": "Muhammad Ali Alvi Rd, Shiddi Village, Karachi, Karachi City, Sindh, Pakistan",
 *                        "what_3_words": null,
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 3,
 *                "is_express_delivery": true,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "deliver_start_time": "2020-01-10T13:29:12.264Z",
 *                "deliver_end_time": "2020-01-10T15:29:12.267Z",
 *                "customer_id": "5e186d7c08f1d10c6f28809d",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "0080011.jpg"
 *                        ],
 *                        "_id": "5e187c28401e1a0c41f65dc4",
 *                        "product_id": "5de8a015d85c19035ebf116f",
 *                        "size": "1 Pc",
 *                        "price": 100,
 *                        "count": 6,
 *                        "name": "China Mug (Size - L)"
 *                    }
 *                ],
 *                "total_amount": 600,
 *                "taxes": [],
 *                "total_amount_after_tax": 600,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 120,
 *                "store_payout_amount": 480,
 *                "order_id": "bbbf731",
 *                "created_at": "2020-01-10T13:29:12.292Z",
 *                "updated_at": "2020-01-10T13:56:00.234Z",
 *                "__v": 0,{
    "success": true,
    "code": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NTAzMTExMn0.PINUvpQKU5HqYlpB3QpdfmjeLH6ytXt0kl3sKM9UB3Q",
        "user": {
            "timings": {
                "open_time": "5:00",
                "close_time": "23:00"
            },
            "owner": {
                "email": "enuke@enuke.com",
                "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
                "full_name": "Enuke",
                "contact_number": "9999988888"
            },
            "picture": "img store.jpg",
            "has_express_delivery": false,
            "drivers": [
                "5d79f10ed22f1e78b7671d74"
            ],
            "status": 1,
            "_id": "5d778327d22f1e78b7671bd2",
            "self_delivery": false,
            "address": [
                {
                    "coordinates": {
                        "latitude": 24.8607,
                        "longitude": 67.0011
                    },
                    "_id": "5d778327d22f1e78b7671bd3",
                    "city_id": "5d7603909b5f0f76ee4f68ad",
                    "area_id": "5e469966d21fe166d8c9356f",
                    "shop_no": "20",
                    "locality": "test locality",
                    "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
                    "unique_link": "Z1xaR9L"
                }
            ],
            "name": "Enuke Test store",
            "commission": 20,
            "created_at": "2019-09-10T11:04:07.991Z",
            "updated_at": "2020-03-24T06:24:16.648Z",
            "__v": 0,
            "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
            "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NTAzMTA1Nn0.ixUzo5UC7PhGrzjhKom1F5Fqzf2v4V3oAifIKssjK-0",
            "delivery_charges": [
                {
                    "_id": "5e5dc219f2b4181e2319f026",
                    "order_amount": 500,
                    "charges": 100
                },
                {
                    "_id": "5e5dc219f2b4181e2319f025",
                    "order_amount": 800,
                    "charges": 50
                },
                {
                    "_id": "5e5dc219f2b4181e2319f024",
                    "order_amount": 1000,
                    "charges": 30
                }
            ],
            "storeCategory": "5e4fb5d3beee3369a6b32a0b"
        }
    }
}
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e187c4c08f1d10c6f28809f",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.86138142170918,
 *                            "longitude": 66.99995201454163
 *                        },
 *                        "alias": "work",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Pratibha Chaudhray",
 *                        "email": "pratibha.chaudhary@enukesoftware.com",
 *                        "contact_number": "8796231458",
 *                        "house_no": "32B, old dlf",
 *                        "locality": "dfsd",
 *                        "landmark": "dfds",
 *                        "gps_address": "Pitchar Rd, Shiddi Village, Karachi, Karachi City, Sindh, Pakistan",
 *                        "what_3_words": "",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 3,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5e0e3dec954bc84f45786ff0",
 *                "deliver_start_time": "2020-01-10T14:00:00.000Z",
 *                "deliver_end_time": "2020-01-10T16:00:00.000Z",
 *                "customer_id": "5e186d7c08f1d10c6f28809d",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "0080012.jpg"
 *                        ],
 *                        "_id": "5e187c4c08f1d10c6f2880a0",
 *                        "product_id": "5de8a01ed85c19035ebf1170",
 *                        "size": "1 Pc",
 *                        "price": 70,
 *                        "count": 10,
 *                        "name": "China Mug (Size - M)"
 *                    }
 *                ],
 *                "total_amount": 700,
 *                "taxes": [],
 *                "total_amount_after_tax": 700,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 140,
 *                "store_payout_amount": 560,
 *                "order_id": "f84b790",
 *                "created_at": "2020-01-10T13:29:48.044Z",
 *                "updated_at": "2020-01-10T13:53:37.708Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e187c8b6572b00c58f4e44c",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.86138142170918,
 *                            "longitude": 66.99995201454163
 *                        },
 *                        "alias": "work",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Pratibha Chaudhray",
 *                        "email": "pratibha.chaudhary@enukesoftware.com",
 *                        "contact_number": "8796231458",
 *                        "house_no": "32B, old dlf",
 *                        "locality": "dfsd",
 *                        "landmark": "dfds",
 *                        "gps_address": "Pitchar Rd, Shiddi Village, Karachi, Karachi City, Sindh, Pakistan",
 *                        "what_3_words": "",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 3,
 *                "is_express_delivery": true,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "deliver_start_time": "2020-01-10T13:30:51.079Z",
 *                "deliver_end_time": "2020-01-10T15:30:51.080Z",
 *                "customer_id": "5e186d7c08f1d10c6f28809d",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "0080010.jpg0080010.jpg"
 *                        ],
 *                        "_id": "5e187c8b6572b00c58f4e44f",
 *                        "product_id": "5de8a00dd85c19035ebf116e",
 *                        "size": "1 Pc",
 *                        "price": 275,
 *                        "count": 1,
 *                        "name": "Ceramic Mug"
 *                    },
 *                    {
 *                        "pictures": [],
 *                        "_id": "5e187c8b6572b00c58f4e44e",
 *                        "product_id": "5df36d264648a37afa44d0f6",
 *                        "size": "20*20",
 *                        "price": 20,
 *                        "count": 5,
 *                        "name": "Test 1"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "0080011.jpg"
 *                        ],
 *                        "_id": "5e187c8b6572b00c58f4e44d",
 *                        "product_id": "5de8a015d85c19035ebf116f",
 *                        "size": "1 Pc",
 *                        "price": 100,
 *                        "count": 1,
 *                        "name": "China Mug (Size - L)"
 *                    }
 *                ],
 *                "total_amount": 475,
 *                "taxes": [],
 *                "total_amount_after_tax": 475,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 95,
 *                "store_payout_amount": 380,
 *                "order_id": "8f88c9b",
 *                "created_at": "2020-01-10T13:30:51.110Z",
 *                "updated_at": "2020-01-10T13:46:30.337Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e188323c011a50c3ad3cdbf",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 28.465801633735133,
 *                            "longitude": 77.03795285895467
 *                        },
 *                        "full_name": "Raj",
 *                        "email": "enuke.software38@gmail.com",
 *                        "contact_number": "9456315575",
 *                        "house_no": "315",
 *                        "locality": "sector 14",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "alias": "home",
 *                        "gps_address": "2A, 339/2, 2nd Floor, The Pavillion, behind Hotel Vits Mango, Anamika Enclave, Sector 14, Gurugram, Haryana 122001, India",
 *                        "landmark": "",
 *                        "what_3_words": "",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 4,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5e0e3dec954bc84f45786ff0",
 *                "deliver_start_time": "2020-01-10T14:00:00.000Z",
 *                "deliver_end_time": "2020-01-10T16:00:00.000Z",
 *                "customer_id": "5d7a2ab2d22f1e78b7671db2",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [],
 *                        "_id": "5e188323c011a50c3ad3cdc1",
 *                        "product_id": "5df36d264648a37afa44d0f6",
 *                        "size": "20*20",
 *                        "price": 20,
 *                        "count": 3,
 *                        "name": "Test 1"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "0080011.jpg"
 *                        ],
 *                        "_id": "5e188323c011a50c3ad3cdc0",
 *                        "product_id": "5de8a015d85c19035ebf116f",
 *                        "size": "1 Pc",
 *                        "price": 100,
 *                        "count": 2,
 *                        "name": "China Mug (Size - L)"
 *                    }
 *                ],
 *                "total_amount": 260,
 *                "taxes": [],
 *                "total_amount_after_tax": 260,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 52,
 *                "store_payout_amount": 208,
 *                "order_id": "6121604",
 *                "created_at": "2020-01-10T13:58:59.866Z",
 *                "updated_at": "2020-01-10T14:16:12.850Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "undelivered_description": "Ghhj",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e188354c011a50c3ad3cdc2",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 28.465801633735133,
 *                            "longitude": 77.03795285895467
 *                        },
 *                        "full_name": "Raj",
 *                        "email": "enuke.software38@gmail.com",
 *                        "contact_number": "9456315575",
 *                        "house_no": "315",
 *                        "locality": "sector 14",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "alias": "home",
 *                        "gps_address": "2A, 339/2, 2nd Floor, The Pavillion, behind Hotel Vits Mango, Anamika Enclave, Sector 14, Gurugram, Haryana 122001, India",
 *                        "landmark": "",
 *                        "what_3_words": "",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 3,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5e0e3dec954bc84f45786ff0",
 *                "deliver_start_time": "2020-01-10T14:00:00.000Z",
 *                "deliver_end_time": "2020-01-10T16:00:00.000Z",
 *                "customer_id": "5d7a2ab2d22f1e78b7671db2",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [],
 *                        "_id": "5e188354c011a50c3ad3cdc3",
 *                        "product_id": "5df36d264648a37afa44d0f6",
 *                        "size": "20*20",
 *                        "price": 20,
 *                        "count": 2,
 *                        "name": "Test 1"
 *                    }
 *                ],
 *                "total_amount": 40,
 *                "taxes": [],
 *                "total_amount_after_tax": 40,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 8,
 *                "store_payout_amount": 32,
 *                "order_id": "5b222ea",
 *                "created_at": "2020-01-10T13:59:48.704Z",
 *                "updated_at": "2020-01-10T14:15:57.276Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e1887f9c011a50c3ad3cdc4",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 28.465801633735133,
 *                            "longitude": 77.03795285895467
 *                        },
 *                        "full_name": "Raj",
 *                        "email": "enuke.software38@gmail.com",
 *                        "contact_number": "9456315575",
 *                        "house_no": "315",
 *                        "locality": "sector 14",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "alias": "home",
 *                        "gps_address": "2A, 339/2, 2nd Floor, The Pavillion, behind Hotel Vits Mango, Anamika Enclave, Sector 14, Gurugram, Haryana 122001, India",
 *                        "landmark": "",
 *                        "what_3_words": "",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5e0f8f6c954bc84f4578700d",
 *                "deliver_start_time": "2020-01-11T06:00:00.000Z",
 *                "deliver_end_time": "2020-01-11T08:00:00.000Z",
 *                "customer_id": "5d7a2ab2d22f1e78b7671db2",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [],
 *                        "_id": "5e1887f9c011a50c3ad3cdc5",
 *                        "product_id": "5df36d264648a37afa44d0f6",
 *                        "size": "20*20",
 *                        "price": 20,
 *                        "count": 4,
 *                        "name": "Test 1"
 *                    }
 *                ],
 *                "total_amount": 80,
 *                "taxes": [],
 *                "total_amount_after_tax": 80,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 16,
 *                "store_payout_amount": 64,
 *                "order_id": "d4f1a3c",
 *                "created_at": "2020-01-10T14:19:37.539Z",
 *                "updated_at": "2020-01-10T14:19:49.190Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e1c0ddfc011a50c3ad3cdf6",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 28.465801633735133,
 *                            "longitude": 77.03795285895467
 *                        },
 *                        "full_name": "Raj",
 *                        "email": "enuke.software38@gmail.com",
 *                        "contact_number": "9456315575",
 *                        "house_no": "315",
 *                        "locality": "sector 14",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "alias": "home",
 *                        "gps_address": "2A, 339/2, 2nd Floor, The Pavillion, behind Hotel Vits Mango, Anamika Enclave, Sector 14, Gurugram, Haryana 122001, India",
 *                        "landmark": "",
 *                        "what_3_words": "",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 4,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5e12326c954bc84f45787043",
 *                "deliver_start_time": "2020-01-13T08:00:00.000Z",
 *                "deliver_end_time": "2020-01-13T10:00:00.000Z",
 *                "customer_id": "5d7a2ab2d22f1e78b7671db2",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [],
 *                        "_id": "5e1c0ddfc011a50c3ad3cdf9",
 *                        "product_id": "5df36d264648a37afa44d0f6",
 *                        "size": "20*20",
 *                        "price": 20,
 *                        "count": 1,
 *                        "name": "Test 1"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "0080010.jpg0080010.jpg"
 *                        ],
 *                        "_id": "5e1c0ddfc011a50c3ad3cdf8",
 *                        "product_id": "5de8a00dd85c19035ebf116e",
 *                        "size": "1 Pc",
 *                        "price": 275,
 *                        "count": 1,
 *                        "name": "Ceramic Mug"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "0080011.jpg"
 *                        ],
 *                        "_id": "5e1c0ddfc011a50c3ad3cdf7",
 *                        "product_id": "5de8a015d85c19035ebf116f",
 *                        "size": "1 Pc",
 *                        "price": 100,
 *                        "count": 1,
 *                        "name": "China Mug (Size - L)"
 *                    }
 *                ],
 *                "total_amount": 395,
 *                "taxes": [],
 *                "total_amount_after_tax": 395,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 79,
 *                "store_payout_amount": 316,
 *                "order_id": "13188b0",
 *                "created_at": "2020-01-13T06:27:43.276Z",
 *                "updated_at": "2020-01-13T09:33:26.239Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "undelivered_description": "Location is not Correct",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5e1c39d8401e1a0c41f65dfa",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "20",
 *                        "locality": "test locality"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 28.465801633735133,
 *                            "longitude": 77.03795285895467
 *                        },
 *                        "full_name": "Raj",
 *                        "email": "enuke.software38@gmail.com",
 *                        "contact_number": "9456315575",
 *                        "house_no": "315",
 *                        "locality": "sector 14",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "alias": "home",
 *                        "gps_address": "2A, 339/2, 2nd Floor, The Pavillion, behind Hotel Vits Mango, Anamika Enclave, Sector 14, Gurugram, Haryana 122001, India",
 *                        "landmark": "",
 *                        "what_3_words": "",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 3,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5e12326c954bc84f45787044",
 *                "deliver_start_time": "2020-01-13T10:00:00.000Z",
 *                "deliver_end_time": "2020-01-13T12:00:00.000Z",
 *                "customer_id": "5d7a2ab2d22f1e78b7671db2",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "products": [
 *                    {
 *                        "pictures": [],
 *                        "_id": "5e1c39d8401e1a0c41f65dfb",
 *                        "product_id": "5df36d264648a37afa44d0f6",
 *                        "size": "20*20",
 *                        "price": 20,
 *                        "count": 2,
 *                        "name": "Test 1"
 *                    }
 *                ],
 *                "total_amount": 40,
 *                "taxes": [],
 *                "total_amount_after_tax": 40,
 *                "commission_percentage": 20,
 *                "admin_commission_amount": 8,
 *                "store_payout_amount": 32,
 *                "order_id": "88c3730",
 *                "created_at": "2020-01-13T09:35:20.404Z",
 *                "updated_at": "2020-01-13T13:47:07.553Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d778327d22f1e78b7671bd2",
 *                    "picture": "img store.jpg",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "5:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "enuke@enuke.com",
 *                        "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                        "full_name": "Enuke",
 *                        "contact_number": "9999988888"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d778327d22f1e78b7671bd3",
 *                            "coordinates": {
 *                                "latitude": 24.8607,
 *                                "longitude": 67.0011
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e469966d21fe166d8c9356f",
 *                            "shop_no": "20",
 *                            "locality": "test locality",
 *                            "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                            "unique_link": "Z1xaR9L"
 *                        }
 *                    ],
 *                    "name": "Enuke Test store",
 *                    "commission": 20,
 *                    "created_at": "2019-09-10T11:04:07.991Z",
 *                    "updated_at": "2020-03-12T11:46:00.799Z",
 *                    "__v": 0,
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f026",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f025",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5dc219f2b4181e2319f024",
 *                            "order_amount": 1000,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-23T10:17:43.395Z",
 *                    "__v": 0,
 *                    "fcm_token": "eg5DRGNSThA:APA91bGvquxW5mM8lRZdyV8x0tGQw7QSGV3wvLsoJtdnHu59ayLcW8j6MJ-KLgxLhm0JZWAw6DKCK-GoFICyndx3mzYcAHMWpeokMBR94nV3x7uFTwJ9Tu2Qi59hINrKYPUxk3DTVWKx",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDk1ODY2M30.I08IZ8YhgzDwSJ75NY4aCjFc_RVVTaZl-Z6mwsa-Hzw",
 *                    "percentageCommission": 10
 *                }
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10,
 *            "totalItems": 21
 *        }
 *  }
 *}
 *
 * @apiError 401 Unauthorized
 * @apiErrorExample
 * {
 *   "success": false,
 *   "error": 401
 * }
 *
 *
 */
router.put('/:id', OrderController.updateOrder);
router.get('/today-count', OrderController.getTodayOrdersCount);

/**
 * @api {Get} /api/store/order/today-count Get Total Orders Count
 * @apiName Get Total Orders Count
 * @apiGroup Store-Orders
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "ordersCount": 0
 *    }
 *}
 *
* @apiError Unauthorised Error 401
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */

module.exports = router;

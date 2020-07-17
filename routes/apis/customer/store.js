const express = require('express');

const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');

const StoreController = require('../../../controllers/customer/store');


router.get('/link', StoreController.getStoreDetailsFromLink);

router.get('/', StoreController.getStoreBasedOnArea);

/**
 * @api {get} /api/customer/store Get Stores
 * @apiName Get Stores
 * @apiGroup Customer-Store
 *
 * @apiParam (Query String) {String} area_id ID of area selected by user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "stores": [
 *             {
 *                 "address": {
 *                     "house_no": "21/3",
 *                     "street": "XYZ street",
 *                     "area_id": "5cd01b02c1a6f3317fd9f072",
 *                     "city_id": "5cd01c1839b32d325085052d"
 *                 },
 *                 "owner": {
 *                     "full_name": "khushal pahuja",
 *                     "contact_number": "9711669906",
 *                     "password": "$2b$10$.tTIIkskAAhZqEg20cfVx.sHXlnPB93/zVLBFldR6anWN1Qdc8MIC"
 *                 },
 *                 "picture": "ivvf81xjvz0j7eq.png",
 *                 "has_express_delivery": false,
 *                 "status": 1,
 *                 "_id": "5cd1259b63aff817c37afb02",
 *                 "email": "khushal.pahuja@enukesoftware.com",
 *                 "contact_number": "9711669906",
 *                 "name": "XYZ store",
 *                 "commission": 2,
 *                 "created_at": "2019-05-07T06:28:43.580Z",
 *                 "updated_at": "2019-05-07T06:28:43.580Z",
 *                 "__v": 0
 *             }
 *         ],
 *         "area": {
 *             "_id": "5cd01b02c1a6f3317fd9f072",
 *             "name": "sector-14",
 *             "created_at": "2019-05-06T11:31:14.865Z",
 *             "updated_at": "2019-05-06T11:31:14.865Z",
 *             "__v": 0
 *         }
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
 *     "singleStringMessage": "Area Id is a required field",
 *     "error": {
 *         "validation": {
 *             "area_id": [
 *                 "Area Id is a required field"
 *             ]
 *         }
 *     }
 * }
 */

router.get('/:id', StoreController.storeHomePage);

/**
 * @api {get} /api/customer/store/:id Get Store's Home page
 * @apiName Get Stores home page
 * @apiGroup Customer-Store
 *
 * @apiParam (params) {String} :id store id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "featured_products": [
 *             {
 *                 "price": {
 *                     "cost_price": 20,
 *                     "sale_price": 30
 *                 },
 *                 "is_featured": true,
 *                 "pictures": [
 *                     "nfufhuhsdfu",
 *                     "fihwfuisudfdgsu"
 *                 ],
 *                 "_id": "5ce3db99f558770b9cab1170",
 *                 "name": "amul milk",
 *                 "store_id": "5cd1259b63aff817c37afb02",
 *                 "category_id": "5cd55d96828e75341ca089cc",
 *                 "size": "1 litre",
 *                 "stock_quantity": 10,
 *                 "created_at": "2019-05-21T11:06:01.448Z",
 *                 "updated_at": "2019-05-21T11:06:01.448Z",
 *                 "__v": 0
 *             }
 *         ],
 *         "best_selling_products": [],
 *         "categories": [
 *             {
 *                 "status": 1,
 *                 "parent": null,
 *                 "_id": "5cd55cec828e75341ca089cb",
 *                 "name": "Dairy Products",
 *                 "store_id": "5cd1259b63aff817c37afb02",
 *                 "created_at": "2019-05-10T11:13:48.073Z",
 *                 "updated_at": "2019-05-10T11:13:48.073Z",
 *                 "__v": 0
 *             }
 *         ],
 *         "store": {
 *             "address": {
 *                 "house_no": "21/3",
 *                 "street": "XYZ street",
 *                 "area_id": "5cd01b02c1a6f3317fd9f072",
 *                 "city_id": "5cd01c1839b32d325085052d"
 *             },
 *             "owner": {
 *                 "full_name": "khushal pahuja",
 *                 "contact_number": "9711669906"
 *             },
 *             "picture": null,
 *             "status": 3,
 *             "_id": "5cd1259b63aff817c37afb02",
 *             "email": "khushal.pahuja@enukesoftware.com",
 *             "contact_number": "9711669906",
 *             "password": "$2b$10$.tTIIkskAAhZqEg20cfVx.sHXlnPB93/zVLBFldR6anWN1Qdc8MIC",
 *             "name": "XYZ store",
 *             "commission": 2,
 *             "verification_token": "1e8c0eed-6864-4492-977f-7cd49263a8b0",
 *             "created_at": "2019-05-07T06:28:43.580Z",
 *             "updated_at": "2019-05-07T06:28:43.580Z",
 *             "__v": 0
 *         }
 *     }
 * }
 *
 * @apiError Id is invalid.
 *
 * @apiErrorExample Id is invalid:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "Id is invalid",
 *     "error": {
 *         "validation": {
 *             "id": [
 *                 "Id is invalid"
 *             ]
 *         }
 *     }
 * }
 */

router.get('/:id/slots', StoreController.getStoreTimingSlots);
/**
 * @api {get} /api/customer/store/:id/slots Get Store's Slots
 * @apiName Get Stores Slots
 * @apiGroup Customer-Store
 *
 * @apiParam (params) {String} :id store id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "slots": [
 *             {
 *                 "slots": [
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5c10f38e36387d7ef103",
 *                         "start_time": "2019-05-30T12:30:00.315Z",
 *                         "end_time": "2019-05-30T14:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:16:48.123Z",
 *                         "updated_at": "2019-05-29T10:16:48.123Z",
 *                         "__v": 0
 *                     },
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5c1bf38e36387d7ef104",
 *                         "start_time": "2019-05-30T10:30:00.315Z",
 *                         "end_time": "2019-05-30T12:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:16:59.869Z",
 *                         "updated_at": "2019-05-29T10:16:59.869Z",
 *                         "__v": 0
 *                     },
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5c6ef38e36387d7ef105",
 *                         "start_time": "2019-05-30T08:30:00.315Z",
 *                         "end_time": "2019-05-30T10:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:18:22.794Z",
 *                         "updated_at": "2019-05-29T10:18:22.794Z",
 *                         "__v": 0
 *                     }
 *                 ],
 *                 "date": "2019-05-30"
 *             },
 *             {
 *                 "slots": [
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5cd3f38e36387d7ef109",
 *                         "start_time": "2019-05-31T02:30:00.315Z",
 *                         "end_time": "2019-05-31T04:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:20:03.424Z",
 *                         "updated_at": "2019-05-29T10:20:03.424Z",
 *                         "__v": 0
 *                     },
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5cdbf38e36387d7ef10a",
 *                         "start_time": "2019-05-31T04:30:00.315Z",
 *                         "end_time": "2019-05-31T06:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:20:11.548Z",
 *                         "updated_at": "2019-05-29T10:20:11.548Z",
 *                         "__v": 0
 *                     },
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5ce2f38e36387d7ef10b",
 *                         "start_time": "2019-05-31T06:30:00.315Z",
 *                         "end_time": "2019-05-31T08:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:20:18.007Z",
 *                         "updated_at": "2019-05-29T10:20:18.007Z",
 *                         "__v": 0
 *                     },
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5ceaf38e36387d7ef10c",
 *                         "start_time": "2019-05-31T08:30:00.315Z",
 *                         "end_time": "2019-05-31T10:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:20:26.090Z",
 *                         "updated_at": "2019-05-29T10:20:26.090Z",
 *                         "__v": 0
 *                     },
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5cf0f38e36387d7ef10d",
 *                         "start_time": "2019-05-31T10:30:00.315Z",
 *                         "end_time": "2019-05-31T12:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:20:32.720Z",
 *                         "updated_at": "2019-05-29T10:20:32.720Z",
 *                         "__v": 0
 *                     },
 *                     {
 *                         "status": 1,
 *                         "_id": "5cee5cf7f38e36387d7ef10e",
 *                         "start_time": "2019-05-31T12:30:00.315Z",
 *                         "end_time": "2019-05-31T14:30:00.315Z",
 *                         "store_id": "5ce513d4a2041b29b2543750",
 *                         "created_at": "2019-05-29T10:20:39.020Z",
 *                         "updated_at": "2019-05-29T10:20:39.020Z",
 *                         "__v": 0
 *                     }
 *                 ],
 *                 "date": "2019-05-31"
 *             }
 *         ]
 *     }
 * }
 *
 * @apiError Id is invalid.
 *
 * @apiErrorExample Id is invalid:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "Id is invalid",
 *     "error": {
 *         "validation": {
 *             "id": [
 *                 "Id is invalid"
 *             ]
 *         }
 *     }
 * }
 */


module.exports = router;

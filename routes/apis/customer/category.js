const express = require('express');

const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');

const CategoryController = require('../../../controllers/customer/category');

router.get('/', CategoryController.getAllStoreCategories);

/**
 * @api {get} /api/customer/category Get Categories
 * @apiName Get Categories
 * @apiGroup Customer-Category
 *
 * @apiParam (Query String) {String} store_id ID of the store to get categories of.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "categories": [
 *             {
 *                 "_id": "5cd55cec828e75341ca089cb",
 *                 "status": 1,
 *                 "parent": null,
 *                 "name": "Dairy Products",
 *                 "store_id": "5cd1259b63aff817c37afb02",
 *                 "created_at": "2019-05-10T11:13:48.073Z",
 *                 "updated_at": "2019-05-10T11:13:48.073Z",
 *                 "__v": 0,
 *                 "subcategories": [
 *                     {
 *                         "_id": "5cd55d96828e75341ca089cc",
 *                         "status": 1,
 *                         "parent": "5cd55cec828e75341ca089cb",
 *                         "name": "Milk",
 *                         "store_id": "5cd1259b63aff817c37afb02",
 *                         "created_at": "2019-05-10T11:16:38.799Z",
 *                         "updated_at": "2019-05-10T11:16:38.799Z",
 *                         "__v": 0
 *                     },
 *                     {
 *                         "_id": "5cdac8de1c9d4400003f31b6",
 *                         "status": 2,
 *                         "name": "cheese",
 *                         "store_id": "5cd1259b63aff817c37afb02",
 *                         "parent": "5cd55cec828e75341ca089cb"
 *                     }
 *                 ]
 *             }
 *         ]
 *     }
 * }
 *
 * @apiError ValidationError Store Id is invalid.
 *
 * @apiErrorExample Store Id is invalid:
 * {
 *     "success": false,
 *     "code": {
 *         "code": 422,
 *         "name": "UNPROCESSABLE_ENTITY",
 *         "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *     },
 *     "singleStringMessage": "The Store Id is a required field",
 *     "error": {
 *         "validation": {
 *             "store_id": [
 *                 "The Store Id is a required field"
 *             ]
 *         }
 *     }
 * }
 */

router.get('/:id', CategoryController.getCategoryDetails);

/**
* @api {get} /api/customer/category/:id Get Category details
* @apiName Get Category details
* @apiGroup Customer-Category
*
* @apiParam (Params) {String} id ID of the category to get subcategories of.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
* {
*     "success": true,
*     "code": 200,
*     "data": {
*         "category": {
*             "_id": "5ce533a8a9f87e3f2478103d",
*             "status": 1,
*             "parent": null,
*             "store_id": "5ce513d4a2041b29b2543750",
*             "name": "Refreshments",
*             "picture": "ivvfch0jvz5g6y6.png",
*             "created_at": "2019-05-22T11:34:00.018Z",
*             "updated_at": "2019-05-22T11:34:00.018Z",
*             "__v": 0,
*             "subcategories": [
*                 {
*                     "_id": "5ce691368c74ad496365d5b0",
*                     "status": 1,
*                     "parent": "5ce533a8a9f87e3f2478103d",
*                     "store_id": "5ce513d4a2041b29b2543750",
*                     "name": "Soft Drinks",
*                     "picture": "ivvfehvjw0mq6ve.jpg",
*                     "created_at": "2019-05-23T12:25:26.112Z",
*                     "updated_at": "2019-05-23T12:25:26.112Z",
*                     "__v": 0
*                 },
*                 {
*                     "_id": "5ce69a6ac977714e4b66f0f4",
*                     "status": 1,
*                     "parent": "5ce533a8a9f87e3f2478103d",
*                     "store_id": "5ce513d4a2041b29b2543750",
*                     "name": "Water",
*                     "picture": "ivvffgrjw0o4pcm.jpg",
*                     "created_at": "2019-05-23T13:04:42.877Z",
*                     "updated_at": "2019-05-23T13:04:42.877Z",
*                     "__v": 0
*                 }
*             ]
*         }
*     }
* }
*
*/

module.exports = router;

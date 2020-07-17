const express = require('express');

const router = express.Router();
const path = require('path').resolve;

const CategoryController = require('../../../controllers/admin/category');

const Upload = require(path('common/multer'));

router.get('/', CategoryController.getAllStoreCategories);
/**
 * @api {Get} /api/admin/category Get Store Categories
 * @apiName Get Store Categories
 * @apiGroup Admin-Category
 *
 * @apiParam (Query String) {String} store_id  store_id ID of the store to get categories of.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "code": 200,
 *   "data": {
 *       "categories": [
 *           {
 *               "_id": "5da81a395a367e70790dfa00",
 *               "status": 1,
 *              "parent": null,
 *               "store_id": "5d778327d22f1e78b7671bd2",
 *               "name": "Snacks",
 *               "picture": "breakfast and dairy.jpeg",
 *               "created_at": "2019-10-17T07:37:29.373Z",
 *               "updated_at": "2019-10-17T07:37:29.373Z",
 *               "__v": 0,
 *               "subcategories": [
 *                   {
 *                       "_id": "5da81a5d5a367e70790dfa01",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Party & Festive Needs\t",
 *                       "created_at": "2019-10-17T07:38:05.175Z",
 *                       "updated_at": "2019-10-17T07:38:05.175Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81a685a367e70790dfa02",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Ice Cream",
 *                       "created_at": "2019-10-17T07:38:16.909Z",
 *                       "updated_at": "2019-10-17T07:38:16.909Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81a785a367e70790dfa03",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Biscuits",
 *                       "created_at": "2019-10-17T07:38:32.699Z",
 *                       "updated_at": "2019-10-17T07:38:32.699Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81a835a367e70790dfa04",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Gum & Candy",
 *                       "created_at": "2019-10-17T07:38:43.216Z",
 *                       "updated_at": "2019-10-17T07:38:43.216Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81a8e5a367e70790dfa05",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Chips & Crisps",
 *                       "created_at": "2019-10-17T07:38:54.801Z",
 *                       "updated_at": "2019-10-17T07:38:54.801Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81a995a367e70790dfa06",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Nuts & Dried Fruits",
 *                       "created_at": "2019-10-17T07:39:05.220Z",
 *                       "updated_at": "2019-10-17T07:39:05.220Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81aa25a367e70790dfa07",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Deserts Mixes",
 *                       "created_at": "2019-10-17T07:39:14.233Z",
 *                       "updated_at": "2019-10-17T07:39:14.233Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81aaf5a367e70790dfa08",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Cakes",
 *                       "created_at": "2019-10-17T07:39:27.035Z",
 *                       "updated_at": "2019-10-17T07:39:27.035Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81ab75a367e70790dfa09",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Namkeen",
 *                       "created_at": "2019-10-17T07:39:35.665Z",
 *                       "updated_at": "2019-10-17T07:39:35.665Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81ac15a367e70790dfa0a",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Noodle & Soup",
 *                       "created_at": "2019-10-17T07:39:45.561Z",
 *                       "updated_at": "2019-10-17T07:39:45.561Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5da81ace5a367e70790dfa0b",
 *                       "status": 1,
 *                       "parent": "5da81a395a367e70790dfa00",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Pasta & Vermicelli",
 *                       "created_at": "2019-10-17T07:39:58.635Z",
 *                       "updated_at": "2019-10-17T07:39:58.635Z",
 *                       "__v": 0
 *                   }
 *               ]
 *           },
 *           {
 *               "_id": "5d77839bd22f1e78b7671bf7",
 *               "status": 1,
 *               "parent": null,
 *               "store_id": "5d778327d22f1e78b7671bd2",
 *               "name": "test Category 1",
 *               "picture": "banana shake.jpg",
 *               "created_at": "2019-09-10T11:06:03.670Z",
 *               "updated_at": "2020-01-14T09:54:11.905Z",
 *               "__v": 0,
 *               "subcategories": [
 *                   {
 *                       "_id": "5e1d8b56401e1a0c41f65e15",
 *                       "status": 1,
 *                       "parent": "5d77839bd22f1e78b7671bf7",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "Ice cream",
 *                       "created_at": "2020-01-14T09:35:18.169Z",
 *                       "updated_at": "2020-01-14T09:35:18.169Z",
 *                       "__v": 0
 *                   }
 *               ]
 *           },
 *           {
 *               "_id": "5d7783d2d22f1e78b7671bf8",
 *               "status": 1,
 *               "parent": null,
 *               "store_id": "5d778327d22f1e78b7671bd2",
 *               "name": "test category 2",
 *               "picture": "category1.png",
 *               "created_at": "2019-09-10T11:06:58.799Z",
 *               "updated_at": "2019-09-10T11:06:58.799Z",
 *               "__v": 0,
 *               "subcategories": [
 *                   {
 *                       "_id": "5d9c49e9d22f1e78b76728b8",
 *                       "status": 1,
 *                       "parent": "5d7783d2d22f1e78b7671bf8",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "SubCategory0006",
 *                       "created_at": "2019-10-08T08:33:45.315Z",
 *                       "updated_at": "2019-10-08T08:33:45.315Z",
 *                       "__v": 0
 *                   },
 *                   {
 *                       "_id": "5d9c49f5d22f1e78b76728b9",
 *                       "status": 1,
 *                       "parent": "5d7783d2d22f1e78b7671bf8",
 *                       "store_id": "5d778327d22f1e78b7671bd2",
 *                       "name": "SubCategory0007",
 *                       "created_at": "2019-10-08T08:33:57.987Z",
 *                       "updated_at": "2019-10-08T08:33:57.987Z",
 *                       "__v": 0
 *                   }
 *               ]
 *           },
 *           {
 *               "_id": "5dbc8e53d01b806bfe171457",
 *               "status": 1,
 *               "parent": null,
 *               "store_id": "5d778327d22f1e78b7671bd2",
 *               "name": "test category 3",
 *               "picture": "imagenotavailable.png",
 *               "created_at": "2019-11-01T19:58:11.790Z",
 *               "updated_at": "2019-11-01T19:58:11.790Z",
 *               "__v": 0,
 *               "subcategories": []
 *           }
 *       ],
 *       "paginationVariables": {
 *           "pageNo": 1,
 *           "perPage": 10,
 *           "totalItems": 4
 *       }
 *   }
*}
@apiError ValidationError Id is invalid.
* @apiErrorExample Id is invalid.
*{
*    "success": false,
*    "code": {
*        "code": 422,
*        "name": "UNPROCESSABLE_ENTITY",
*        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
*    },
*    "singleStringMessage": "Id is invalid",
*    "error": {
*        "validation": {
*            "store_id": [
*                "Id is invalid"
*            ]
*        }
*    }
*}
 */
router.get('/categories', CategoryController.getAllStoreCategoriesForCategoryManagement); // for super-admin category management
/**
 * @api {get} /api/admin/category/categories Get Store Categories for Super Admin Management
 * @apiName Get Store Categories  for Super Admin
 * @apiGroup Admin-Category
 *
 * @apiParam (Query String) {String} store_id Unique Id of Store
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "categories": [
 *            {
 *                "_id": "5d77839bd22f1e78b7671bf7",
 *                "status": 1,
 *                "parent": null,
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "name": "test Category 1",
 *                "picture": "banana shake.jpg",
 *                "created_at": "2019-09-10T11:06:03.670Z",
 *                "updated_at": "2020-01-14T09:54:11.905Z",
 *                "__v": 0,
 *                "subcategories": [
 *                    {
 *                        "_id": "5e1d8b56401e1a0c41f65e15",
 *                        "status": 1,
 *                        "parent": "5d77839bd22f1e78b7671bf7",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Ice cream",
 *                        "created_at": "2020-01-14T09:35:18.169Z",
 *                        "updated_at": "2020-01-14T09:35:18.169Z",
 *                        "__v": 0
 *                    }
 *                ]
 *            },
 *            {
 *                "_id": "5d7783d2d22f1e78b7671bf8",
 *                "status": 1,
 *                "parent": null,
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "name": "test category 2",
 *                "picture": "category1.png",
 *                "created_at": "2019-09-10T11:06:58.799Z",
 *                "updated_at": "2019-09-10T11:06:58.799Z",
 *                "__v": 0,
 *                "subcategories": [
 *                    {
 *                        "_id": "5d9c49e9d22f1e78b76728b8",
 *                        "status": 1,
 *                        "parent": "5d7783d2d22f1e78b7671bf8",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "SubCategory0006",
 *                        "created_at": "2019-10-08T08:33:45.315Z",
 *                        "updated_at": "2019-10-08T08:33:45.315Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5d9c49f5d22f1e78b76728b9",
 *                        "status": 1,
 *                        "parent": "5d7783d2d22f1e78b7671bf8",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "SubCategory0007",
 *                        "created_at": "2019-10-08T08:33:57.987Z",
 *                        "updated_at": "2019-10-08T08:33:57.987Z",
 *                        "__v": 0
 *                    }
 *                ]
 *            },
 *            {
 *                "_id": "5da81a395a367e70790dfa00",
 *                "status": 1,
 *                "parent": null,
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "name": "Snacks",
 *                "picture": "breakfast and dairy.jpeg",
 *                "created_at": "2019-10-17T07:37:29.373Z",
 *                "updated_at": "2019-10-17T07:37:29.373Z",
 *                "__v": 0,
 *                "subcategories": [
 *                    {
 *                        "_id": "5da81a5d5a367e70790dfa01",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Party & Festive Needs\t",
 *                        "created_at": "2019-10-17T07:38:05.175Z",
 *                        "updated_at": "2019-10-17T07:38:05.175Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81a685a367e70790dfa02",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Ice Cream",
 *                        "created_at": "2019-10-17T07:38:16.909Z",
 *                        "updated_at": "2019-10-17T07:38:16.909Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81a785a367e70790dfa03",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Biscuits",
 *                        "created_at": "2019-10-17T07:38:32.699Z",
 *                        "updated_at": "2019-10-17T07:38:32.699Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81a835a367e70790dfa04",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Gum & Candy",
 *                        "created_at": "2019-10-17T07:38:43.216Z",
 *                        "updated_at": "2019-10-17T07:38:43.216Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81a8e5a367e70790dfa05",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Chips & Crisps",
 *                        "created_at": "2019-10-17T07:38:54.801Z",
 *                        "updated_at": "2019-10-17T07:38:54.801Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81a995a367e70790dfa06",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Nuts & Dried Fruits",
 *                        "created_at": "2019-10-17T07:39:05.220Z",
 *                        "updated_at": "2019-10-17T07:39:05.220Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81aa25a367e70790dfa07",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Deserts Mixes",
 *                        "created_at": "2019-10-17T07:39:14.233Z",
 *                        "updated_at": "2019-10-17T07:39:14.233Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81aaf5a367e70790dfa08",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Cakes",
 *                        "created_at": "2019-10-17T07:39:27.035Z",
 *                        "updated_at": "2019-10-17T07:39:27.035Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81ab75a367e70790dfa09",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Namkeen",
 *                        "created_at": "2019-10-17T07:39:35.665Z",
 *                        "updated_at": "2019-10-17T07:39:35.665Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81ac15a367e70790dfa0a",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Noodle & Soup",
 *                        "created_at": "2019-10-17T07:39:45.561Z",
 *                        "updated_at": "2019-10-17T07:39:45.561Z",
 *                        "__v": 0
 *                    },
 *                    {
 *                        "_id": "5da81ace5a367e70790dfa0b",
 *                        "status": 1,
 *                        "parent": "5da81a395a367e70790dfa00",
 *                        "store_id": "5d778327d22f1e78b7671bd2",
 *                        "name": "Pasta & Vermicelli",
 *                        "created_at": "2019-10-17T07:39:58.635Z",
 *                        "updated_at": "2019-10-17T07:39:58.635Z",
 *                        "__v": 0
 *                    }
 *                ]
 *            },
 *            {
 *                "_id": "5dbc8e53d01b806bfe171457",
 *                "status": 1,
 *                "parent": null,
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "name": "test category 3",
 *                "picture": "imagenotavailable.png",
 *                "created_at": "2019-11-01T19:58:11.790Z",
 *                "updated_at": "2019-11-01T19:58:11.790Z",
 *                "__v": 0,
 *                "subcategories": []
 *            }
 *        ]
 *    }
 *}
 * @apiError UNPROCESSABLE_ENTITY Id is invalid
 *  @apiErrorExample Id is invalid
 *
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
 *            "store_id": [
 *                "Id is invalid"
 *            ]
 *        }
 *    }
 *}
 */
router.get('/:id', CategoryController.getCategoryDetails);
/**
 * @api {get} /api/admin/category/:id  Get Category Details
 * @apiName Get Category Details
 * @apiGroup Admin-Category
 *
 * @apiParam (Params) id Unique Id of the Category.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "category": {
 *            "_id": "5da81a395a367e70790dfa00",
 *            "name": "Snacks",
 *            "status": 1,
 *            "subcategories": [
 *                {
 *                    "_id": "5da81a785a367e70790dfa03",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Biscuits",
 *                    "created_at": "2019-10-17T07:38:32.699Z",
 *                    "updated_at": "2019-10-17T07:38:32.699Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81aaf5a367e70790dfa08",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Cakes",
 *                    "created_at": "2019-10-17T07:39:27.035Z",
 *                    "updated_at": "2019-10-17T07:39:27.035Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81a8e5a367e70790dfa05",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Chips & Crisps",
 *                    "created_at": "2019-10-17T07:38:54.801Z",
 *                    "updated_at": "2019-10-17T07:38:54.801Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81aa25a367e70790dfa07",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Deserts Mixes",
 *                    "created_at": "2019-10-17T07:39:14.233Z",
 *                    "updated_at": "2019-10-17T07:39:14.233Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81a835a367e70790dfa04",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Gum & Candy",
 *                    "created_at": "2019-10-17T07:38:43.216Z",
 *                    "updated_at": "2019-10-17T07:38:43.216Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81a685a367e70790dfa02",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Ice Cream",
 *                    "created_at": "2019-10-17T07:38:16.909Z",
 *                    "updated_at": "2019-10-17T07:38:16.909Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81ab75a367e70790dfa09",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Namkeen",
 *                    "created_at": "2019-10-17T07:39:35.665Z",
 *                    "updated_at": "2019-10-17T07:39:35.665Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81ac15a367e70790dfa0a",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Noodle & Soup",
 *                    "created_at": "2019-10-17T07:39:45.561Z",
 *                    "updated_at": "2019-10-17T07:39:45.561Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81a995a367e70790dfa06",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Nuts & Dried Fruits",
 *                    "created_at": "2019-10-17T07:39:05.220Z",
 *                    "updated_at": "2019-10-17T07:39:05.220Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81a5d5a367e70790dfa01",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Party & Festive Needs\t",
 *                    "created_at": "2019-10-17T07:38:05.175Z",
 *                    "updated_at": "2019-10-17T07:38:05.175Z",
 *                    "__v": 0
 *                },
 *                {
 *                    "_id": "5da81ace5a367e70790dfa0b",
 *                    "status": 1,
 *                    "parent": "5da81a395a367e70790dfa00",
 *                    "store_id": "5d778327d22f1e78b7671bd2",
 *                    "name": "Pasta & Vermicelli",
 *                    "created_at": "2019-10-17T07:39:58.635Z",
 *                    "updated_at": "2019-10-17T07:39:58.635Z",
 *                    "__v": 0
 *                }
 *            ]
 *        },
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10,
 *            "totalItems": 1
 *        }
 *    }
 *}
 *
 * @apiError UNPROCESSABLE_ENTITY Id is invalid.
 * @apiErrorExample Id is invalid
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
 *            "category_id": [
 *                "Id is invalid"
 *            ]
 *        }
 *    }
 *}
 * */
router.post('/', Upload.any(), CategoryController.addCategory);
/**
 * @api {Post} /api/admin/category Add Category
 * @apiName Add Category
 * @apiGroup Admin-Category
 *
 * @apiParam (Body) {String} name Name of the Category.
 * @apiParam {String} store_id ID of the Store.
 * @apiParam {String} status status of the Category
 * @apiParam {[File]} Pictures Array of pictures of products.
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "status": 1,
 *        "parent": null,
 *        "_id": "5e71cc28b63595371e4f622c",
 *        "name": "Test Category",
 *        "store_id": "5d778327d22f1e78b7671bd2",
 *        "picture":"Screenshot_2020-02-04 Shuffle  A Number For Every Occasion\".png",
 *        "created_at": "2020-03-18T07:22:16.950Z",
 *        "updated_at": "2020-03-18T07:22:16.950Z",
 *        "__v": 0
 *    }
 *}
 *
 * @apiError Validation Error Image is required.
 *
 * @apiErrorExample Image is Required
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Category Picture is a required field",
 *    "error": {
 *        "validation": {
 *            "picture": [
 *                "Category Picture is a required field"
 *            ]
 *        }
 *    }
 *}
 */

router.put('/:id', Upload.any(), CategoryController.updateCategory);
/**
 * @api {put} /api/admin/category:id Update Category
 * @apiName Update Category
 * @apiGroup Admin-Category
 *
 * @apiParam (Body) {String} name Name of the Category.
 * @apiParam {String} status Status of the Category.
 * @apiParam {String} store_id Id of the Store.
 * @apiParam {[File]} picture Array of pictures of products.
 *
 *
 * @apiSuccessExample Success Response :
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "category": {
 *            "status": 1,
 *            "parent": null,
 *            "_id": "5d89bdead22f1e78b7672593",
 *            "store_id": "5d7607c59b5f0f76ee4f68b0",
 *            "name": "Test Category2",
 *            "picture":"Screenshot_2020-02-04 Shuffle  A Number For Every Occasion\".png",
 *            "created_at": "2019-09-24T06:55:38.852Z",
 *            "updated_at": "2020-03-18T10:14:50.073Z",
 *            "__v": 0
 *        }
 *    }
 *}
 *
 * @apiError Validation Error Status is required
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Status is a required field",
 *    "error": {
 *        "validation": {
 *            "owner_details": [
 *                "Status is a required field"
 *            ]
 *        }
 *    }
 *}
 */
router.delete('/:id', CategoryController.deleteCategory);
/**
 * @api {delete} /api/admin/category/:id Delete Category
 * @apiName Delete Category
 * @apiGroup Admin-Category
 *
 * @apiParam (Params) id Unique Id of the Category.
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "data": {
 *            "n": 1,
 *            "opTime": {
 *                "ts": "6805491365456117761",
 *                "t": 64
 *            },
 *            "electionId": "7fffffff0000000000000040",
 *            "ok": 1,
 *            "$clusterTime": {
 *                "clusterTime": "6805491365456117761",
 *                "signature": {
 *                    "hash": "FSnfUeSrSjhDrrvHgyrh/xrleCI=",
 *                    "keyId": "6753601258507993089"
 *                }
 *            },
 *            "operationTime": "6805491365456117761",
 *            "deletedCount": 1
 *        }
 *    }
 *}
 *
 *
 *
 * @apiError UNPROCESSABLE_ENTITY Id is invalid
 *
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
 *            "category_id": [
 *                "Id is invalid"
 *            ]
 *        }
 *    }
 *}
 */

module.exports = router;

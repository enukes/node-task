const express = require('express');

const router = express.Router();
const path = require('path').resolve;

const Upload = require(path('common/multer'));
const ProductController = require('../../../controllers/admin/product');

router.get('/', ProductController.getProducts);
/**
 * @api {Get} /api/store/product Get Products
 * @apiName Get Products
 * @apiGroup Admin-Products
 *
 * @apiParam (Query String) {String} pageNo Current Page Number
 * @apiParam (Query String) {String} perPage Items to be displayed in per page.
 * @apiParam (Query String) {String} search Product to be searched
 * @apiParam (Query String) {String} category_id Unique category Id whose products has to be displayed.
 * @apiParam (Query String) {String} subcategory_id Unique Sub category Id whose products has to be displayed.
 * @apiParam (Query String) {String} name Sort Field
 * @apiParam (Query String) {String} sortType Sort Type
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "subcategories": [
 *            {
 *                "price": {
 *                    "cost_price": 34,
 *                    "sale_price": 25
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "Sample_Image_1.jpeg"
 *                ],
 *                "status": 1,
 *                "order_max": 50,
 *                "tags": [
 *                    "ice-cream",
 *                    "chocolate"
 *                ],
 *                "_id": "5e1d8ba9c011a50c3ad3ce0f",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "name": "Quality wall",
 *                "category_id": "5e1d8b56401e1a0c41f65e15",
 *                "size": "200 gm",
 *                "sku_id": "654464",
 *                "stock_quantity": 497,
 *                "created_at": "2020-01-14T09:36:41.253Z",
 *                "updated_at": "2020-02-21T04:32:52.200Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 55,
 *                    "sale_price": 40
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "Sample_Image_1.jpeg"
 *                ],
 *                "status": 1,
 *                "order_max": 100,
 *                "tags": [
 *                    "ice-cream",
 *                    "chocolate"
 *                ],
 *                "_id": "5e1d912908f1d10c6f2880f1",
 *                "name": "Choco Crunch",
 *                "category_id": "5e1d8b56401e1a0c41f65e15",
 *                "size": "250 gm",
 *                "stock_quantity": 1000,
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "created_at": "2020-01-14T10:00:09.661Z",
 *                "updated_at": "2020-02-04T07:22:54.318Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 50,
 *                    "sale_price": 40
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "ice-cream",
 *                    "chocolate"
 *                ],
 *                "_id": "5e1d92a6c011a50c3ad3ce10",
 *                "name": "Cofo Icecream",
 *                "category_id": "5e1d8b56401e1a0c41f65e15",
 *                "size": "200 gm",
 *                "stock_quantity": 120,
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "created_at": "2020-01-14T10:06:30.818Z",
 *                "updated_at": "2020-01-14T10:06:30.818Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 10,
 *                    "sale_price": 2
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [],
 *                "status": 1,
 *                "order_max": 1000,
 *                "tags": [
 *                    "Test"
 *                ],
 *                "_id": "5e7474eb3c03f83f3eadb04d",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "name": "Test Product",
 *                "category_id": "5e1d8b56401e1a0c41f65e15",
 *                "size": "21",
 *                "sku_id": "",
 *                "stock_quantity": 100,
 *                "created_at": "2020-03-20T07:46:51.302Z",
 *                "updated_at": "2020-03-20T07:46:51.302Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 10,
 *                    "sale_price": 2
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [],
 *                "status": 1,
 *                "order_max": 1000,
 *                "tags": [
 *                    "Test"
 *                ],
 *                "_id": "5e747756a050c140c524d742",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "name": "Test Product2",
 *                "category_id": "5e1d8b56401e1a0c41f65e15",
 *                "size": "21",
 *                "sku_id": " ",
 *                "stock_quantity": 100,
 *                "created_at": "2020-03-20T07:57:10.544Z",
 *                "updated_at": "2020-03-20T09:25:02.945Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 10,
 *                    "sale_price": 2
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [],
 *                "status": 1,
 *                "order_max": 1000,
 *                "tags": [
 *                    "Test"
 *                ],
 *                "_id": "5e748a57981bfc50754e11af",
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "name": "Test Product",
 *                "category_id": "5e1d8b56401e1a0c41f65e15",
 *                "size": "21",
 *                "sku_id": " 1",
 *                "stock_quantity": 100,
 *                "created_at": "2020-03-20T09:18:15.382Z",
 *                "updated_at": "2020-03-20T09:18:15.382Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 11,
 *                    "sale_price": 11
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "Screenshot from 2020-02-18 12-08-17.png"
 *                ],
 *                "status": 1,
 *                "order_max": 1000,
 *                "tags": [],
 *                "_id": "5e789b520fa8d64c6db91a3f",
 *                "name": "Home",
 *                "category_id": "5e1d8b56401e1a0c41f65e15",
 *                "size": "111",
 *                "stock_quantity": 11,
 *                "store_id": "5d778327d22f1e78b7671bd2",
 *                "created_at": "2020-03-23T11:19:46.359Z",
 *                "updated_at": "2020-03-23T11:19:46.359Z",
 *                "__v": 0
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10,
 *            "totalItems": 7
 *        }
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
router.post('/', Upload.array('pictures[]'), ProductController.addProduct);
/**
 * @api {Post} /api/store/product Add a Product
 * @apiName Add a Product
 * @apiGroup Admin-Products
 *
 * @apiParam (Params) {String} name Name of the Product
 * @apiParam (Params) {String}  store_id Unique Id of the Store
 * @apiParam (Params) {String} category_id Unique Id of the Category
 * @apiParam (Params) {String} size: Size of the Product
*  @apiParam (Params) {String} stock_quantity Stock Quantity of the Product
*  @apiParam (Params) {Object} price A Object with fields "cost_price" (Cost Price of the Product),  "sale_price" (Sale Price of the Product )
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "is_featured": false,
 *        "is_best_selling": false,
 *        "pictures": [],
 *        "status": 1,
 *        "order_max": 20,
 *        "tags": [],
 *        "_id": "5e78a19435051f4c7499f045",
 *        "name": "Bru Coffee",
 *        "store_id": "5d778327d22f1e78b7671bd2",
 *        "category_id": "5ce53626a9f87e3f24781040",
 *        "size": "250 g",
 *        "stock_quantity": 20,
 *        "price": {
 *            "cost_price": 20,
 *            "sale_price": 30
 *        },
 *        "created_at": "2020-03-23T11:46:28.017Z",
 *        "updated_at": "2020-03-23T11:46:28.017Z",
 *        "__v": 0
 *    }
 *}
 *
 * @apiError 500 Internal Server Error Name is a required field
 * @apiErrorExample Name is a required field
 * {
 *    "success": false,
 *    "singleStringMessage": "Product validation failed: name: Name is a required field.",
 *    "error": {
 *        "errors": {
 *            "name": {
 *                "message": "Name is a required field.",
 *                "name": "ValidatorError",
 *                "properties": {
 *                    "message": "Name is a required field.",
 *                    "type": "required",
 *                    "path": "name"
 *                },
 *                "kind": "required",
 *                "path": "name"
 *            }
 *        },
 *        "_message": "Product validation failed",
 *        "message": "Product validation failed: name: Name is a required field.",
 *        "name": "ValidationError"
 *    }
 *}
 *


 */
router.put('/:id', Upload.array('pictures[]'), ProductController.updateProduct);
/**
 * @api {Put} /api/store/product/:id Edit a Product
 * @apiName Edit a Product
 * @apiGroup Admin-Products
 *
 * @apiParam (Params) {String} name Name of the Product
 * @apiParam (Params) {Optional} {Boolean} is_featured Is Product Featured
 * @apiParam (Params) {Optional} {Boolean} is_best_selling Is Product Best Selling
 * @apiParam (Params) {Optional} {Array} pictures Array of pictures
 * @apiParam (Params) {Number} status Status of Product
 * @apiParam (Params) {Optional} {Number} order_max Maximum Orders to be placed
 * @apiParam (Params) {Optional} {Array} tags Tags of the product
 * @apiParam (Params) {String} _id Unique id of the Product
 * @apiParam (Params) {String} store_id Unique Id of the Store
 * @apiParam (Params) {String} category_id Unique Id of the Category
 * @apiParam (Params) (Optional) {String} sku_id Unique SKU Id
*  @apiParam (Params) {String} stock_quantity Stock Quantity of the Product
*  @apiParam (Params) {Object} price A Object with fields "cost_price" (Cost Price of the Product),  "sale_price" (Sale Price of the Product )
*
*
* @apiSuccessExample Success-Response
* Htp/1.1 20 OK
* {
*     "success": true,
*     "code": 200,
*     "data": {
*         "product": {
*             "price": {
*                 "cost_price": 10,
*                 "sale_price": 2
*             },
*             "is_featured": false,
*             "is_best_selling": false,
*             "pictures": [],
*             "status": 1,
*             "order_max": 1000,
*             "tags": [
*                 "Test"
*             ],
*             "_id": "5e748a57981bfc50754e11af",
*             "store_id": "5d778327d22f1e78b7671bd2",
*             "name": "Test Product",
*             "category_id": "5e1d8b56401e1a0c41f65e15",
*             "size": "210",
*             "sku_id": "1",
*             "stock_quantity": 100,
*             "created_at": "2020-03-20T09:18:15.382Z",
*             "updated_at": "2020-03-23T13:05:42.001Z",
*             "__v": 0
*         }
*     }
* }
 * @apiError 500 Internal Server Error Name is a required field
 * @apiErrorExample Name is a required field
 * {
 *    "success": false,
 *    "singleStringMessage": "Product validation failed: name: Name is a required field.",
 *    "error": {
 *        "errors": {
 *            "name": {
 *                "message": "Name is a required field.",
 *                "name": "ValidatorError",
 *                "properties": {
 *                    "message": "Name is a required field.",
 *                    "type": "required",
 *                    "path": "name"
 *                },
 *                "kind": "required",
 *                "path": "name"
 *            }
 *        },
 *        "_message": "Product validation failed",
 *        "message": "Product validation failed: name: Name is a required field.",
 *        "name": "ValidationError"
 *    }
 *}
*
*
 */
router.delete('/:id', ProductController.deleteProduct);
/**
 * @api {Delete} /api/admin/product/:id Delete Product
 * @apiName Delete a Product
 * @apiGroup Admin-Products
 *
 * @apiParam (Params) {String} id Unique id of the Product
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "product": {
 *            "n": 1,
 *            "opTime": {
 *                "ts": "6807431238974963713",
 *                "t": 68
 *            },
 *            "electionId": "7fffffff0000000000000044",
 *            "ok": 1,
 *            "$clusterTime": {
 *                "clusterTime": "6807431238974963713",
 *                "signature": {
 *                    "hash": "trxQw4NmdEOed/BWttQO21sxN8k=",
 *                    "keyId": "6753601258507993089"
 *                }
 *            },
 *            "operationTime": "6807431238974963713",
 *            "deletedCount": 1
 *        }
 *    }
 *}
 *
 * @apiError 422 UNPROCESSABLE_ENTITY
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
 *            "product_id": [
 *                "Id is invalid"
 *            ]
 *        }
 *    }
 *}

 */

module.exports = router;

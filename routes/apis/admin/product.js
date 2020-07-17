const router = require('express').Router();
const ProductController = require('../../../controllers/admin/product');
const Upload = require('../../../common/multer');

router.get('/', ProductController.getProducts);
/**
 * @api {Get} /api/admin/report/payment Get Products Report.
 * @apiName Get Products Report
 * @apiGroup Admin-Products
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Store Report to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 * @apiParam (Query Params) {String}  store_id Unique Id of the Store.
 * @apiParam (Query Params) {String}  category_id Unique Id of the Category.
 * @apiParam (Query Params) {String}  subcategory_id Unique Id of the Sub Category.
 * @apiParam (Query Params) {String}  subcategory_id Unique Id of the Sub Category.
 * @apiParam (Query Params) {String}  name Field to be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 20 OK
 *
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "subcategories": [
 *            {
 *                "price": {
 *                    "cost_price": 600,
 *                    "sale_price": 70
 *                },
 *                "is_featured": true,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "djcbsdbfuisdgfhs.jpeg"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "Apple Gourd Round",
 *                    "Gol",
 *                    "Sabzi",
 *                    "Tinday"
 *                ],
 *                "_id": "5d7616f29b5f0f76ee4f68f9",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Apple Gourd Round (Tinday)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "1 Kg",
 *                "stock_quantity": 27,
 *                "created_at": "2019-09-09T09:10:10.221Z",
 *                "updated_at": "2020-03-19T12:27:27.934Z",
 *                "__v": 0,
 *                "sku_id": "Test_SKU"
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 47.6,
 *                    "sale_price": 47.5
 *                },
 *                "is_featured": false,
 *                "is_best_selling": true,
 *                "pictures": [
 *                    "anlkvhnhqk0c6vrjq.jpeg"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "Beetroot",
 *                    "Chukandar",
 *                    "Sabzi",
 *                    "Organic Food"
 *                ],
 *                "_id": "5d7617d39b5f0f76ee4f68fa",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Beetroot (Chukandar)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "500 gm",
 *                "stock_quantity": 14,
 *                "created_at": "2019-09-09T09:13:55.771Z",
 *                "updated_at": "2020-03-19T06:03:13.244Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 185,
 *                    "sale_price": 185
 *                },
 *                "is_featured": true,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "anlkvhnhqk0c72w0x.jpeg"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "Broccoli",
 *                    "Sabz Gobi",
 *                    "Sabzi",
 *                    "Organic Food",
 *                    "Gobi"
 *                ],
 *                "_id": "5d7619209b5f0f76ee4f68fb",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Broccoli (Sabz Gobi)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "250 gm",
 *                "stock_quantity": 1,
 *                "created_at": "2019-09-09T09:19:28.167Z",
 *                "updated_at": "2020-03-19T12:27:27.998Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 35,
 *                    "sale_price": 35
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "anlkvhnhqk0c7aa0v.gif"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "capsium",
 *                    "shimla mirch",
 *                    "Sabzi",
 *                    "organic food",
 *                    "mirch"
 *                ],
 *                "_id": "5d761a789b5f0f76ee4f68fc",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Capsium (Shimla Mirch)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "250 gm",
 *                "stock_quantity": 25,
 *                "created_at": "2019-09-09T09:25:12.901Z",
 *                "updated_at": "2019-09-09T09:25:12.901Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 98,
 *                    "sale_price": 98
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "anlkvhnhqk0c7ouvw.jpeg"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "garlic",
 *                    "peeled",
 *                    "Sabzi",
 *                    "organic food",
 *                    "chila hua lehsan"
 *                ],
 *                "_id": "5d761d219b5f0f76ee4f68fd",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Garlic Peeled (Chila Hua Lehsan)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "250 gm",
 *                "stock_quantity": 25,
 *                "created_at": "2019-09-09T09:36:33.121Z",
 *                "updated_at": "2019-09-09T09:36:33.121Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 31.5,
 *                    "sale_price": 31.5
 *                },
 *                "is_featured": false,
 *                "is_best_selling": true,
 *                "pictures": [
 *                    "anlkvhnhqk0c86qgu.jpeg"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "lemon",
 *                    "limoo",
 *                    "Sabzi",
 *                    "Organic Food"
 *                ],
 *                "_id": "5d761f159b5f0f76ee4f68fe",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Lemon (Limoo)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "250 gm",
 *                "stock_quantity": 19,
 *                "created_at": "2019-09-09T09:44:53.327Z",
 *                "updated_at": "2020-03-19T06:03:13.328Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 56,
 *                    "sale_price": 56
 *                },
 *                "is_featured": false,
 *                "is_best_selling": true,
 *                "pictures": [
 *                    "anlkvhnhqk0c8towy.jpeg"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "Lettuce",
 *                    "Salad Patta",
 *                    "Sabzi",
 *                    "Organic Food",
 *                    "Aapkidokan Products"
 *                ],
 *                "_id": "5d7624929b5f0f76ee4f68ff",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Lettuce (Salad Patta)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "250 gm",
 *                "stock_quantity": 21,
 *                "created_at": "2019-09-09T10:08:18.280Z",
 *                "updated_at": "2020-03-19T06:03:13.416Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 90,
 *                    "sale_price": 90
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "anlkvhnhqk0c9l7fm.gif"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "Raw Papaya",
 *                    "Kacha Papita",
 *                    "Sabzi",
 *                    "Organic Food"
 *                ],
 *                "_id": "5d7629959b5f0f76ee4f6900",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Raw Papaya (Kacha Papita)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "1 Kg",
 *                "stock_quantity": 25,
 *                "created_at": "2019-09-09T10:29:41.992Z",
 *                "updated_at": "2019-09-09T10:29:41.992Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 105,
 *                    "sale_price": 95
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "anlkvhnhqk0cavgz3.jpg"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "Turnip",
 *                    "Shalgham",
 *                    "Sabzi",
 *                    "Organic Food",
 *                    "root"
 *                ],
 *                "_id": "5d7632049b5f0f76ee4f6903",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Turnip (Shalgham)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "1 Kg",
 *                "stock_quantity": 25,
 *                "created_at": "2019-09-09T11:05:40.534Z",
 *                "updated_at": "2019-09-09T11:05:40.534Z",
 *                "__v": 0
 *            },
 *            {
 *                "price": {
 *                    "cost_price": 22.5,
 *                    "sale_price": 22.5
 *                },
 *                "is_featured": false,
 *                "is_best_selling": false,
 *                "pictures": [
 *                    "anlkvhnhqk0cb57tr.gif"
 *                ],
 *                "status": 1,
 *                "order_max": 5,
 *                "tags": [
 *                    "vegetable",
 *                    "Bitter Gourd",
 *                    "Karela",
 *                    "Sabzi",
 *                    "Organic Food"
 *                ],
 *                "_id": "5d7633cb9b5f0f76ee4f6905",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": " Bitter Gourd (Karela)",
 *                "category_id": "5d76091f9b5f0f76ee4f68df",
 *                "size": "250 gm",
 *                "stock_quantity": 25,
 *                "created_at": "2019-09-09T11:13:15.239Z",
 *                "updated_at": "2019-09-09T11:13:15.239Z",
 *                "__v": 0
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10,
 *            "totalItems": 47
 *        }
 *    }
 *}
 *
* @apiError ValidationError 401
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */
router.post('/', Upload.array('pictures[]'), ProductController.addProduct);
/**
 *@api {Post} /api/admin/product Add a Product
 *@apiName Add a Product
*  @apiGroup Admin-Products
*
*  @apiParam (Body) {String} store_id: Unique Id of the Store
* @apiParam (Body) {String} name: Name of the Product
* @apiParam (Body) {String} category_id: Category Id of the Product
* @apiParam (Body) {Array} pictures
* @apiParam (Body) {Object} price:  A Object with fields "cost_price" (Cost Price of the Product) and "sale_price" (Sale Price of the Product)
* @apiParam (Body) {String} size Size of the Product
* @apiParam (Body) {Number} status: Status of the product
* @apiParam (Body) {Number} sku_id: SkuId (If any)
* @apiParam (Body) {Number} stock_quantity: Stock Quantity
* @apiParam (Body) {String} tags: Tags
* @apiParam (Body) {String} order_max Maximum Orders that can be placed
*
* @apiSuccessExample Success-Response
* HTTP/1.1 20 OK
 * {
 *     "success": true,
 *     "code": 200,
 *     "data": {
 *         "is_featured": false,
 *         "is_best_selling": false,
 *         "pictures": [],
 *         "status": 1,
 *         "order_max": 1000,
 *         "tags": [
 *             "Test"
 *         ],
 *         "_id": "5e747756a050c140c524d742",
 *         "store_id": "5d778327d22f1e78b7671bd2",
 *         "name": "Test Product",
 *         "category_id": "5e1d8b56401e1a0c41f65e15",
 *         "price": {
 *             "cost_price": 10,
 *             "sale_price": 2
 *         },
 *         "size": "21",
 *         "sku_id": " ",
 *         "stock_quantity": 100,
 *         "created_at": "2020-03-20T07:57:10.544Z",
 *         "updated_at": "2020-03-20T07:57:10.544Z",
 *         "__v": 0
 *     }
 * }
 *
 * @apiError ValidationError 200 Name is a Required Field
 *
 * @apiErrorExample
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
 * @apiError ValidationError 200 Store ID is a Required Field
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "The Store Id is a required field",
 *    "error": {
 *        "validation": {
 *            "store_id": [
 *                "The Store Id is a required field"
 *            ]
 *        }
 *    }
 *}
 *}
 */
router.put('/:id', Upload.any(), ProductController.updateProduct);
/**
 * @api {Get} /api/admin/product/:id Update Product
 * @apiName Update Product
 * @apiGroup Admin-Products
 *
* @apiParam (Body) {Object} price:  A Object with fields "cost_price" (Cost Price of the Product) and "sale_price" (Sale Price of the Product)
* @apiParam (Body) (boolean) is_featured: Is Product Featured
* @apiParam (Body) (boolean) is_best_selling: Is Product Best Selling
* @apiParam (Body) {Array} pictures
* @apiParam (Body) {Number} status: Status of the product
* @apiParam (Body) {String} order_max Maximum Orders that can be placed
* @apiParam (Body) {String} tags: Tags
* @apiParam (Body) {String} _id: Unique Id of Product
* @apiParam (Body) {String} store_id: Unique Id of the Store
* @apiParam (Body) {String} name: Name of the Product
* @apiParam (Body) {String} category_id: Category Id of the Product
* @apiParam (Body) {String} size Size of the Product
* @apiParam (Body) {Number} stock_quantity: Stock Quantity
*
* @apiSuccessExample Success-Response
* HTTP/1.1 20 OK
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "product": {
 *            "price": {
 *                "cost_price": 10,
 *                "sale_price": 2
 *            },
 *            "is_featured": false,
 *            "is_best_selling": false,
 *            "pictures": [],
 *            "status": 1,
 *            "order_max": 1000,
 *            "tags": [
 *                "Test"
 *            ],
 *            "_id": "5e747756a050c140c524d742",
 *            "store_id": "5d778327d22f1e78b7671bd2",
 *            "name": "Test Product2",
 *            "category_id": "5e1d8b56401e1a0c41f65e15",
 *            "size": "21",
 *            "sku_id": " ",
 *            "stock_quantity": 100,
 *            "created_at": "2020-03-20T07:57:10.544Z",
 *            "updated_at": "2020-03-20T09:25:02.945Z",
 *            "__v": 0
 *        }
 *    }
 *}
 * @apiError ValidationError Name is a Required Field
 *  @apiErrorExample
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
 */
router.delete('/:id', ProductController.deleteProduct);

/**
 * @api {Delete} /api/admin/product/:id Delete a product
 * @apiName Delete a product
 * @apiGroup Admin-Products
 *
 *  @apiSuccessExample Success-Response
 * HTTP/1.1 20 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "product": {
 *            "n": 1,
 *            "opTime": {
 *                "ts": "6806226702511898625",
 *                "t": 68
 *            },
 *            "electionId": "7fffffff0000000000000044",
 *            "ok": 1,
 *            "$clusterTime": {
 *                "clusterTime": "6806226702511898625",
 *                "signature": {
 *                    "hash": "w3TR3epiMA9p/UoPZkyLkuDVqYg=",
 *                    "keyId": "6753601258507993089"
 *                }
 *            },
 *            "operationTime": "6806226702511898625",
 *            "deletedCount": 1
 *        }
 *    }
 *}

 @apiError Id is invalid 422
 @apiErrorExample
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

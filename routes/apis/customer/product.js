const express = require('express');

const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');

const ProductController = require('../../../controllers/customer/product');

router.get('/', ProductController.getProducts);

/**
* @api {get} /api/customer/product Get Products
* @apiName Get Products
* @apiGroup Customer-Product
*
* @apiParam (Query String) {String} store_id Id of the store.
* @apiParam (Query String) {String} category_id(optional) Parent catgeory id if all selected.
* @apiParam (Query String) {String} subcategory_id(optional) Sub category of the products require.
* @apiParam (Query String) {String} search(optional) search keyword by name of product.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*{
*    "success": true,
*    "code": 200,
*    "data": {
*        "subcategories": [
*            {
*                "_id": "5cdac8de1c9d4400003f31b6",
*                "status": 2,
*                "name": "cheese",
*                "store_id": "5cd1259b63aff817c37afb02",
*                "parent": "5cd55cec828e75341ca089cb",
*                "products": []
*            },
*            {
*                "_id": "5cd55d96828e75341ca089cc",
*                "status": 1,
*                "parent": "5cd55cec828e75341ca089cb",
*                "name": "Milk",
*                "store_id": "5cd1259b63aff817c37afb02",
*                "created_at": "2019-05-10T11:16:38.799Z",
*                "updated_at": "2019-05-10T11:16:38.799Z",
*                "__v": 0,
*                "products": [
*                    {
*                        "_id": "5ce3db99f558770b9cab1170",
*                        "is_featured": true,
*                        "pictures": [
*                            "nfufhuhsdfu",
*                            "fihwfuisudfdgsu"
*                        ],
*                        "name": "amul milk",
*                        "store_id": "5cd1259b63aff817c37afb02",
*                        "category_id": "5cd55d96828e75341ca089cc",
*                        "size": "1 litre",
*                        "price": {
*                            "cost_price": 20,
*                            "sale_price": 30
*                        },
*                        "stock_quantity": 10,
*                        "created_at": "2019-05-21T11:06:01.448Z",
*                        "updated_at": "2019-05-21T11:06:01.448Z",
*                        "__v": 0
*                    }
*                ]
*            }
*        ]
*    }
*}
*
* @apiError ValidationError Store Id is a required field.
*
* @apiErrorExample Store Id is a required field:
*{
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
*/

router.post('/availability', ProductController.checkProductAvailability);

/**
* @api {post} /api/customer/product/availability Check Products Availability
* @apiName Check Products Availability
* @apiGroup Customer-Product
*
* @apiParam (Body) {String} store_id Id of the store.
* @apiParam (Body) {Object[]} products An object with fields "quantity" (quantity of product ) ,  "_id" (product id).
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*{
*    "success": true,
*    "code": 200,
*    "data": {
*        "message": "All Products Are Available",
*        "outOfStockProducts": []
*    }
*}
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*{
*    "success": true,
*    "code": 200,
*    "data": {
*        "message": "Some Products Are Not Available Right Now",
*        "outOfStockProducts": [
*            {
*                "_id": "5ce55003a047874d7fc513ed",
*                "stock_quantity": 12,
*                "quantity_ordered": 100
*            }
*        ]
*    }
*}
*/


module.exports = router;

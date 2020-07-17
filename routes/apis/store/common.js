const express = require('express');

const router = express.Router();

const CommonController = require('../../../controllers/admin/common');

router.post('/dashboard', CommonController.dashboard);
/**
 * @api {Post} /api/store/dashboard Dashboard Data
 * @apiName Dashboard Data
 * @apiGroup Store-Dashboard
 *
 * @apiParam (Body) {String} from_date Date from data should be displayed
 * @apiParam (Body) {String} to_date Date till data should be displayed
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "total_orders": 21,
 *        "total_sale": 6905,
 *        "graph_sale_data": [
 *            {
 *                "month": "03",
 *                "sale": 30
 *            },
 *            {
 *                "month": "02",
 *                "sale": 135
 *            },
 *            {
 *                "month": "01",
 *                "sale": 6465
 *            }
 *        ],
 *        "graph_order_date": [
 *            {
 *                "status": 1,
 *                "order": 4
 *            },
 *            {
 *                "status": 4,
 *                "order": 4
 *            },
 *            {
 *                "status": 5,
 *                "order": 3
 *            },
 *            {
 *                "status": 3,
 *                "order": 9
 *            }
 *        ]
 *    }
 *}

 @apiError 500 From Date is a Required Field

 @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "From Date is a Required Field",
 *    "error": {
 *        "validation": {
 *            "from_date": [
 *                "From Date is a Required Field"
 *            ]
 *        }
 *    }
 *}
 * @apiError 500 to Date is a Required Field
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "To Date is a Required Field",
 *    "error": {
 *        "validation": {
 *            "from_date": [
 *                "To Date is a Required Field"
 *            ]
 *        }
 *    }
 *}

 */
router.get('/file-exists', CommonController.checkIfFileAlreadyExists);
router.put('/store-info', CommonController.updateStoreInfo);

module.exports = router;

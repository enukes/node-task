const express = require('express');

const router = express.Router();

const CommonController = require('../../../controllers/admin/common');

router.post('/dashboard', CommonController.dashboard);
/**
 * @api {POST} /api/store/dashboard Dashboard Data
 * @apiName Dashboard Data
 * @apiGroup Admin-Common
 *
 * @apiParam (Body) {String} from_date Date from data should be displayed
 * @apiParam (Body) {String} to_date Date till data should be displayed
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "total_orders": 182,
 *        "total_customers": 90,
 *        "total_stores": 13,
 *        "total_sale": 174443.51,
 *        "graph_sale_data": [],
 *        "graph_order_date": []
 *    }
 *}
 *
 * @apiError 500 To Date is a Required Field
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

 * @apiError 500 From Date is a Required Field
 *
 * @apiErrorExample
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
 */
router.get('/slot-scheduler', CommonController.runScheduler);
/**
 * @api {Get} /api/admin/slot-scheduler Slot Scheduler
 * @apiName Slot-Scheduler
 * @apiGroup Admin-Common
 *
 *@apiSuccessExample Success-Response
 *Http/1.1 200 OK
 *
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "message": "Scheduler Run"
 *    }
 *}
 *
 * @apiError 401 Unauthorized
 * @apiSuccessExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 *
 */

router.get('/manual-slots', CommonController.manualSlotCreation);
/**
 * @api {Get} /api/admin/manual-slots Manual Slots
 * @apiName Manual Slots
 * @apiGroup Admin-Common

 * @apiSuccessExample Success-Response
 *Http/1.1 200 OK
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "message": "Slot updated Successfully."
 *    }
 *}
 *
 * @apiError 401 Unauthorized
 * @apiSuccessExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */
router.get('/file-exists', CommonController.checkIfFileAlreadyExists);
/**
 * @api {Get} /api/admin/file-exists Check if File Exists or not
 * @apiName Check if File Exists or not
 * @apiGroup Admin-Common
 *
 * @apiParam (Params) {String} name Name of the file which we have to check
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 * {
 *    "success": true
 *}
* @apiError 401 Unauthorized
 * @apiSuccessExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */
module.exports = router;

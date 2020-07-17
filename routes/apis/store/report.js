const router = require('express').Router();
const ReportController = require('../../../controllers/admin/report');

router.get('/payment', ReportController.getStorePaymentReport);
/**
 *
 * @api {Get} api/store/report/payment Get Store Payment Report
 * @apiName Get Store Payment Report
 * @apiGroup Store-Payments
 *
 * @apiParam (Query String) {Date} from_date : The Date you want the reports from
 * @apiParam (Query String) {Date} to_date : The Date you want the reports till
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "payments": [
 *            {
 *                "_id": "5d778327d22f1e78b7671bd2",
 *                "name": "Enuke Test store",
 *                "totalOrders": 0,
 *                "totalAmount": 0,
 *                "totalCommission": 0,
 *                "taxAmount": 0,
 *                "deliveryCharges": 0
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10
 *        }
 *    }
 *}
 *
 * @apiError Unauthorized 401
 * {
 *    "success": false,
 *    "error": 401
 * }
 */
router.get('/store', ReportController.getStoreReport);
/**
 * @api {Get} /api/store/report/store Get Store Report
 * @apiName Get Store Report
 * @apiGroup Store-Reports
 *
 * @apiParam (Query String) {String} pageNo Current Page Number
 * @apiParam (Query String) {String} perPage Items to be displayed in per page.
 * @apiParam (Query String) {Date} from_date : The Date you want the reports from
 * @apiParam (Query String) {Date} to_date : The Date you want the reports till
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "stores": [],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10
 *        }
 *    }
 *}
 *
 * @apiError Unauthorized 401
 * {
 *    "success": false,
 *    "error": 401
 *}
 */

module.exports = router;

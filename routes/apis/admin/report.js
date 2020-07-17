const router = require('express').Router();
const ReportController = require('../../../controllers/admin/report');

// TODO: Rename the API to sales reports
router.get('/payment', ReportController.getStorePaymentReport);
/**
 * @api {Get} /api/admin/report/payment Get Store Payment Report.
 * @apiName Get Store Payment Report
 * @apiGroup Admin-Report
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Store Report to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 20 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "payments": [
 *            {
 *                "_id": "5e2eca2ad21fe166d8c93159",
 *                "name": "Amir Vegetables & Meat Store",
 *                "totalOrders": 1,
 *                "totalAmount": 321,
 *                "totalCommission": 22.47,
 *                "taxAmount": 0,
 *                "deliveryCharges": 100
 *            },
 *            {
 *                "_id": "5d778327d22f1e78b7671bd2",
 *                "name": "Enuke Test store",
 *                "totalOrders": 0,
 *                "totalAmount": 0,
 *                "totalCommission": 0,
 *                "taxAmount": 0,
 *                "deliveryCharges": 0
 *            },
 *            {
 *                "_id": "5e05d5ff954bc84f45786dd6",
 *                "name": "KNN General Store",
 *                "totalOrders": 7,
 *                "totalAmount": 5285,
 *                "totalCommission": 105.7,
 *                "taxAmount": 0,
 *                "deliveryCharges": 350
 *            },
 *            {
 *                "_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": "METRO",
 *                "totalOrders": 10,
 *                "totalAmount": 5660,
 *                "totalCommission": 177.9,
 *                "taxAmount": 0,
 *                "deliveryCharges": 800
 *            },
 *            {
 *                "_id": "5e469bf4d21fe166d8c93570",
 *                "name": "Marhaba Superstore",
 *                "totalOrders": 0,
 *                "totalAmount": 0,
 *                "totalCommission": 0,
 *                "taxAmount": 0,
 *                "deliveryCharges": 0
 *            },
 *            {
 *                "_id": "5d9eda647a30b1642ce9cb77",
 *                "name": "Saveway Super Store",
 *                "totalOrders": 0,
 *                "totalAmount": 0,
 *                "totalCommission": 0,
 *                "taxAmount": 0,
 *                "deliveryCharges": 0
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10,
 *            "totalItems": 13
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
router.get('/payment/export', ReportController.exportStorePaymentReport);
router.get('/store', ReportController.getStoreReport);
/**
 * @api {Get} /api/admin/report/store Get Shops Report.
 * @apiName Get Shops Report
 * @apiGroup Admin-Report
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Shops Report to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 20 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "stores": [
 *            {
 *                "_id": "5e2eca2ad21fe166d8c93159",
 *                "name": "Amir Vegetables & Meat Store",
 *                "ownerName": "Kamran",
 *                "items": 3,
 *                "soldQty": 1,
 *                "sales": 321,
 *                "totalCommission": 22.47
 *            },
 *            {
 *                "_id": "5e05d5ff954bc84f45786dd6",
 *                "name": "KNN General Store",
 *                "ownerName": "Najam",
 *                "items": 12,
 *                "soldQty": 7,
 *                "sales": 5285,
 *                "totalCommission": 105.7
 *            },
 *            {
 *                "_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": "METRO",
 *                "ownerName": "Hammad Hassan",
 *                "items": 13,
 *                "soldQty": 10,
 *                "sales": 5660,
 *                "totalCommission": 177.89999999999998
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10
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
router.get('/store/export', ReportController.exportShopReport);
router.get('/commission', ReportController.getCommissionPerStoreReport);
/**
 *
 * @api {Get} /api/admin/report/commission Get Commission Report
 * @apiName Get Commission Report
 * @apiGroup Admin-Report
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Commission Report to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "stores": [
 *            {
 *                "_id": "5e2eca2ad21fe166d8c93159",
 *                "name": "Amir Vegetables & Meat Store",
 *                "ownerName": "Kamran",
 *                "sales": 321,
 *                "totalCommission": 22.47
 *            },
 *            {
 *                "_id": "5e05d5ff954bc84f45786dd6",
 *                "name": "KNN General Store",
 *                "ownerName": "Najam",
 *                "sales": 5285,
 *                "totalCommission": 105.7
 *            },
 *            {
 *                "_id": "5d7607c59b5f0f76ee4f68b0",
 *                "name": "METRO",
 *                "ownerName": "Hammad Hassan",
 *                "sales": 5660,
 *                "totalCommission": 177.89999999999998
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10
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
router.get('/commission/export', ReportController.exportCommissionReport);
router.get('/coupons', ReportController.getCouponsReport);
/**
 *
 * @api {Get} /api/admin/report/commission Get Coupons Report
 * @apiName Get Commission Report
 * @apiGroup Admin-Report
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Coupons Report to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "coupons": [
 *            {
 *                "_id": "5e6b35536c789d243501e0b5",
 *                "couponCode": "COUPONCODE",
 *                "orderId": "1d6f890",
 *                "customer": "Rohit Kumar",
 *                "couponAmount": 100,
 *                "usedDate": "2020-03-13T07:28:48.980Z"
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10
 *        }
 *    }
 *}
 * @apiError ValidationError 401
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */
router.get('/coupons/export', ReportController.exportCouponReport);
router.get('/driver', ReportController.getAllDriversCommission);
/**
 * @api {Get} /api/admin/report/commission Get Coupons Report
 * @apiName Get Commission Report
 * @apiGroup Admin-Report
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Coupons Report to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "driverCommissions": [
 *            {
 *                "_id": "5e732a3f81e3b443d3f33a12",
 *                "orderId": "8f23ece",
 *                "totalAmount": 3000,
 *                "totalAdminCommission": 101.1,
 *                "totalDriverCommission": 0
 *            },
 *            {
 *                "_id": "5e709c82df07ca075e4f441d",
 *                "orderId": "7618402",
 *                "totalAmount": 225,
 *                "totalAdminCommission": 6.75,
 *                "totalDriverCommission": 0
 *            },
 *            {
 *                "_id": "5e6f42e73665c35677d667bb",
 *                "orderId": "05714c5",
 *                "totalAmount": 250,
 *                "totalAdminCommission": 7.5,
 *                "totalDriverCommission": 25
 *            },
 *            {
 *                "_id": "5e6b835a717a3735d1007ca7",
 *                "orderId": "033f6e1",
 *                "totalAmount": 600,
 *                "totalAdminCommission": 12,
 *                "totalDriverCommission": 0
 *            },
 *            {
 *                "_id": "5e6b3630759fc8244d89c15f",
 *                "orderId": "1d6f890",
 *                "totalAmount": 250,
 *                "totalAdminCommission": 4.5,
 *                "totalDriverCommission": 0
 *            },
 *            {
 *                "_id": "5e5f4f9ca4b29438db61648e",
 *                "orderId": "97967f5",
 *                "totalAmount": 365,
 *                "totalAdminCommission": 7.3,
 *                "totalDriverCommission": 36.5
 *            },
 *            {
 *                "_id": "5e5f4aa1f0850329955609c1",
 *                "orderId": "9f799ab",
 *                "totalAmount": 1106,
 *                "totalAdminCommission": 22.12,
 *                "totalDriverCommission": 110.6
 *            },
 *            {
 *                "_id": "5e5f486df0850329955609be",
 *                "orderId": "41fe128",
 *                "totalAmount": 155,
 *                "totalAdminCommission": 3.1,
 *                "totalDriverCommission": 15.5
 *            },
 *            {
 *                "_id": "5e5f451aeba5e4297d6ada79",
 *                "orderId": "93bb47b",
 *                "totalAmount": 1725,
 *                "totalAdminCommission": 34.5,
 *                "totalDriverCommission": 172.5
 *            },
 *            {
 *                "_id": "5e5e72fd2629035f654f1efe",
 *                "orderId": "6281ac8",
 *                "totalAmount": 670,
 *                "totalAdminCommission": 20.1,
 *                "totalDriverCommission": 0
 *            }
 *        ]
 *    }
 *}
 */
router.get('/driver/export', ReportController.exportDriverReport);

router.get('/driver/:id', ReportController.getDriverCommissionsById);

// Old paths
router.post('/payment/:id', ReportController.markStorePaid);
router.get('/customer', ReportController.getCustomersForReport);
router.get('/sales', ReportController.getStoreSalesReport);

module.exports = router;

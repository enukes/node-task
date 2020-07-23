const router = require('express').Router();
const ReportController = require('../../../controllers/admin/report');

// TODO: Rename the API to sales reports
router.get('/payment', ReportController.getStorePaymentReport);
router.get('/payment/export', ReportController.exportStorePaymentReport);
router.get('/store', ReportController.getStoreReport);
router.get('/store/export', ReportController.exportShopReport);
router.get('/commission', ReportController.getCommissionPerStoreReport);
router.get('/commission/export', ReportController.exportCommissionReport);
router.get('/coupons', ReportController.getCouponsReport);
router.get('/coupons/export', ReportController.exportCouponReport);
router.get('/driver', ReportController.getAllDriversCommission);
router.get('/driver/export', ReportController.exportDriverReport);
router.get('/driver/:id', ReportController.getDriverCommissionsById);

// Old paths
router.post('/payment/:id', ReportController.markStorePaid);
router.get('/customer', ReportController.getCustomersForReport);
router.get('/sales', ReportController.getStoreSalesReport);

module.exports = router;

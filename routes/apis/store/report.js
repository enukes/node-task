const router = require('express').Router();
const ReportController = require('../../../controllers/admin/report');

router.get('/payment', ReportController.getStorePaymentReport);
router.get('/store', ReportController.getStoreReport);

module.exports = router;

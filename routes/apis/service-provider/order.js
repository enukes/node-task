const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const Upload = require(path('common/multer'));
const ServiceController = require('../../../controllers/serviceprovider/product');
const ServiceOrderController = require('../../../controllers/serviceprovider/order');
const OpenApiController = require('../../../controllers/common/open-apis');


router.get('/orders', ServiceController.getServiceOrderHistory);
router.get('/today-orders', ServiceOrderController.getTodayOrders);
router.put('/status/:id', ServiceOrderController.updateSeviceOrder); 
router.post('/verify-order', OpenApiController.verifyService); 


module.exports = router;

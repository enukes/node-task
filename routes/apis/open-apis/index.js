const express = require('express');
const router = express.Router();
const OpenApiController = require('../../../controllers/common/open-apis');

// router.post('/', dsd)
router.post('/verify-order', OpenApiController.verifyOrder);
router.post('/store-register', OpenApiController.createStore.bind(OpenApiController));

module.exports = router;

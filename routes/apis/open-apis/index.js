const express = require('express');

const router = express.Router();

const OpenApiController = require('../../../controllers/common/open-apis');

// router.post('/', dsd)

router.post('/update-sku-products', OpenApiController.updateProductsFromSku);

module.exports = router;

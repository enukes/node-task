const express = require('express');
const router = express.Router();
const OpenApiController = require('../../../controllers/common/open-apis');


router.post('/add-views', OpenApiController.addViews);
router.get('/get-views', OpenApiController.getViews);

module.exports = router;

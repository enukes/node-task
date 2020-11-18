const express = require('express');
const router = express.Router();
const openApiRoutes = require('./open-apis');


router.use('/', openApiRoutes);

module.exports = router;

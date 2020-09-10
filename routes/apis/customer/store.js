const express = require('express');
const router = express.Router();
const jwtAuth = require('../../../middlewares/jwt-auth');
const StoreController = require('../../../controllers/customer/store');

router.get('/link', StoreController.getStoreDetailsFromLink);
router.get('/', StoreController.getStoreFromArea);
router.get('/:id', StoreController.aStoreHomePage);
router.get('/:id/slots', StoreController.getStoreTimingSlots);


module.exports = router;

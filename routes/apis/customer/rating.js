const router = require('express').Router();
const RatingController = require('../../../controllers/customer/rating');
const jwtAuth = require('../../../middlewares/jwt-auth');

router.post('/driver-rating', jwtAuth, RatingController.driverRating);
router.post('/store-rating', jwtAuth, RatingController.storeRating);

module.exports = router;


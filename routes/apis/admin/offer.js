const router = require('express').Router();
const OfferController = require('../../../controllers/admin/offer');
const Upload = require('../../../common/multer');

router.post('/', Upload.single('image'), OfferController.addOffer);
router.put('/:id', Upload.single('image'), OfferController.updatedOffer);
router.delete('/:id', OfferController.deleteOffer);

module.exports = router;

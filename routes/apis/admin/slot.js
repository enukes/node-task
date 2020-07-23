const router = require('express').Router();
const SlotController = require('../../../controllers/admin/slot');

router.get('/', SlotController.getSlots);
router.post('/', SlotController.addSlots);

module.exports = router;

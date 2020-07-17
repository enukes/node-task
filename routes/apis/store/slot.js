const router = require('express').Router();
const SlotController = require('../../../controllers/admin/slot');

router.post('/', SlotController.addSlots);

module.exports = router;

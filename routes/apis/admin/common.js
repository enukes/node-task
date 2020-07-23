const express = require('express');
const router = express.Router();
const CommonController = require('../../../controllers/admin/common');

router.post('/dashboard', CommonController.dashboard);
router.get('/slot-scheduler', CommonController.runScheduler);
router.get('/manual-slots', CommonController.manualSlotCreation);
router.get('/file-exists', CommonController.checkIfFileAlreadyExists);

module.exports = router;

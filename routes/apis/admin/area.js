const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const AreaController = require('../../../controllers/admin/area');

router.get('/', AreaController.getAreasList);
router.get('/cities', AreaController.getCitiesList);
router.post('/', AreaController.addArea);
router.put('/:id', AreaController.updateArea);
router.delete('/:id', AreaController.deleteArea);

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const CityController = require('../../../controllers/admin/city');

router.post('/', CityController.addCity);
router.put('/:id', CityController.updateCity);
router.delete('/:id', CityController.deleteCity);

module.exports = router;

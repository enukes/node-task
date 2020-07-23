const router = require('express').Router();
const DriverController = require('../../../controllers/admin/driver');
const Upload = require('../../../common/multer');

router.get('/', DriverController.getDrivers);
router.get('/all', DriverController.getAllDrivers);
router.post('/', Upload.any(), DriverController.addDriver);
router.put('/change-password/:id', DriverController.changeDriverPassword);
router.put('/:id', Upload.any(), DriverController.updateDriver);
router.delete('/:id', DriverController.deleteDriver);

module.exports = router;

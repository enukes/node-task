const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const StoreController = require('../../../controllers/admin/store');
const Upload = require(path('common/multer'));

router.get('/', StoreController.getStores);
router.post('/', Upload.any(), StoreController.addStore);
router.get('/stores', StoreController.getStoresForCategoryManagement);
router.put('/:id', Upload.any(), StoreController.updateStore);
router.get('/:id/drivers', StoreController.getActiveStoreDrivers);
router.get('/:id/slots/today', StoreController.getDaySlot);
router.delete('/:id', StoreController.deleteStore);
router.put('/change-password/:id', StoreController.changeStorePassword);
router.get('/links', StoreController.generateAllStoreLink);

module.exports = router;

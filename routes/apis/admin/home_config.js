const router = require('express').Router();
const HomePageController = require('../../../controllers/customer/home-page');

router.get('/', HomePageController.homeContent);
router.post('/', HomePageController.addHomeConfig);
router.put('/reorder', HomePageController.reorderHomeConfig);
router.put('/:id', HomePageController.updatedHomeConfig);
router.delete('/:id', HomePageController.deleteHomeConfig);

module.exports = router;

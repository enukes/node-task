const router = require('express').Router();
const AreaController = require('../../../controllers/customer/area');
const ContactController = require('../../../controllers/customer/contact');
const HomePageController = require('../../../controllers/customer/home-page');

router.get('/cities', AreaController.getCitiesList);
router.get('/areas', AreaController.getAreasList);
router.post('/contact-us', ContactController.contactRequest);
router.get('/home-content', HomePageController.homeContent);

module.exports = router;

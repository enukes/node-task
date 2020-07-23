const router = require('express').Router();
const AdminCustomerController = require('../../../controllers/admin/customer');
const CustomerController = require('../../../controllers/customer/user');

router.get('/', AdminCustomerController.getCustomers);
router.post('/', AdminCustomerController.addCustomer);
router.post('/edit', AdminCustomerController.editCustomer);
router.post('/check', AdminCustomerController.checkCustomerExist);
router.get('/address', CustomerController.getAddress.bind(CustomerController));
router.post('/address', CustomerController.addAddress.bind(CustomerController));
router.put('/address/:id', CustomerController.updateAddress.bind(CustomerController));
router.delete('/address/:id "?user_id":user_id ', CustomerController.deleteAddress.bind(CustomerController));

module.exports = router;

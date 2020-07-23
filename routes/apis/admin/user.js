const express = require('express');
const router = express.Router();
const path = require('path').resolve;
const UserController = require('../../../controllers/admin/user');

router.get('/', UserController.getSubAdmins);
router.post('/', UserController.addSubAdmin);
router.put('/:id', UserController.updateSubAdmin);
router.delete('/:id', UserController.deleteSubAdmin);

module.exports = router;

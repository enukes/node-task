const express = require('express');

const router = express.Router();

const ConfigController = require('../../../controllers/admin/config');

// router.post('/', ConfigController.addConfig)

router.get('/', ConfigController.getConfig);
/**
 * @api {Get} /api/admin/config  Get Config
 * @apiName Get Config
 * @apiGroup Admin-Config
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "taxes": []
 *    }
 *}
 * @apiError 401 Unauthorized
 * @apiSuccessExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 *
 */
router.put('/', ConfigController.updateConfig);

module.exports = router;

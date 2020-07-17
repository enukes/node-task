const express = require('express');

const router = express.Router();
const path = require('path').resolve;

const AreaController = require('../../../controllers/admin/area');

router.get('/', AreaController.getAreasList);
router.get('/cities', AreaController.getCitiesList);
/**
 * @api {Get} /api/admin/area/cities Get City List
 * @apiName Get City List
 * @apiGroup Admin
 *
 * @apiParam (Query String) {String} pageNo Page No
 * @apiParam (Query String) {String} perPage Per Page items to be displayed.
 * @apiParam (Query String) {String} search Item to be searched
 *
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "cities": [
 *            {
 *                "status": 1,
 *                "_id": "5d7603909b5f0f76ee4f68ad",
 *                "name": "Karachi",
 *                "created_at": "2019-09-09T07:47:28.591Z",
 *                "updated_at": "2020-02-14T12:58:14.336Z",
 *                "__v": 0
 *            },
 *            {
 *                "status": 1,
 *                "_id": "5e4fb1919542d566f68a716e",
 *                "name": "sdsds",
 *                "created_at": "2020-02-21T10:31:45.695Z",
 *                "updated_at": "2020-02-21T10:31:45.695Z",
 *                "__v": 0
 *            }
 *        ],
 *        "totalCityCount": 2
 *    }
 *}
 *
 * @apiError 401 Unauthorized
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 *
 */

router.post('/', AreaController.addArea);
router.put('/:id', AreaController.updateArea);
router.delete('/:id', AreaController.deleteArea);

module.exports = router;

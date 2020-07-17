const express = require('express');

const router = express.Router();
const path = require('path').resolve;

const CityController = require('../../../controllers/admin/city');

router.post('/', CityController.addCity);
/**
 * @api {POST} /api/admin/city
 * @apiName Add a City List
 * @apiGroup Admin-City
 *
 * @apiParam (Body) {String} status Status of the Added City
 * @apiParam (Body) {String} name Name of the City
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "city": {
 *            "areas": [],
 *            "status": 1,
 *            "_id": "5e73176551e5fd30231ef987",
 *            "name": "Test City",
 *            "created_at": "2020-03-19T06:55:33.433Z",
 *            "updated_at": "2020-03-19T06:55:33.433Z",
 *            "__v": 0
 *        }
 *    }
 *}

 @apiError 422 Name is a required field

 @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Name is a required field.",
 *    "error": {
 *        "validation": {
 *            "city_details": [
 *                "Name is a required field."
 *            ]
 *        }
 *    }
 *}

 @apiError 422 Name is a required field

 @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Name is a required field.",
 *    "error": {
 *        "validation": {
 *            "city_details": [
 *                "Name is a required field."
 *            ]
 *        }
 *    }
 *}
 */
router.put('/:id', CityController.updateCity);
/**
 * @api {Put} /api/admin/city/:id
 * @apiName Update a City
 * @apiGroup Admin-City
 *
 * @apiParam (Body) {String} status Status of the City
 * @apiParam (Body) {String} name Name of the City
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "city": {
 *            "areas": [],
 *            "status": 1,
 *            "_id": "5e73184b03278532e166a493",
 *            "name": "Test City",
 *            "created_at": "2020-03-19T06:59:23.381Z",
 *            "updated_at": "2020-03-19T06:59:23.381Z",
 *            "__v": 0
 *        }
 *    }
 *}
 *
 * @apiError 422 Name is a required field
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Name is a required field.",
 *    "error": {
 *        "validation": {
 *            "city_details": [
 *                "Name is a required field."
 *            ]
 *        }
 *    }
 *}


 *
 */
router.delete('/:id', CityController.deleteCity);
/**
 * @api {Delete} api/admin/city/:id
 * @apiName Delete a City
 * @apiGroup Admin-City
 *
 * @apiSuccessExample Success-Response
 * Http/1.1 200 OK
 *
 * @apiError UNPROCESSABLE_ENTITY City Id is Invalid
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "City Id is Invalid",
 *    "error": {
 *        "validation": {
 *            "city_id": [
 *                "City Id is Invalid"
 *            ]
 *        }
 *    }
 *}
 */

module.exports = router;

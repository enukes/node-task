const router = require('express').Router();

const DriverController = require('../../../controllers/admin/driver');
const Upload = require('../../../common/multer');

router.get('/', DriverController.getDrivers);
/**
 * @api {Get} /api/admin/driver Get All Drivers
 * @apiName Get All Drivers
 * @apiGroup Admin-Driver
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Store to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType:-1 To be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "drivers": [
 *            {
 *                "picture": null,
 *                "percentageCommission": 5,
 *                "is_online": true,
 *                "is_logout": false,
 *                "status": 2,
 *                "_id": "5dea5479d85c19035ebf121f",
 *                "email": "hashir.ahmed@aapkidokan.com",
 *                "password": "$2b$10$AzrGBD/0zxhpzSHLGkcpJOrCZSqTujpzDuq4kUBGIr6ZJzqnwBuN2",
 *                "full_name": "Hashir Ahmed",
 *                "contact_number": "03422681694",
 *                "address": "Gulshan",
 *                "created_at": "2019-12-06T13:15:37.660Z",
 *                "updated_at": "2020-03-03T11:54:41.498Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWE1NDc5ZDg1YzE5MDM1ZWJmMTIxZiIsInR5cGUiOjQsImlhdCI6MTU3OTYwMDY2Nn0.zvTvk-c39Aju8gbQq5S4RnOLIp4hGUZ29ScZHPN3zss",
 *                "fcm_token": "cwOeAMtVJ4o:APA91bFY8FmMg_OVRCyvzqEdud_sPbaoP2X7QkKyCcDqVFXeoCAUsFKQPEx03alD5khsPrdsmUipdjJ1199o_PQXVQohnC9XOqhlWPv1UKorQGuq7NNGBUlo1S2suvoPn0QSFU1IiCe4"
 *            },
 *            {
 *                "picture": null,
 *                "percentageCommission": 10,
 *                "is_online": true,
 *                "is_logout": false,
 *                "status": 1,
 *                "_id": "5d79f10ed22f1e78b7671d74",
 *                "email": "prince.kumar@enukesoftware.com",
 *                "password": "$2b$10$V1ijCdR.etx3L46BMFprguuPOXmHAcCQhkl36di.tBew.DjlGNaVu",
 *                "full_name": "PRINCE KUMAR",
 *                "contact_number": "8285724681",
 *                "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                "created_at": "2019-09-12T07:17:34.858Z",
 *                "updated_at": "2020-03-17T12:04:21.007Z",
 *                "__v": 0,
 *                "fcm_token": "fui46PA2ZTk:APA91bGDNaCm_0ZeT1Lq89xwx6PQDdUaHE4U5dSz22vk6ReWUx2HcvZv2P28M7079GA5Ud0OJUuk-CkPfCh2l8aJ0A2s5RTZ2CeaGUNlbbBTI5x8GNBmj07obxfU3LdeMiYx3L1bHg1u",
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDQ0NjY2MX0.HAA2vDCEqPnoMQHyRdAFy1skHku19ZjlJL80boNxzlk"
 *            },
 *            {
 *                "picture": null,
 *                "percentageCommission": 0,
 *                "is_online": true,
 *                "is_logout": false,
 *                "status": 1,
 *                "_id": "5d9dda22d22f1e78b76728c3",
 *                "email": "nasir.ahmed@aapkidokan.com",
 *                "password": "$2b$10$Se2zNSy8Ct3UA788zAdwSO2NkQeqhMKZcGpTAi2xXuTDkeelIRUdC",
 *                "full_name": "Nasir Ahmed",
 *                "contact_number": "03218994366",
 *                "address": "Bait-ul-Mukaram Masjid, B29, Master Square، University Rd, Block 13/A Block 13 A Opp، Karachi, Karachi City, Sindh, Pakistan",
 *                "driving_license": "154512154956",
 *                "created_at": "2019-10-09T13:01:22.730Z",
 *                "updated_at": "2020-01-15T09:08:51.960Z",
 *                "__v": 0,
 *                "fcm_token": "em_1AecwxWg:APA91bE-u0HYQ9_7z3RNl9KrlA86vY5DSyKmzSNgFu1D8YFIjrtzvZtQ65QDjbZEbFegYjZ_QTqgp3TcF720_015Q52iXoSTst87VnG0WXa8GleHsHB1g_KPqHojtQ5mYxeCcmPTy803",
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWRkYTIyZDIyZjFlNzhiNzY3MjhjMyIsInR5cGUiOjQsImlhdCI6MTU3OTA3OTMyN30.WRLVWh3--pe7H8e9-mWdFgSrH3Zlil4f_wLSrK6Vn9s"
 *            },
 *            {
 *                "picture": null,
 *                "percentageCommission": 0,
 *                "is_online": true,
 *                "is_logout": false,
 *                "status": 1,
 *                "_id": "5dea53edd85c19035ebf121d",
 *                "email": "yasir.mangi@aapkidokan.com",
 *                "password": "$2b$10$rMNypS3lK.5sX8pM7caPUeEi2Ezfbrlm6wjYHqVZqWs54iLA0l0Ty",
 *                "full_name": "Yasir Ali",
 *                "contact_number": "03133078092",
 *                "address": "Gulshan",
 *                "created_at": "2019-12-06T13:13:17.426Z",
 *                "updated_at": "2019-12-10T15:57:39.689Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWE1M2VkZDg1YzE5MDM1ZWJmMTIxZCIsInR5cGUiOjQsImlhdCI6MTU3NTcwNDIwOX0.vTB55W-6BBnPwO32TVXeX705nC-IiOckgdJLHqYUhkE",
 *                "fcm_token": "dAyqVVKFjbk:APA91bEgwAY4v-SJoZAt-aje0HcrDQc3xOnZl6crKoiZAH1K5t2E9X2nhGo1tDVbniQNAPJVGqT-LImFnUkwgYEvRD548ADfTIoWok2Bf2ajbzG5lDV3XlohF0EAAlhJzImIWywAKfQh"
 *            },
 *            {
 *                "picture": null,
 *                "percentageCommission": 0,
 *                "is_online": true,
 *                "is_logout": true,
 *                "status": 1,
 *                "_id": "5dea5445d85c19035ebf121e",
 *                "email": "hammad.siddiqui@aapkidokan.com",
 *                "password": "$2b$10$OAg1a3NW1/kZpW8/5IcMKOYUWJyjIGGNJ8x1Gsnda.rWeRLoP6cX6",
 *                "full_name": "Hammad Hassan",
 *                "contact_number": "03333743790",
 *                "address": "Gulshan",
 *                "created_at": "2019-12-06T13:14:45.040Z",
 *                "updated_at": "2020-02-29T09:08:39.286Z",
 *                "__v": 0,
 *                "fcm_token": "dZIGhg0kz2g:APA91bGe6pW5WOfGzf1ih_xDoLOXgM7IB_bkeXzwlsvespoKAsfPbLWTfM_oTd7er6fwn5lMFNtgP4qfgkeYEs9HaH-GNh1KxZs_FrTESrbGPwDdIz7raRND619EttBSQqVgyRRi1tFF",
 *                "verification_token": "b6a67c71-e504-443b-b3e8-1246aeae032b",
 *                "otp": 593737,
 *                "otp_created": "2020-02-29T09:08:39.285Z"
 *            },
 *            {
 *                "picture": null,
 *                "percentageCommission": 0,
 *                "is_online": true,
 *                "is_logout": false,
 *                "status": 1,
 *                "_id": "5dea892ed85c19035ebf1238",
 *                "email": "najam.sahto@gmail.com",
 *                "password": "$2b$10$jeLNLonOzCtta7I2rcVzXuf.yMQCBdd8OmXnQn4T2Xze8RdRrIwfu",
 *                "full_name": "Najam",
 *                "contact_number": "03012999901",
 *                "address": "Gulshan",
 *                "created_at": "2019-12-06T17:00:30.248Z",
 *                "updated_at": "2019-12-21T09:17:00.925Z",
 *                "__v": 0,
 *                "fcm_token": "diLyMin-RYI:APA91bFAAsTj-4mkvLOgVg9eDCtwxflmxaEQ2T_oAamgAz3xXhW2v1wlbytzzfWDhPXG6Kr2LWxwSKu1oLfMe3ciobwHiRZVA8dPCKBxBdiTMVkol85Q2tFkDk-kkdbfEqz7COQt-ftv",
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWE4OTJlZDg1YzE5MDM1ZWJmMTIzOCIsInR5cGUiOjQsImlhdCI6MTU3NjkxOTgyMH0.HLD-AmOo7Nlz63x3Xyqqth_8nHm4XRxpm01vliZ_izU"
 *            },
 *            {
 *                "picture": "Farhad Profile picture.jpeg",
 *                "percentageCommission": 10,
 *                "is_online": true,
 *                "is_logout": false,
 *                "status": 1,
 *                "_id": "5e4e2a39d21fe166d8c94153",
 *                "email": "alifarhad856@gmail.com",
 *                "password": "$2b$10$W1UCnj3ZNrW6sM/NrFAEjetCQBAS3C4U7drCYCvm8GBvzj.32tsmm",
 *                "full_name": "Farhad Ali",
 *                "contact_number": "03122515627",
 *                "address": "House no K 112/A Qasba Colony town",
 *                "driving_license": "4240142360253#404",
 *                "created_at": "2020-02-20T06:42:01.336Z",
 *                "updated_at": "2020-03-03T11:31:36.910Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNGUyYTM5ZDIxZmUxNjZkOGM5NDE1MyIsInR5cGUiOjQsImlhdCI6MTU4MjE4MDk2N30.RCQ1jN3FZ9wpW8F1RzK7JAfz_OYcasH4OJdxbB9sbBg",
 *                "fcm_token": "d32no1aujA0:APA91bEh0NVodEn4aeT-BtOxchmBNb8XtTnwXkcdRm5DUCfEY0Urpfu-sgmkee3ZuL7Uwk48uaHxALinDLmEyTwzjB5yKto_MMGaMMOfTvUJR2hpCKVNLYCOkmaw3X77qaAZqPPrrrIG"
 *            }
 *        ],
 *        "totalCount": 7
 *    }
 *}
 * @apiError ValidationError 401
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */
router.get('/all', DriverController.getAllDrivers);
router.post('/', Upload.any(), DriverController.addDriver);
/**
 * @api {Post} /api/admin/driver Add a Driver
 * @apiName Add a Driver
 * @apiGroup Admin-Driver
 *
 * @apiParam (Body) {Number} status Status of the driver
 * @apiParam (Body) {Number} percentageCommission Percentage Commission
 * @apiParam (Body) {String} full_name Name of the Driver
 * @apiParam (Body) {String} email Email Id of the Driver
 * @apiParam (Body) {String} contact_number Contact Number of the Driver
 * @apiParam (Body) {String} password Password of the Driver
 * @apiParam (Body) {String} address Address of the Driver
 * @apiParam (Body) {String} driving_license Driving License of the Driver
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "driver": {
 *            "picture": "Screenshot from 2020-02-18 14-49-15.png",
 *            "percentageCommission": 2,
 *            "is_online": true,
 *            "is_logout": false,
 *            "status": 1,
 *            "_id": "5e7229b81dbfb17a8266a97b",
 *            "full_name": "Test Driver",
 *            "email": "testdriver2@enukesoftware.com",
 *            "contact_number": "9878854126",
 *            "password": "$2b$10$lKSOeutK4fLkdnUpZD7AYOYBph6g.XMbXYmE0LQT9XBoQ7ZSVG2f2",
 *            "address": "112",
 *            "driving_license": "123",
 *            "created_at": "2020-03-18T14:01:28.145Z",
 *            "updated_at": "2020-03-18T14:01:28.145Z",
 *            "__v": 0
 *        }
 *    }
 *}
 *
 * @apiError UNPROCESSABLE_ENTITY Email address is a required field
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Email address is a required field.",
 *    "error": {
 *        "validation": {
 *            "email": [
 *                "Email address is a required field."
 *            ]
 *        }
 *    }
 *}
 */
router.put('/change-password/:id', DriverController.changeDriverPassword);
/**
 * @api {Put} api/admin/driver/change-password/:id Change Driver Password
 * @apiName Change Password of a driver.
 * @apiGroup Admin-Driver
 *
 * @apiParam (Body) {String} password Change Password of a driver
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "driver": {
 *            "picture": null,
 *            "percentageCommission": 10,
 *            "is_online": true,
 *            "is_logout": false,
 *            "status": 1,
 *            "_id": "5d79f10ed22f1e78b7671d74",
 *            "email": "prince.kumar@enukesoftware.com",
 *            "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *            "full_name": "PRINCE KUMAR",
 *            "contact_number": "8285724681",
 *            "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *            "created_at": "2019-09-12T07:17:34.858Z",
 *            "updated_at": "2020-03-18T14:12:02.201Z",
 *            "__v": 0,
 *            "fcm_token": "fui46PA2ZTk:APA91bGDNaCm_0ZeT1Lq89xwx6PQDdUaHE4U5dSz22vk6ReWUx2HcvZv2P28M7079GA5Ud0OJUuk-CkPfCh2l8aJ0A2s5RTZ2CeaGUNlbbBTI5x8GNBmj07obxfU3LdeMiYx3L1bHg1u",
 *            "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDQ0NjY2MX0.HAA2vDCEqPnoMQHyRdAFy1skHku19ZjlJL80boNxzlk"
 *        }
 *    }
 *}
 *
 * @apiError 500 Internal Server Error
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "singleStringMessage": "Cast to ObjectId failed for value \"5d79f10ed22f1e78b7671d7\" at path \"_id\" for model \"Driver\"",
 *    "error": {
 *        "stringValue": "\"5d79f10ed22f1e78b7671d7\"",
 *        "kind": "ObjectId",
 *        "value": "5d79f10ed22f1e78b7671d7",
 *        "path": "_id",
 *        "reason": {},
 *        "message": "Cast to ObjectId failed for value \"5d79f10ed22f1e78b7671d7\" at path \"_id\" for model \"Driver\"",
 *        "name": "CastError"
 *    }
 *}
 */

router.put('/:id', Upload.any(), DriverController.updateDriver);
/**
 * @api {Put} /api/admin/driver/:id Update Driver
 * @apiName Update Driver
 * @apiGroup Admin-Driver
 *
 * @apiParam (Body) {Number} status: Status of the driver
 * @apiParam (Body) {Number} percentageCommission : Percentage Commission of the driver.
 * @apiParam (Body) {String} full_name : Full Name of the driver
 * @apiParam (Body) {String} email: Email of the driver.
 * @apiParam (Body) {String} contact_number: Contact Number of the Driver.
 * @apiParam (Body) {String} password : Password of the Driver
 * @apiParam (Body) {String} address: Address of the driver.
 * @apiParam (Body) {String} driving_license: Driving license of the driver
 * @apiParam (Body) {File} picture: Picture of Driver
 * @apiParam (Body) {Boolean} is_online: Is Driver Online
 * @apiParam (Body) {Boolean} is_logout: Is Driver Logout
 * @apiParam (Body) {String} _id: Unique Id of a Driver
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
*    "success": true,
*    "code": 200,
*    "data": {
*        "driver": {
*            "picture": "Screenshot from 2020-02-20 16-27-43.png",
*            "percentageCommission": 2,
*            "is_online": true,
*            "is_logout": false,
*            "status": 1,
*            "_id": "5e7229001dbfb17a8266a97a",
*            "full_name": "Test Drive",
*            "email": "testdriver@enukesoftware.com",
*            "contact_number": "9878854125",
*            "password": "$2b$10$YQUB7rPWNQZcf/HNIsqS2e4lZYapt.lNm0eddfHFa9ldPsyDHDlve",
*            "address": " 12",
*            "driving_license": "1234",
*            "created_at": "2020-03-18T13:58:24.412Z",
*            "updated_at": "2020-03-18T17:25:38.716Z",
*            "__v": 0
*        }
*    }
*}
*
*@apiError  401 Unauthorized
*@apiErrorExample
*{
*    "success": false,
*    "error": 401
*}

 *
 *
 */
router.delete('/:id', DriverController.deleteDriver);
/**
 * @api {Delete} /api/admin/driver/:id
 * @apiName Delete a Driver
 * @apiGroup Admin-Driver
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "driver": {
 *            "picture": "Screenshot from 2020-02-18 14-49-15.png",
 *            "percentageCommission": 2,
 *            "is_online": true,
 *            "is_logout": false,
 *            "status": 1,
 *            "_id": "5e7229b81dbfb17a8266a97b",
 *            "full_name": "Test Driver",
 *            "email": "testdriver2@enukesoftware.com",
 *            "contact_number": "9878854126",
 *            "password": "$2b$10$lKSOeutK4fLkdnUpZD7AYOYBph6g.XMbXYmE0LQT9XBoQ7ZSVG2f2",
 *            "address": "112",
 *            "driving_license": "123",
 *            "created_at": "2020-03-18T14:01:28.145Z",
 *            "updated_at": "2020-03-19T06:09:28.027Z",
 *            "__v": 0
 *        }
 *    }
 *}
 *
 * @apiError Unauthorized 401
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */


module.exports = router;

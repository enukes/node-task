const router = require('express').Router();
const AdminCustomerController = require('../../../controllers/admin/customer');
const CustomerController = require('../../../controllers/customer/user');

router.get('/', AdminCustomerController.getCustomers);
/**
 * @api {Get} /api/admin/customer Get All Customers.
 * @apiName Get All Customers
 * @apiGroup Admin-Customer
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search Store to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 *
 *  @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "customers": [
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e04b308954bc84f45786dbb",
 *                "email": "hilebec452@topmail.ws",
 *                "full_name": "Checking",
 *                "contact_number": "03121122112",
 *                "password": "$2b$10$nyRHAX6I5DNfpwbV.HWjHO5gK3WOrLmYUeHE7EtpL/.YpwQrfrJfy",
 *                "verification_token": "d750d375-6e52-4476-b784-7a5e9def8d64",
 *                "address": [],
 *                "created_at": "2019-12-26T13:18:00.945Z",
 *                "updated_at": "2019-12-26T13:18:15.936Z",
 *                "__v": 0,
 *                "otp": 473665,
 *                "otp_created": "2019-12-26T13:18:00.954Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e2f3638d21fe166d8c9320a",
 *                "email": "arhamshahid2010@icloud.com",
 *                "password": "$2b$10$iNsPbE.krgsPrSVBY3Gi6.RSax1Vuw377Ga32FGZ/1HaSLjUyrIYm",
 *                "full_name": "arham",
 *                "contact_number": "03003645020",
 *                "verification_token": "2948f4e0-7d09-46e3-860f-2b256234a0fe",
 *                "address": [],
 *                "created_at": "2020-01-27T19:12:56.434Z",
 *                "updated_at": "2020-01-27T19:13:21.928Z",
 *                "__v": 0,
 *                "otp": 674903,
 *                "otp_created": "2020-01-27T19:12:56.449Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e3077b7d21fe166d8c93216",
 *                "full_name": "Rushna Sajid",
 *                "email": "sajid.rush@gmail.com",
 *                "contact_number": "03123643212",
 *                "password": "$2b$10$C0gjT1pLm7roxH6NB.ZP.O4rj/TrV/trq/8SizKy7uAfLpBrkJudu",
 *                "verification_token": "a5341b04-a4d0-4c1b-a777-4a7a6dffbd78",
 *                "address": [],
 *                "created_at": "2020-01-28T18:04:39.794Z",
 *                "updated_at": "2020-01-28T18:05:25.121Z",
 *                "__v": 0,
 *                "otp": 130821,
 *                "otp_created": "2020-01-28T18:04:39.804Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e307a32d21fe166d8c93217",
 *                "full_name": "Adil Khan",
 *                "email": "adilk6866@gmail.com",
 *                "contact_number": "03032431170",
 *                "password": "$2b$10$VxLNcsFTTC5lVQw4rUWg9../nFsIwlUeC6K8ehffOrncjGBvm5/.G",
 *                "verification_token": "4f34a988-f15d-442a-9a6f-5632fd80aa0a",
 *                "address": [],
 *                "created_at": "2020-01-28T18:15:14.155Z",
 *                "updated_at": "2020-01-28T18:17:42.417Z",
 *                "__v": 0,
 *                "otp": 836870,
 *                "otp_created": "2020-01-28T18:15:14.174Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e313b0cd21fe166d8c93243",
 *                "full_name": "Naseera haneef",
 *                "email": "psz.opportunity19@yahoo.com",
 *                "contact_number": "03360893070",
 *                "password": "$2b$10$UJ3SmHGf/9XJ7tJO2vX9DupMnvI4OszkIRMTd5Tabg84PNFyiiUUW",
 *                "verification_token": "2d9357a5-1090-4308-a527-d5459991289d",
 *                "address": [],
 *                "created_at": "2020-01-29T07:58:04.142Z",
 *                "updated_at": "2020-01-29T07:59:47.632Z",
 *                "__v": 0,
 *                "otp": 982170,
 *                "otp_created": "2020-01-29T07:58:04.158Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e32503fd21fe166d8c93274",
 *                "full_name": "Deepak Kumar",
 *                "email": "rathideepak8680@gmail.com",
 *                "contact_number": "03327359077",
 *                "password": "$2b$10$OayfKj8Z/VSo5.f96urPt.48COQJSdAo8Kckc.xa.xcYMIrJ5htEy",
 *                "verification_token": "b69141cc-b0f7-4773-8f43-ad1478c7453e",
 *                "address": [],
 *                "created_at": "2020-01-30T03:40:47.605Z",
 *                "updated_at": "2020-01-30T03:41:49.086Z",
 *                "__v": 0,
 *                "otp": 627393,
 *                "otp_created": "2020-01-30T03:40:47.617Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e35dd3dd21fe166d8c9330c",
 *                "full_name": "Govind",
 *                "email": "govindkumarrathi77@gmail.com",
 *                "contact_number": "03212081374",
 *                "password": "$2b$10$TL3RksbrywvEpACEegxPkOTplq8fF17RkgrLZGU6cBaYMtW/HwfE.",
 *                "verification_token": "03d9d327-7d6e-4ea6-8211-6454e8ef690b",
 *                "address": [],
 *                "created_at": "2020-02-01T20:19:09.094Z",
 *                "updated_at": "2020-02-01T20:19:37.693Z",
 *                "__v": 0,
 *                "otp": 871186,
 *                "otp_created": "2020-02-01T20:19:09.109Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e35e27ad21fe166d8c9330d",
 *                "full_name": "Arif Ansari",
 *                "email": "arifansari202a@gmail.com",
 *                "contact_number": "03452287744",
 *                "password": "$2b$10$33qqCplLb4LIEakH0o5op.6D3irGb/QzHbtloTUvxTJB.kBimXMAu",
 *                "verification_token": "8678f4af-5d62-4ccc-aa40-09b2d4700535",
 *                "address": [],
 *                "created_at": "2020-02-01T20:41:30.730Z",
 *                "updated_at": "2020-02-01T20:42:46.860Z",
 *                "__v": 0,
 *                "otp": 574646,
 *                "otp_created": "2020-02-01T20:41:30.747Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e388597d21fe166d8c93361",
 *                "email": "haseebmemonshop@gmail.com",
 *                "password": "$2b$10$EyHqgzaU/ZLopb4bZyMykuQzNvu/IdXKlTDi9nwILzJX8VTaSRB/W",
 *                "full_name": "haseeb",
 *                "contact_number": "03080296274",
 *                "verification_token": "a152f88c-8524-4d6c-86be-a03b263eb3b1",
 *                "address": [],
 *                "created_at": "2020-02-03T20:41:59.794Z",
 *                "updated_at": "2020-02-03T20:42:30.132Z",
 *                "__v": 0,
 *                "otp": 384062,
 *                "otp_created": "2020-02-03T20:41:59.804Z"
 *            },
 *            {
 *                "picture": null,
 *                "gmail_id": null,
 *                "facebook_id": null,
 *                "is_logout": false,
 *                "status": 3,
 *                "_id": "5e3f2518d21fe166d8c93458",
 *                "full_name": "Irfan Ahmed",
 *                "email": "ia370287@gmail.com",
 *                "contact_number": "03032003232",
 *                "password": "$2b$10$SYVwuuv2iPmFPkvUCfdCgecG0eIB/8omeRYc4AE6oUakfvHlZGOe2",
 *                "verification_token": "1c3d1ca4-747e-4aaa-90c8-047bad5e83fa",
 *                "address": [],
 *                "created_at": "2020-02-08T21:16:08.964Z",
 *                "updated_at": "2020-02-08T21:16:51.353Z",
 *                "__v": 0,
 *                "otp": 290496,
 *                "otp_created": "2020-02-08T21:16:08.983Z"
 *            }
 *        ],
 *        "totalCount": 90
 *    }
 *}
 *
 *
 * @apiError Unauthorized
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */
router.post('/', AdminCustomerController.addCustomer);

/**
 * @api {Get} /api/admin/customer Add a Customer.
 *
 * @apiName Add a Customer
 * @apiGroup Admin-Customer
 *
 * @apiParam (Body) {String} full_name Full Name of the Customer
 * @apiParam (Body) {String} email EmailId of the Customer
 * @apiParam (Body) {String} contact_number Contact Number of the Customer
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "customer": {
 *            "picture": null,
 *            "gmail_id": null,
 *            "facebook_id": null,
 *            "is_logout": false,
 *            "status": 1,
 *            "_id": "5e749890e8d0225d1a745dc9",
 *            "email": "vbgmail.com",
 *            "contact_number": "7474512451",
 *            "full_name": "Khushal",
 *            "address": [],
 *            "created_at": "2020-03-20T10:18:56.445Z",
 *            "updated_at": "2020-03-20T10:18:56.445Z",
 *            "__v": 0
 *        }
 *    }
 *}
 *
 * @apiError Email address already exists
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Email address already exists.",
 *    "error": {
 *        "validation": {
 *            "email": [
 *                "Email address already exists."
 *            ]
 *        }
 *    }
 *}
 */
router.post('/edit', AdminCustomerController.editCustomer);
/**
 * @api {Get} /api/admin/customer/edit Edit a Customer
 *
 * @apiName Edit a Customer
 * @apiGroup Admin-Customer
 *
 * @apiParam (Body) {String} _id Unique Id of the Customer
 * @apiParam (Body) {String} status Status of the Customer
 * @apiParam (Body) {String} email EmailId of the Customer
 * @apiParam (Body) {String} contact_number Contact Number of the Customer
 * @apiParam (Body) {String} full_name Full Name of the Customer
 * @apiParam (Body) {String} address Address of the Customer
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "customer": {
 *            "picture": null,
 *            "gmail_id": null,
 *            "facebook_id": null,
 *            "is_logout": false,
 *            "status": 1,
 *            "_id": "5e749890e8d0225d1a745dc9",
 *            "email": "vb@gmail.com",
 *            "contact_number": "7474512451",
 *            "full_name": "Khushal",
 *            "address": [],
 *            "created_at": "2020-03-20T10:18:56.445Z",
 *            "updated_at": "2020-03-20T10:35:29.249Z",
 *            "__v": 0
 *        }
 *    }
 *}
 */

router.post('/check', AdminCustomerController.checkCustomerExist);

/**
 * @api {Post} /api/admin/customer/check Check if a Customer Exists
 * @apiName Check if Customer Exists
 * @apiGroup Admin-Customer
 *
 * @apiParam (Body) {String} emailOrContactNumber Email or Contact Number whose existence has to be checked
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "customer": {
 *            "picture": "https://lh3.googleusercontent.com/a-/AOh14Gieu49oiaQdfOFRlkQT8sarTglujEYHmYyk8OAq=s96-c",
 *            "gmail_id": "112459883666387708857",
 *            "facebook_id": null,
 *            "is_logout": false,
 *            "status": 1,
 *            "_id": "5e54f2958d75b6697f983ed2",
 *            "email": "rohit.kumar@enukesoftware.com",
 *            "full_name": "Rohit Kumar",
 *            "address": [
 *                {
 *                    "coordinates": {
 *                        "latitude": 24.8607,
 *                        "longitude": 67.0011
 *                    },
 *                    "_id": "5e54fc05c995596ce45aa44f",
 *                    "alias": "home",
 *                    "city_id": "5d7603909b5f0f76ee4f68ad",
 *                    "full_name": "afd",
 *                    "email": "dfsds@gfg.fgd",
 *                    "contact_number": "1234567890",
 *                    "house_no": "dfd-7",
 *                    "locality": "fsdfd fgngf",
 *                    "landmark": "fdf gnf",
 *                    "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                    "what_3_words": "dsfdf"
 *                }
 *            ],
 *            "created_at": "2020-02-25T10:10:29.193Z",
 *            "updated_at": "2020-03-19T12:04:04.192Z",
 *            "__v": 0
 *        }
 *    }
 *}
 * @apiError Internal Server Error emailOrContactNumber is Required
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Email or contact number is not registered with Us",
 *    "error": {
 *        "validation": {
 *            "contact_number": [
 *                "Email or contact number is not registered with Us"
 *            ]
 *        }
 *    }
 *}

 */
router.get('/address', CustomerController.getAddress.bind(CustomerController));
/**
 * @api {Get} api/admin/customer/address Get Address of a User
 *
 * @apiName Get Address of a User
 * @apiGroup Admin-Customer
 *
 * @apiParam (Body) {String} user_id User Id of Customer
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "address": [
 *            {
 *                "_id": "5e54fc05c995596ce45aa44f",
 *                "alias": "home",
 *                "city_id": "5d7603909b5f0f76ee4f68ad",
 *                "full_name": "afd",
 *                "email": "dfsds@gfg.fgd",
 *                "contact_number": "1234567890",
 *                "house_no": "dfd-7",
 *                "locality": "fsdfd fgngf",
 *                "landmark": "fdf gnf",
 *                "coordinates": {
 *                    "latitude": 24.8607,
 *                    "longitude": 67.0011
 *                },
 *                "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                "what_3_words": "dsfdf",
 *                "city": {
 *                    "_id": "5d7603909b5f0f76ee4f68ad",
 *                    "areas": [
 *                        "5d7605099b5f0f76ee4f68ae",
 *                        "5d7605219b5f0f76ee4f68af",
 *                        "5dea5254d85c19035ebf1217",
 *                        "5dea52b5d85c19035ebf1218",
 *                        "5dea52bfd85c19035ebf1219",
 *                        "5dea52d0d85c19035ebf121a",
 *                        "5dea52e0d85c19035ebf121b",
 *                        "5dea52eed85c19035ebf121c",
 *                        "5df635134648a37afa44d108",
 *                        "5e05acca954bc84f45786dd2",
 *                        "5e05acf1954bc84f45786dd3",
 *                        "5e05acfb954bc84f45786dd4",
 *                        "5e05ad5e954bc84f45786dd5",
 *                        "5e262d10d21fe166d8c93049",
 *                        "5e262d43d21fe166d8c9304a",
 *                        "5e2ac47dd21fe166d8c930b3",
 *                        "5e469966d21fe166d8c9356f"
 *                    ],
 *                    "status": 1,
 *                    "name": "Karachi",
 *                    "created_at": "2019-09-09T07:47:28.591Z",
 *                    "updated_at": "2020-02-14T12:58:14.336Z",
 *                    "__v": 0
 *                }
 *            }
 *        ]
 *    }
 *}
 *
 * @apiError User Id is a required field
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "User Id is a required field",
 *    "error": {
 *        "validation": {
 *            "user_id": [
 *                "User Id is a required field"
 *            ]
 *        }
 *    }
 *}


 */
router.post('/address', CustomerController.addAddress.bind(CustomerController));
/**
 * @api {Post} /api/admin/customer/address Add an address
 * @apiName Add an address
 * @apiGroup Admin-Customer
 *
 * @apiParam (Body) {String} alias: Alias Address
 * @apiParam (Body) {String} city_id: Unique id of the City
 * @apiParam (Body) {String} full_name: Full Name of the address
 * @apiParam (Body) {String} contact_number: Contact Number
 * @apiParam (Body) {String} house_no: House Number
 * @apiParam (Body) {String} coordinates: Coordinates of the Address
 * @apiParam (Body) {Object} coordinates: An Object with fields "latitude" and "longitude"
 * @apiParam (Body) {String} gps_address: GPS Address
 * @apiParam (Body) {String} email: emailId of the address
 * @apiParam (Body) {String} locality: Locality
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "address": [
 *            {
 *                "_id": "5e74acd225e3026eeac5f1d9",
 *                "alias": "home",
 *                "city_id": "5d7603909b5f0f76ee4f68ad",
 *                "full_name": "Test Address",
 *                "contact_number": "9878854125",
 *                "house_no": "112",
 *                "coordinates": {
 *                    "latitude": 24.8607,
 *                    "longitude": 67.0011
 *                },
 *                "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                "email": "siju.samson@enukesoftware.com",
 *                "locality": "aa",
 *                "city": {
 *                    "_id": "5d7603909b5f0f76ee4f68ad",
 *                    "areas": [
 *                        "5d7605099b5f0f76ee4f68ae",
 *                        "5d7605219b5f0f76ee4f68af",
 *                        "5dea5254d85c19035ebf1217",
 *                        "5dea52b5d85c19035ebf1218",
 *                        "5dea52bfd85c19035ebf1219",
 *                        "5dea52d0d85c19035ebf121a",
 *                        "5dea52e0d85c19035ebf121b",
 *                        "5dea52eed85c19035ebf121c",
 *                        "5df635134648a37afa44d108",
 *                        "5e05acca954bc84f45786dd2",
 *                        "5e05acf1954bc84f45786dd3",
 *                        "5e05acfb954bc84f45786dd4",
 *                        "5e05ad5e954bc84f45786dd5",
 *                        "5e262d10d21fe166d8c93049",
 *                        "5e262d43d21fe166d8c9304a",
 *                        "5e2ac47dd21fe166d8c930b3",
 *                        "5e469966d21fe166d8c9356f"
 *                    ],
 *                    "status": 1,
 *                    "name": "Karachi",
 *                    "created_at": "2019-09-09T07:47:28.591Z",
 *                    "updated_at": "2020-02-14T12:58:14.336Z",
 *                    "__v": 0
 *                }
 *            }
 *        ]
 *    }
 *}

 * @apiError City Id is a required field
 * @apiErrorExample
 *{
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "City Id is a required field",
 *    "error": {
 *        "validation": {
 *            "city_id": [
 *                "City Id is a required field"
 *            ]
 *        }
 *    }
 *}
 */
router.put('/address/:id', CustomerController.updateAddress.bind(CustomerController));
/**
 * @api {Put} /api/admin/customer/address/:id Edit an address
 * @apiName Edit an address
 * @apiGroup Admin-Customer
 *
 * @apiParam (Body) {String} _id Unique Id of a String
 * @apiParam (Body) {String} alias Alias Name of the Address
 * @apiParam (Body) {String} city_id Unique City Id
 * @apiParam (Body) {String} full_name Full Name of the Address
 * @apiParam (Body) {String} email Email Id
 * @apiParam (Body) {String} contact_number Contact Number
 * @apiParam (Body) {String} house_no House Number
 * @apiParam (Body) {String} locality Locality
 * @apiParam (Body) {String} landmark Landmark of your address
 * @apiParam (Body) {String} gps_address GPS Address
 * @apiParam (Body) {String} what_3_words What 3 words
 * @apiParam (Body) {Object} city An Object with fields "_id" (Unique Id of the String), "areas" (Array of areas), "status"(Status of the City), "name" (Name of the City)
 *
 *
 *@apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "customer": {
 *            "picture": "https://lh3.googleusercontent.com/a-/AOh14Gieu49oiaQdfOFRlkQT8sarTglujEYHmYyk8OAq=s96-c",
 *            "gmail_id": "112459883666387708857",
 *            "facebook_id": null,
 *            "is_logout": false,
 *            "status": 1,
 *            "_id": "5e54f2958d75b6697f983ed2",
 *            "email": "rohit.kumar@enukesoftware.com",
 *            "full_name": "Rohit Kumar",
 *            "address": [
 *                {
 *                    "_id": "5e54fc05c995596ce45aa44f",
 *                    "alias": "home",
 *                    "city_id": "5d7603909b5f0f76ee4f68ad",
 *                    "full_name": "afd1",
 *                    "email": "dfsds@gfg.fgd",
 *                    "contact_number": "1234567890",
 *                    "house_no": "dfd-7",
 *                    "locality": "fsdfd fgngf",
 *                    "landmark": "fdf gnf",
 *                    "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                    "what_3_words": "dsfdf"
 *                }
 *            ],
 *            "created_at": "2020-02-25T10:10:29.193Z",
 *            "updated_at": "2020-03-23T06:06:55.118Z",
 *            "__v": 0
 *        }
 *    }
 *}
 *
 * @apiError Email Id is a required field
 * @apiErrorExample
 *
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
 *
 */
router.delete('/address/:id "?user_id":user_id ', CustomerController.deleteAddress.bind(CustomerController));
/**
 *
 * * @api {Put} /api/admin/customer/address/:id Delete an address
 * @apiName Delete an address
 * @apiGroup Admin-Customer
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "customer": {
 *            "picture": "https://lh3.googleusercontent.com/a-/AOh14Gieu49oiaQdfOFRlkQT8sarTglujEYHmYyk8OAq=s96-c",
 *            "gmail_id": "112459883666387708857",
 *            "facebook_id": null,
 *            "is_logout": false,
 *            "status": 1,
 *            "_id": "5e54f2958d75b6697f983ed2",
 *            "email": "rohit.kumar@enukesoftware.com",
 *            "full_name": "Rohit Kumar",
 *            "address": [
 *                {
 *                    "coordinates": {
 *                        "latitude": 24.8607,
 *                        "longitude": 67.0011
 *                    },
 *                    "_id": "5e7861ebe002aa193df88934",
 *                    "alias": "home",
 *                    "city_id": "5e731565f982bf2f87623efc",
 *                    "full_name": "Work",
 *                    "email": "rohit@gmail.com",
 *                    "contact_number": "7102102145",
 *                    "house_no": "123",
 *                    "locality": "fsdfd fgngf",
 *                    "landmark": "fdf gnf",
 *                    "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan"
 *                }
 *            ],
 *            "created_at": "2020-02-25T10:10:29.193Z",
 *            "updated_at": "2020-03-23T07:16:06.062Z",
 *            "__v": 0
 *        }
 *    }
 *}
 *
 * @apiError Not Found
 *
 * @apiErrorExample
 * not found
 */

module.exports = router;

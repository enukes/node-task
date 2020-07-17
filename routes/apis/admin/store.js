const express = require('express');

const router = express.Router();
const path = require('path').resolve;

const StoreController = require('../../../controllers/admin/store');

const Upload = require(path('common/multer'));

router.get('/', StoreController.getStores);
/**
 * @api {Get} /api/admin/store Get All Stores
 * @apiName Get All Stores
 * @apiGroup Admin-Store
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
 *        "stores": [
 *            {
 *                "timings": {
 *                    "open_time": "18:00",
 *                    "close_time": "23:55"
 *                },
 *                "owner": {
 *                    "email": "najam_81@hotmail.com",
 *                    "password": "$2b$10$VIG2tY227wzZI04LMoNXce8irRjnnzoiAUEPNwYlkjDtHip0Umhna",
 *                    "full_name": "Najam",
 *                    "contact_number": "03012999902"
 *                },
 *                "picture": "Karahi11.jpg",
 *                "has_express_delivery": false,
 *                "drivers": [
 *                    "5d9dda22d22f1e78b76728c3"
 *                ],
 *                "status": 2,
 *                "_id": "5e1382ce954bc84f4578715e",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.909252523573674,
 *                            "longitude": 67.13001967493653
 *                        },
 *                        "_id": "5e1382ce954bc84f4578715f",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5df635134648a37afa44d108",
 *                        "shop_no": "37",
 *                        "locality": "Karachi",
 *                        "gps_address": "",
 *                        "unique_link": "2bawbs"
 *                    }
 *                ],
 *                "name": "KN Restaurant ",
 *                "commission": 20,
 *                "created_at": "2020-01-06T18:56:14.138Z",
 *                "updated_at": "2020-02-27T10:38:33.036Z",
 *                "__v": 0,
 *                "delivery_charges": [
 *                    {
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "order_amount": 1000,
 *                        "charges": 50
 *                    }
 *                ],
 *                "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "10:00",
 *                    "close_time": "22:00"
 *                },
 *                "owner": {
 *                    "email": "mart360shop@gmail.com",
 *                    "password": "$2b$10$EQYJ8YwRi3YtsmiSV49rlOuFVHrss/a1bFVTX0KafVSZw1ri1WHWO",
 *                    "full_name": "Muhammad Abdullah",
 *                    "contact_number": "03218293207"
 *                },
 *                "picture": "download.png",
 *                "has_express_delivery": true,
 *                "drivers": [
 *                    "5d9dda22d22f1e78b76728c3"
 *                ],
 *                "status": 2,
 *                "_id": "5e2ac5fbd21fe166d8c930b4",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.8005095,
 *                            "longitude": 67.071469817
 *                        },
 *                        "_id": "5e2ac5fbd21fe166d8c930b5",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e2ac47dd21fe166d8c930b3",
 *                        "shop_no": "18C,Lane 9 off Khe-e-ittehad, DHA Phase 6",
 *                        "locality": "DHA Phase - 6",
 *                        "unique_link": "2lM7OD"
 *                    }
 *                ],
 *                "name": "MART 360",
 *                "commission": 0,
 *                "created_at": "2020-01-24T10:24:59.765Z",
 *                "updated_at": "2020-03-03T07:44:45.209Z",
 *                "__v": 0,
 *                "delivery_charges": [
 *                    {
 *                        "_id": "5e5e0aedaa5dc75f356b1288",
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "_id": "5e5e0aedaa5dc75f356b1289",
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "_id": "5e5e0aedaa5dc75f356b128a",
 *                        "order_amount": 1000,
 *                        "charges": 60
 *                    }
 *                ],
 *                "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "12:00",
 *                    "close_time": "21:00"
 *                },
 *                "owner": {
 *                    "email": "ham.hassansiddiqui@gmail.com",
 *                    "password": "$2b$10$yTWjJmy7DS2R6h8zyDr.6unwkX0teyzU50lT4pvoQo3NYTHZBKmQu",
 *                    "full_name": "Hammad Hassan",
 *                    "contact_number": "03333743790"
 *                },
 *                "storeInfo": {
 *                    "faq": "<p>dfdf</p><p><br></p><p>a</p><p>d</p><p>s</p>",
 *                    "termAndCondition": "<h2>Term and condition</h2><h2>Term and condition</h2><h2>Term and condition</h2><h2><br></h2>",
 *                    "privacyAndPolicy": "<p>Last Updated: May 25, 2019</p><p>Thank you for using aapkidokan.com services. We are dedicated to provide you the best online shopping and delivery experience possible. This Privacy Policy outlines how we respect and value the trust you put in aapkidokan.com. This Policy applies regardless of how you access the aapkidokan.com platform - whether this is via a mobile app or web interface.</p><p><br></p><p>INFORMATION WE COLLECT</p><p>When you use our website or mobile application, you may provide us with information about yourself. For instance, when you create an account with aapkidokan.com you provide us with personal information like your name, email address, and phone number. And if you place an order with aapkidokan.com, we collect information including your address and the details of your order.</p><p>If you log into the services through a third-party service, both we and that third-party may receive some information about you and your use of the service. For example, if you choose to log into the services with your Facebook account, we may receive information from Facebook, such as your name, e-mail address, and public profile information about your contacts. We may also offer social sharing tools that let you share actions on the services with other websites and vice versa. In those cases, the providers of those tools may receive information about you when you use those tools. You should check the privacy policies of these third party services and your settings there for more information.</p><p>We use your contact information to send you offers based on your previous orders and your interests when you use the aapkidokan.com services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p><p><br></p><p>USE OF YOUR INFORMATION</p><p><strong> We may use the information we collect for various purposes including:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Manage and improve the services aapkidokan.com provide to you</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Administer and operate your account</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Process your orders, receive payments for the orders</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Understand your shopping behavior to develop and improve our products and services and offer you customized content (including advertising and promotions), such as prominently displaying items you purchase frequently</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Provide customer service, respond to your communications and requests, and resolve complaint and disputes and contact you about your use of appkidokan.com services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">Inform you about online offers, products, services and important changes to the Website and our services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our Website.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.</li></ul><p>DISCLOSING YOUR PERSONAL INFORMATION</p><p><strong> Your personal information is safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul><p>COOKIES AND OTHER TRACKING TECHNOLOGIES</p><p>We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests.</p><p>Cookies are small text files that are sent by your computer when you access our services through a browser. We may use session cookies (which expire when you close your browser), persistent cookies (which expire when you choose to clear them from your browser), and other identifiers to collect information from your browser or device that helps us personalize your experience, measure, manage, and display advertising on the services or on other services; understand your usage of the Services and other services in order to serve customized ads and remember that you are logged into the Services. By using your browser settings, you may block cookies or adjust settings for notifications when a cookie is set.</p><p>Additionally, you may encounter \"cookies\" or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties</p><p><br></p><p>WHAT SECURITY MEASURES WE APPLY</p><p>We maintain commercially reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy, and to protect against unauthorized access or alteration to, disclosure, or destruction of your Information. We may, for example, use encryption technology to secure your Information by utilizing Secure Socket Layer (SSL) software. Only those authorized employees, contractors, and agents who need to know your Information in connection with the performance of their services are allowed to access this Information.</p><p>It is important for you to protect yourself against unauthorized access to your password and to your devices used to access our Services. You are responsible for keeping your password confidential. For example, ensure that you sign off when you have finished using a shared device.</p><p>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our Platform and any transmission is at your own risk.</p><p><br></p><p>CHANGES TO OUR POLICY</p><p>Our business changes constantly, and our Privacy Policy may therefore also need to change. We reserve the right to change the policy at any time. We will post the current version of this Privacy Policy on the Platform and each such change will be effective upon posting on the Platform or upon the date designated by us as the \"effective date\".</p><p>We may e-mail periodic reminders of our notices and conditions, but you should check our Platform frequently to see recent changes.</p><p>It is your obligation to regularly check the Privacy Policy. Your continued use of the Platform following any such change constitutes your agreement to this Privacy Policy as so modified</p><p><br></p><p>CONTACT INFORMATION</p><p>If you have any concerns, questions or comments about your Information or our Privacy Policy, please contact us&nbsp;with thorough description at following:</p>",
 *                    "contactInfo": "<h2 class=\"ql-align-center\"><strong style=\"color: rgb(255, 194, 102);\">Your personal information is</strong><strong> </strong></h2><p><br></p><p><strong>safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul>"
 *                },
 *                "picture": "12.png",
 *                "has_express_delivery": false,
 *                "drivers": [
 *                    "5d79f10ed22f1e78b7671d74",
 *                    "5dea892ed85c19035ebf1238"
 *                ],
 *                "status": 1,
 *                "_id": "5d7607c59b5f0f76ee4f68b0",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.9210435,
 *                            "longitude": 67.10559360000002
 *                        },
 *                        "_id": "5d7607c59b5f0f76ee4f68b1",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d10d21fe166d8c93049",
 *                        "shop_no": "NA-Class 190/219",
 *                        "locality": "Karachi",
 *                        "unique_link": "TKhr3"
 *                    }
 *                ],
 *                "name": "METRO",
 *                "commission": 3,
 *                "created_at": "2019-09-09T08:05:25.721Z",
 *                "updated_at": "2020-03-05T06:26:57.905Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsInR5cGUiOjIsImlhdCI6MTU4MzM4ODM4NX0.4uZ9x7xPDnYiRisnZJ7a0UPep8LRYYOD8KXxgi6J-7o",
 *                "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsImlhdCI6MTU3ODkxMTA4Mn0.k-Ek52UwRftyj8hywTqFUneWb1kW8_pfocE0ayMaFZI",
 *                "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                "delivery_charges": [
 *                    {
 *                        "_id": "5e5798dc89c6c4420e8f389a",
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "_id": "5e5798dc89c6c4420e8f389b",
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "_id": "5e5798dc89c6c4420e8f389c",
 *                        "order_amount": 1001,
 *                        "charges": 30
 *                    }
 *                ]
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "5:00",
 *                    "close_time": "23:00"
 *                },
 *                "owner": {
 *                    "email": "enuke@enuke.com",
 *                    "password": "$2b$10$KgSpGfY2JtUZouE9LNRGlue3ngzQRnYzAc7sF5fw4XBKVmrH/YfnO",
 *                    "full_name": "Enuke",
 *                    "contact_number": "9999988888"
 *                },
 *                "picture": "img store.jpg",
 *                "has_express_delivery": false,
 *                "drivers": [
 *                    "5d79f10ed22f1e78b7671d74"
 *                ],
 *                "status": 1,
 *                "_id": "5d778327d22f1e78b7671bd2",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "_id": "5d778327d22f1e78b7671bd3",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e469966d21fe166d8c9356f",
 *                        "shop_no": "20",
 *                        "locality": "test locality",
 *                        "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "Z1xaR9L"
 *                    }
 *                ],
 *                "name": "Enuke Test store",
 *                "commission": 20,
 *                "created_at": "2019-09-10T11:04:07.991Z",
 *                "updated_at": "2020-03-12T11:46:00.799Z",
 *                "__v": 0,
 *                "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsImlhdCI6MTU3ODkxMDg5NX0.PV2a49oVu-3BjT8SRb0isTYbP_AogywQDcYaEDtOk-w",
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzc4MzI3ZDIyZjFlNzhiNzY3MWJkMiIsInR5cGUiOjIsImlhdCI6MTU4NDAxMzU2MH0.6UOfFoSELTE40TAMfUz6uBoROUPwlvLb5gcJNkhmwzA",
 *                "delivery_charges": [
 *                    {
 *                        "_id": "5e5dc219f2b4181e2319f026",
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "_id": "5e5dc219f2b4181e2319f025",
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "_id": "5e5dc219f2b4181e2319f024",
 *                        "order_amount": 1000,
 *                        "charges": 30
 *                    }
 *                ],
 *                "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "11:00",
 *                    "close_time": "23:00"
 *                },
 *                "owner": {
 *                    "email": "nasirahmed110@gmail.com",
 *                    "password": "$2b$10$79BZrJpB2WeHAFRBN5.AFuHJPDse3vRUyBEa3yuYyB9TowG8GnGMm",
 *                    "full_name": "Dr. Farooq ",
 *                    "contact_number": "03218994366"
 *                },
 *                "picture": "Saveway Store logo.jpg",
 *                "has_express_delivery": true,
 *                "drivers": [
 *                    "5d9dda22d22f1e78b76728c3",
 *                    "5dea53edd85c19035ebf121d",
 *                    "5dea5445d85c19035ebf121e",
 *                    "5dea5479d85c19035ebf121f",
 *                    "5dea892ed85c19035ebf1238"
 *                ],
 *                "status": 1,
 *                "_id": "5d9eda647a30b1642ce9cb77",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "_id": "5d9eda647a30b1642ce9cb78",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d43d21fe166d8c9304a",
 *                        "shop_no": "37",
 *                        "locality": "Karachi",
 *                        "gps_address": "saveway",
 *                        "unique_link": "Zsm7Em"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "_id": "5dea5605d85c19035ebf1229",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan",
 *                        "unique_link": "53iRt"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "_id": "5dea5605d85c19035ebf1228",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5dea5254d85c19035ebf1217",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan",
 *                        "unique_link": "53iRx"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "_id": "5dea5605d85c19035ebf1227",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5dea52b5d85c19035ebf1218",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan",
 *                        "unique_link": "53iRy"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "longitude": 67.0802142,
 *                            "latitude": 24.9128145
 *                        },
 *                        "_id": "5dea5605d85c19035ebf1226",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5dea52bfd85c19035ebf1219",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan",
 *                        "unique_link": "53iRz"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "_id": "5dea5605d85c19035ebf1225",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5dea52d0d85c19035ebf121a",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan",
 *                        "unique_link": "22H1Aw"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "longitude": 67.0802142,
 *                            "latitude": 24.9128145
 *                        },
 *                        "_id": "5dea5605d85c19035ebf1224",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5dea52e0d85c19035ebf121b",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan",
 *                        "unique_link": "22H1Az"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "_id": "5dea5605d85c19035ebf1223",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5dea52eed85c19035ebf121c",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan",
 *                        "unique_link": "22H1AC"
 *                    }
 *                ],
 *                "name": "Saveway Super Store",
 *                "commission": 1,
 *                "created_at": "2019-10-10T07:14:44.355Z",
 *                "updated_at": "2020-02-24T12:32:19.381Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsInR5cGUiOjIsImlhdCI6MTU3ODk5Mjk1Mn0.Cwk6bEQ73cP-KAMUihbhTuXW4XEScnqEAsm9F8JsFtk",
 *                "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsImlhdCI6MTU3ODkxMTMzMX0.nMJVQksXhU572y57lNHSl8Bor3ldNtx1jHPtN0OZIBs",
 *                "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                "delivery_charges": [
 *                    {
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "order_amount": 1000,
 *                        "charges": 50
 *                    }
 *                ]
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "10:00",
 *                    "close_time": "20:00"
 *                },
 *                "owner": {
 *                    "email": "tanzeels@gmail.com",
 *                    "password": "$2b$10$ENYq6vaX5CnvzbqLTVp/WuMVOlh0hsgK37X2KNvsKHSC/oGesQAJK",
 *                    "full_name": "Tanzeel",
 *                    "contact_number": "03018492425"
 *                },
 *                "storeInfo": {
 *                    "faq": "<h5 class=\"ql-align-center\"><strong style=\"color: rgb(0, 102, 204);\">What is InstaShop?</strong></h5><p class=\"ql-align-center\"><br></p><p>The result? More time to enjoy doing the things you love with the people you love the most. InstaShop is available for free on iOS, Android and web.</p><h5><strong>How can I make an order on InstaShop for the first time?</strong></h5><p>First select your location. For your first order, fill-in your address and register your mobile number (your personal information is treated confidentially. For more information please read our privacy policy)</p><p>Feel free to choose a preferred supermarket, browse through a wide variety of products or search for a particular product and add it to your basket by tapping on it. The last step is to review your order, select the preferred payment method and place your order.</p><h5><strong>Does InstaShop provide any other services besides grocery delivery?</strong></h5><p>Although, grocery delivery is the primary service of InstaShop, it does provide other services like delivery of organic products and house cleaning. Moreover, InstaShop is always on the road to expand its services and fulfill the demands of their users.</p><h5><strong>What kind of products do you have?</strong></h5><p>With InstaShop you can order a wide range of products, from fresh fruits to birthday candles. Product lines include: fruits &amp; vegetables, dairy &amp; eggs, bakery, soft drinks &amp; juices, candies &amp; snacks, beauty &amp; hygiene products, meat &amp; fish, cans &amp; jars, baby care products, household care products, pasta and rice, coffee and tea, herbs, pet care and healthy and organic products.</p><h5><strong>Can’t find a product, what can I do?</strong></h5><p>Make sure there are no spelling mistakes in your search words. If the product is unavailable, there are two easy ways to suggest to us to add it. You can either visit the side menu and tap the suggest a product option or suggest the product via the no results search screen. We will do our best to include it in the application as of the earliest.</p>",
 *                    "termAndCondition": "<h1 class=\"ql-align-center\"><strong>Terms of service</strong></h1><p><br></p><p class=\"ql-align-justify\"><strong>Welcome to InstaShop!</strong></p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">Here you can find all the terms and conditions that we apply in order to perform our provided services at the highest level of our standards. If you’re here, that means you’re smart enough to read them carefully before using our services.</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">PLEASE READ THE FOLLOWING TERMS AND CONDITIONS CAREFULLY. THEY CONTAIN IMPORTANT INFORMATION ABOUT YOUR RIGHTS AND OBLIGATIONS, AS WELL AS LIMITATIONS AND EXCLUSIONS THAT APPLY TO YOUR PURCHASES.</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* GENERAL SCOPE</strong></p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">InstaShop provides software-based delivery services for goods such as food, beverages and other grocery products (collectively, Groceries). These terms (Terms of Service) apply when you use the InstaShop mobile applications or websites (collectively, Services).</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">By using the Services, you automatically agree to the Terms of Service.</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">InstaShop is a platform for facilitating the exchange of services between individuals (User) who are willing to order Groceries via our partners (Shops) that are willing to collect and deliver the ordered Groceries.</p>",
 *                    "privacyAndPolicy": "<h1 class=\"ql-align-center\"><strong>Privacy Policy</strong></h1><p><br></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong><u>** INSTASHOP PRIVACY POLICY</u></strong></p><p class=\"ql-align-justify\"><strong><u>------------------------------------------------------------</u></strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong><u>Last Updated: January 15, 2018</u></strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Thank you for using InstaShop! We are committed to providing you the best online shopping and delivery experience possible. This Privacy Policy explains what information we collect, how that information is used, under what circumstances we share information, and the choices you can make about that information. This Policy applies whether you access InstaShop through a browser, through a mobile app, or through some other method.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong><em><u>INFORMATION WE COLLECT</u></em></strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">* Information you provide to us or allow others to provide to us</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">At various points in the InstaShop experience, you may provide us with information about yourself. For example, when you create an account with InstaShop, you provide us with personal information like your name, email address, and zip code. And if you place an order with InstaShop, we collect information including your address, phone number and the details of your order.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">If you log into the InstaShop service through a third-party, we may receive some information about you through them. For example, if you choose to log into InstaShop with your Facebook account, we may receive information about your contacts. We may also offer social sharing tools (such as the Facebook Like button) that let you share actions on InstaShop with other sites and vice versa. You should check the privacy policies of these services and your settings there for more information.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">* Technical information about usage of InstaShop</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">When you use the InstaShop services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p>",
 *                    "contactInfo": "<p>Call to store: 021 3434345</p><p>Store Manager: Hammad Siddique</p>"
 *                },
 *                "picture": "cowwww.jpg",
 *                "has_express_delivery": false,
 *                "drivers": [],
 *                "status": 1,
 *                "_id": "5df637e34648a37afa44d109",
 *                "self_delivery": true,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.909252523573674,
 *                            "longitude": 67.13001967493653
 *                        },
 *                        "_id": "5df637e34648a37afa44d10a",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d10d21fe166d8c93049",
 *                        "shop_no": "37",
 *                        "locality": "Johar",
 *                        "gps_address": "32, Block 18 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "Z2jPHpd"
 *                    }
 *                ],
 *                "name": "Fresh Picked",
 *                "commission": 3,
 *                "created_at": "2019-12-15T13:40:51.978Z",
 *                "updated_at": "2020-02-27T14:18:26.087Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjYzN2UzNDY0OGEzN2FmYTQ0ZDEwOSIsInR5cGUiOjIsImlhdCI6MTU4MjgxMDY5NH0.5Ff7eEVx5wgWMSuogS3Gj8_pjlPoZ-lOK4GC_VQKvJo",
 *                "storeCategory": "5e4ff077d463092ecbc36e6e",
 *                "delivery_charges": [
 *                    {
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "order_amount": 1000,
 *                        "charges": 50
 *                    }
 *                ]
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "11:00",
 *                    "close_time": "23:00"
 *                },
 *                "owner": {
 *                    "email": "najam.sahto@gmail.com",
 *                    "password": "$2b$10$vmlPIwvdU95ThLbZGYFiqOzP9f8qYQPPWyjXHBMwnTYz1LX7bxgny",
 *                    "full_name": "Najam",
 *                    "contact_number": "03012999901"
 *                },
 *                "picture": "KNN STORE.jpg",
 *                "has_express_delivery": true,
 *                "drivers": [
 *                    "5d9dda22d22f1e78b76728c3",
 *                    "5dea5445d85c19035ebf121e",
 *                    "5dea892ed85c19035ebf1238",
 *                    "5dea53edd85c19035ebf121d",
 *                    "5e4e2a39d21fe166d8c94153",
 *                    "5d79f10ed22f1e78b7671d74"
 *                ],
 *                "status": 1,
 *                "_id": "5e05d5ff954bc84f45786dd6",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.9237623,
 *                            "longitude": 67.1405999
 *                        },
 *                        "_id": "5e05d5ff954bc84f45786dd7",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d10d21fe166d8c93049",
 *                        "shop_no": "Shop #101  Street 5, Block 10 Gulistan-e-Johar, Karachi, Karachi City, Sindh Pakistan",
 *                        "locality": "Kamran Chorangi",
 *                        "gps_address": "Street 5, Block 10 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "1K9RNH"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.901932227546816,
 *                            "longitude": 67.08738320527952
 *                        },
 *                        "_id": "5e26d1f5d21fe166d8c9305b",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d43d21fe166d8c9304a",
 *                        "shop_no": "Shop B 170, Block 18 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan",
 *                        "locality": "Itehad Park",
 *                        "gps_address": "Plot B 170, Block 18 Gulshan-e-Iqbal, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "2nq4ow"
 *                    }
 *                ],
 *                "name": "KNN General Store",
 *                "commission": 2,
 *                "created_at": "2019-12-27T09:59:27.130Z",
 *                "updated_at": "2020-03-04T06:04:30.327Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDVkNWZmOTU0YmM4NGY0NTc4NmRkNiIsInR5cGUiOjIsImlhdCI6MTU4MjYzNDIzMH0.SeYPoytSIORJLLNqCoIwEKtRe3rjpr9fr2f5cT6pvsQ",
 *                "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                "delivery_charges": [
 *                    {
 *                        "_id": "5e5f44eef0850329955609bb",
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "_id": "5e5f44eef0850329955609bc",
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "_id": "5e5f44eef0850329955609bd",
 *                        "order_amount": 1000,
 *                        "charges": 50
 *                    }
 *                ]
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "10:00",
 *                    "close_time": "22:00"
 *                },
 *                "owner": {
 *                    "email": "kamran.meo247@gmail.com",
 *                    "password": "$2a$10$Le1.Hc8ZRQFVAnuRnXu.8edg/qwW/WVIdL6geI.eeNZyoqxsJFYBu",
 *                    "full_name": "Kamran",
 *                    "contact_number": "03331232666"
 *                },
 *                "picture": "Amir Meat & Vegetable.jpg",
 *                "has_express_delivery": true,
 *                "drivers": [
 *                    "5dea5445d85c19035ebf121e",
 *                    "5d9dda22d22f1e78b76728c3",
 *                    "5dea53edd85c19035ebf121d",
 *                    "5dea892ed85c19035ebf1238",
 *                    "5e4e2a39d21fe166d8c94153"
 *                ],
 *                "status": 1,
 *                "_id": "5e2eca2ad21fe166d8c93159",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.91601032494211,
 *                            "longitude": 67.13109974669648
 *                        },
 *                        "_id": "5e2eca2ad21fe166d8c9315b",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d10d21fe166d8c93049",
 *                        "shop_no": "Shop# 18 Rado Tower Block 12 Gulistan e Johar, Karachi",
 *                        "locality": "Rado Bakery",
 *                        "gps_address": "Service Rd, Block 12 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "Z20IAoC"
 *                    },
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.91601032494211,
 *                            "longitude": 67.13110511111451
 *                        },
 *                        "_id": "5e2eca2ad21fe166d8c9315a",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d43d21fe166d8c9304a",
 *                        "shop_no": "Shop# 18 Rado Tower Block 12 Gulistan e Johar, Karachi",
 *                        "locality": "Rado Bakery",
 *                        "gps_address": "Service Rd, Block 12 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "Zw5WqT"
 *                    }
 *                ],
 *                "name": "Amir Vegetables & Meat Store",
 *                "commission": 7,
 *                "created_at": "2020-01-27T11:31:54.123Z",
 *                "updated_at": "2020-02-27T17:59:15.739Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmVjYTJhZDIxZmUxNjZkOGM5MzE1OSIsInR5cGUiOjIsImlhdCI6MTU4MjgyNjM1NX0.GCH_MYX_i7K2k9rLjqpeG8Lly2zOhLwXpM_Upcpdh7E",
 *                "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmVjYTJhZDIxZmUxNjZkOGM5MzE1OSIsImlhdCI6MTU4MTUyOTMyOH0.tRILHO1F1oc07qfxWylIy-JXV-Zd_vS_mgqKtEyBvqA",
 *                "delivery_charges": [
 *                    {
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "order_amount": 1000,
 *                        "charges": 50
 *                    }
 *                ]
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "11:00",
 *                    "close_time": "23:00"
 *                },
 *                "owner": {
 *                    "email": "faraz.marhaba@gmail.com",
 *                    "password": "$2a$10$rdhe4wMQ8ffq.O/9.mFG5uhiQLoaLzvAlRvKo4aRnZY7RMlk7xzN2",
 *                    "full_name": "Faraz ",
 *                    "contact_number": "03133078092"
 *                },
 *                "picture": "Logo Design 2.png",
 *                "has_express_delivery": true,
 *                "drivers": [
 *                    "5dea5445d85c19035ebf121e",
 *                    "5d9dda22d22f1e78b76728c3",
 *                    "5dea53edd85c19035ebf121d"
 *                ],
 *                "status": 1,
 *                "_id": "5e469bf4d21fe166d8c93570",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 25.0588778,
 *                            "longitude": 67.3108652
 *                        },
 *                        "_id": "5e469bf4d21fe166d8c93571",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e469966d21fe166d8c9356f",
 *                        "shop_no": "Store no. 02",
 *                        "locality": "Precent 10/10A Bahria Town ",
 *                        "gps_address": "marhaba supermarket",
 *                        "unique_link": "Z1Q5xV6"
 *                    }
 *                ],
 *                "name": "Marhaba Superstore",
 *                "commission": 2,
 *                "created_at": "2020-02-14T13:09:08.142Z",
 *                "updated_at": "2020-02-20T20:11:14.573Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDY5YmY0ZDIxZmUxNjZkOGM5MzU3MCIsInR5cGUiOjIsImlhdCI6MTU4MjE5MTMxNH0.SI6LJlIzYdM5Lz58xfuJhWyR6z3iO4ukY5hd3yKTiPk",
 *                "delivery_charges": [
 *                    {
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "order_amount": 800,
 *                        "charges": 50
 *                    },
 *                    {
 *                        "order_amount": 1000,
 *                        "charges": 50
 *                    }
 *                ]
 *            },
 *            {
 *                "timings": {
 *                    "open_time": "12:00",
 *                    "close_time": "14:00"
 *                },
 *                "owner": {
 *                    "full_name": "ere",
 *                    "email": "fd@dfd.df",
 *                    "contact_number": "1234567890",
 *                    "password": "$2b$10$AoH4Hv0wtqB2KRxE130LquUUExVKHDoOwZ5Du7fKl2GpKheN7afzO"
 *                },
 *                "storeInfo": "{\"faq\":\"<p>The easiest way to order your groceries and have them delivered to your doorstep in less than 60 or 120 minutes average time depending on your Location. Groceries delivered to you in just a few clicks! No need to go out to the supermarket or local store. Access our app from anywhere, select your trusted store, browse your products and click to buy! You can receive your delivery to any address, home, office or the park.</p><p>Aapkidokan records all orders history. Re-order with just a click.</p><p>We offer a convenient and seamless grocery shopping experience that frees you from the unavoidable chore of heading to the supermarket with all the challenges you may face there. You will have luxury time to enjoy doing the things you love the most with the people you love the most!The easiest way to order your groceries and have them delivered to your doorstep in less than 60 or 120 minutes average time depending on your Location. Groceries delivered to you in just a few clicks! No need to go out to the supermarket or local store. Access our app from anywhere, select your trusted store, browse your products and click to buy! You can receive your delivery to any address, home, office or the park.</p><p>Aapkidokan records all orders history. Re-order with just a click.</p><p>We offer a convenient and seamless grocery shopping experience that frees you from the unavoidable chore of heading to the supermarket with all the challenges you may face there. You will have luxury time to enjoy doing the things you love the most with the people you love the most!</p>\",\"termAndCondition\":\"<p>The easiest way to order your groceries and have them delivered to your doorstep in less than 60 or 120 minutes average time depending on your Location. Groceries delivered to you in just a few clicks! No need to go out to the supermarket or local store. Access our app from anywhere, select your trusted store, browse your products and click to buy! You can receive your delivery to any address, home, office or the park.</p><p>Aapkidokan records all orders history. Re-order with just a click.</p><p>We offer a convenient and seamless grocery shopping experience that frees you from the unavoidable chore of heading to the supermarket with all the challenges you may face there. You will have luxury time to enjoy doing the things you love the most with the people you love the most!</p>\",\"privacyAndPolicy\":\"<p>The easiest way to order your groceries and have them delivered to your doorstep in less than 60 or 120 minutes average time depending on your Location. Groceries delivered to you in just a few clicks! No need to go out to the supermarket or local store. Access our app from anywhere, select your trusted store, browse your products and click to buy! You can receive your delivery to any address, home, office or the park.</p><p>Aapkidokan records all orders history. Re-order with just a click.</p><p>We offer a convenient and seamless grocery shopping experience that frees you from the unavoidable chore of heading to the supermarket with all the challenges you may face there. You will have luxury time to enjoy doing the things you love the most with the people you love the most!</p>\",\"contactInfo\":\"<p>The easiest way to order your groceries and have them delivered to your doorstep in less than 60 or 120 minutes average time depending on your Location. Groceries delivered to you in just a few clicks! No need to go out to the supermarket or local store. Access our app from anywhere, select your trusted store, browse your products and click to buy! You can receive your delivery to any address, home, office or the park.</p><p>Aapkidokan records all orders history. Re-order with just a click.</p><p>We offer a convenient and seamless grocery shopping experience that frees you from the unavoidable chore of heading to the supermarket with all the challenges you may face there. You will have luxury time to enjoy doing the things you love the most with the people you love the most!</p>\"}",
 *                "picture": "djcbsdbfuisdgfhs.jpeg",
 *                "has_express_delivery": false,
 *                "drivers": [],
 *                "status": 1,
 *                "_id": "5e54ec353437456289561e05",
 *                "self_delivery": false,
 *                "address": [
 *                    {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "_id": "5e54ec353437456289561e06",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5e262d10d21fe166d8c93049",
 *                        "shop_no": "123",
 *                        "locality": "Sector 14",
 *                        "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                        "unique_link": "Zi0mKi"
 *                    }
 *                ],
 *                "storeCategory": "5e4fb5d3beee3369a6b32a0b",
 *                "name": "Proper Store",
 *                "commission": 123,
 *                "delivery_charges": [
 *                    {
 *                        "_id": "5e54ec353437456289561e09",
 *                        "order_amount": 500,
 *                        "charges": 100
 *                    },
 *                    {
 *                        "_id": "5e54ec353437456289561e08",
 *                        "order_amount": 800,
 *                        "charges": 43
 *                    },
 *                    {
 *                        "_id": "5e54ec353437456289561e07",
 *                        "order_amount": 1000,
 *                        "charges": 51
 *                    }
 *                ],
 *                "created_at": "2020-02-25T09:43:17.950Z",
 *                "updated_at": "2020-03-03T11:56:41.730Z",
 *                "__v": 0,
 *                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTRlYzM1MzQzNzQ1NjI4OTU2MWUwNSIsInR5cGUiOjIsImlhdCI6MTU4Mjc4OTEzOX0.QaO8L6S-NnyPAhjX3KD3lSZFCoC3Jgd9OdRMlHhupiQ",
 *                "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTRlYzM1MzQzNzQ1NjI4OTU2MWUwNSIsImlhdCI6MTU4Mjc4OTIyMX0.zaSv10ArklXufF3OUvN1vL2EKTuZHNJa9c121qYMquU"
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10,
 *            "totalItems": 13
 *        }
 *    }
 *}
 *
 * @apiError ValidationError 401
 *
 * @apiErrorExample
 * {
    "success": false,
    "error": 401
}
 */
router.post('/', Upload.any(), StoreController.addStore);
/**
 * @api {post} /api/admin/store Add Store
 * @apiName Add a Store
 * @apiGroup Admin-Store
 *
 * @apiParam (Body) {Object} timings An Object with fields "open_time" (Open time of Store) "close_time" (Close Time of Store).
 * @apiParam (Body) {Object} owner An Object with fields "full_name" (Full Name of Owner) "email" (Email of Owner) "contact_number" (Contact Number of Owner) "password" (Password) "confirm_password" (Confirm Password).
 * @apiParam (Body) {String} status: Status of Store
 * @apiParam (Body) {Boolean} self_delivery
 * @apiParam (Body) {Boolean} has_express_delivery
 * @apiParam (Body) {Array[]} address: An Array of Objects with fields "city_id" (City Id) "area_id" (Area Id) "coordinates" {"latitude" and "longitude"}, "shop_no" (Shop Number), "locality" (Locality), "gps_address": (GPS Address),
 * @apiParam (Body) {String} storeCategory: Store Category Id,
 * @apiParam (Body) {Array} delivery_charges : An array of Objects with fields "order_amount" (Order Amount), "charges" (Charges),
 * @apiParam (Body) {String} name: Store Name,
 * @apiParam (Body) {Number} commission
 * @apiParam (Body) {Array} drivers,
 * @apiParam (Body) {File} store_picture
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 Ok
 *  {
 *  "picture": "Screenshot from 2020-02-20 16-27-43.png",
 *    "has_express_delivery": true,
 *      "drivers": [],
 *        "status": 1,
 *          "_id": "5e71fa41397c6558cd4813b4",
 *            "timings": {
 *              "open_time": "10:00",
 *                "close_time": "22:00"
 *            },
 *              "owner": {
 *                "full_name": "Enuke",
 *                  "email": "enuke@software.com",
 *                    "contact_number": "7896541414",
 *                      "password": "$2b$10$TMghiMMoxBAERAI68XmMy.j0oz11eWZUqq0K52TY48qLvHKkIkMRy"
 *              },
 *                "self_delivery": true,
 *                  "address": [
 *                    {
 *                      "_id": "5e71fa41397c6558cd4813b5",
 *                      "city_id": "5d7603909b5f0f76ee4f68ad",
 *                      "area_id": "5e262d43d21fe166d8c9304a",
 *                      "coordinates": {
 *                        "latitude": 24.8607,
 *                        "longitude": 67.0011
 *                      },
 *                      "shop_no": "112",
 *                      "locality": "112",
 *                      "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                      "unique_link": "Zm3EbS"
 *                    }
 *                  ],
 *                    "storeCategory": "5e4fb5d3beee3369a6b32a0b",
 *                      "delivery_charges": [
 *                        {
 *                          "_id": "5e71fa41397c6558cd4813b6",
 *                          "order_amount": 500,
 *                          "charges": 100
 *                        },
 *                        {
 *                          "_id": "5e71fa41397c6558cd4813b7",
 *                          "order_amount": 800,
 *                          "charges": 50
 *                        },
 *                        {
 *                          "_id": "5e71fa41397c6558cd4813b8",
 *                          "order_amount": 1000,
 *                          "charges": 50
 *                        }
 *                      ],
 *                        "name": "Test Store",
 *                          "commission": 1,
 *                            "created_at": "2020-03-18T10:38:57.197Z",
 *                              "updated_at": "2020-03-18T10:38:57.197Z",
 *                                "__v": 0
 *}
 *  *
 *  * @apiError Error Response
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Id is invalid",
 *    "error": {
 *        "validation": {
 *            "storeCategoryId": [
 *                "Id is invalid"
 *            ]
 *        }
 *    }
 *}
 *
 */

router.get('/stores', StoreController.getStoresForCategoryManagement);
router.put('/:id', Upload.any(), StoreController.updateStore);
/**
 * @api {Put} api/admin/store/:id Update a Store
 * @apiName Update a Store
 *
 * @apiGroup Admin-Store
 *
 * @apiParam (Body) {Array} drivers: Array of Driver Id
 * @apiParam (Body) {Object} timings: An Object with fields "open_time" (Open Time of Store),"close_time" (Closing Time of Store).
 * @apiParam (Body) {Object} owner: An Object with fields "email" (Email id of owner),"password" (Password of Owner), "full_name" (Full Name of Owner), "contact_number" (Contact Number of Owner).
 *@apiParam (Body) {Boolean} has_express_delivery
 *@apiParam (Body) {Number} status
 *@apiParam (Body) {String}_id : Store Id
 *@apiParam (Body) {Boolean} self_delivery
 *@apiParam (Body) {Array} address:An Array with fields "coordinates" (An Object with fields "latitude", "longitude"),  "_id" (Address Id), "city_id" (City ID), "area_id"(Area Id),"shop_no" (Shop Number), "locality" (Locality of Store), "unique_link": (Unique Link)
 *@apiParam (Body) {String} name
 *@apiParam (Body) {Number}commission
 *@apiParam (Body){Array} delivery_charges: An array with fields with "_id","order_amount" (Order Amount),"charges" (Charges)}
 *@apiParam (Body) {string} storeCategory: Store Category Id
 *
 *
 *
 *@apiSuccessExample Success-Response
 *HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "store": {
 *            "timings": {
 *                "open_time": "10:00",
 *                "close_time": "22:30"
 *            },
 *            "owner": {
 *                "email": "mart360shop@gmail.com",
 *                "password": "$2b$10$EQYJ8YwRi3YtsmiSV49rlOuFVHrss/a1bFVTX0KafVSZw1ri1WHWO",
 *                "full_name": "Muhammad Abdullah",
 *                "contact_number": "03218293207"
 *            },
 *            "picture": "Screenshot from 2020-01-27 12-55-21.png",
 *            "has_express_delivery": true,
 *            "drivers": [
 *                "5d9dda22d22f1e78b76728c3"
 *            ],
 *            "status": 2,
 *            "_id": "5e2ac5fbd21fe166d8c930b4",
 *            "self_delivery": false,
 *            "address": [
 *                {
 *                    "coordinates": {
 *                        "latitude": 24.8005095,
 *                        "longitude": 67.071469817
 *                    },
 *                    "_id": "5e2ac5fbd21fe166d8c930b5",
 *                    "city_id": "5d7603909b5f0f76ee4f68ad",
 *                    "area_id": "5e2ac47dd21fe166d8c930b3",
 *                    "shop_no": "18C,Lane 9 off Khe-e-ittehad, DHA Phase 6",
 *                    "locality": "DHA Phase - 6",
 *                    "unique_link": "2lM7OD"
 *                }
 *            ],
 *            "name": "MART 360",
 *            "commission": 0,
 *            "created_at": "2020-01-24T10:24:59.765Z",
 *            "updated_at": "2020-03-18T12:39:16.709Z",
 *            "__v": 0,
 *            "delivery_charges": [
 *                {
 *                    "_id": "5e5e0aedaa5dc75f356b1288",
 *                    "order_amount": 500,
 *                    "charges": 100
 *                },
 *                {
 *                    "_id": "5e5e0aedaa5dc75f356b1289",
 *                    "order_amount": 800,
 *                    "charges": 50
 *                },
 *                {
 *                    "_id": "5e5e0aedaa5dc75f356b128a",
 *                    "order_amount": 1000,
 *                    "charges": 60
 *                }
 *            ],
 *            "storeCategory": "5e4fb5d3beee3369a6b32a0b"
 *        }
 *    }
 *}
 * @apiError ValidationError 500
 *
 *@apiErrorExample
 *
 *{
 *    "success": false,
 *    "singleStringMessage": "Cannot read property 'filename' of undefined",
 *    "error": {}
 *}
 */

router.put('/sku-token/:id', StoreController.updateStoreSkuToken);
router.delete('/sku-token/:id', StoreController.deleteStoreSkuToken);

router.get('/:id/drivers', StoreController.getActiveStoreDrivers);

router.get('/:id/slots/today', StoreController.getDaySlot);
router.delete('/:id', StoreController.deleteStore);
/**
 * @api {Delete} /api/admin/store/:id Delete a Store
 * @apiName Delete Store
 *
 * @apiGroup Admin-Store
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "store": {
 *            "n": 1,
 *            "opTime": {
 *                "ts": "6805535290086653953",
 *                "t": 64
 *            },
 *            "electionId": "7fffffff0000000000000040",
 *            "ok": 1,
 *            "$clusterTime": {
 *                "clusterTime": "6805535290086653953",
 *                "signature": {
 *                    "hash": "9wW8CkpYM2WzrB8oa/HNLBMm0d4=",
 *                    "keyId": "6753601258507993089"
 *                }
 *            },
 *            "operationTime": "6805535290086653953",
 *            "deletedCount": 1
 *        }
 *    }
 *}

 *@apiError 422 UNPROCESSABLE_ENTITY
 *@apiErrorExample Id is invalid
 *
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Id is invalid",
 *    "error": {
 *        "validation": {
 *            "id": [
 *                "Id is invalid"
 *            ]
 *        }
 *    }
 *}

 */

router.put('/change-password/:id', StoreController.changeStorePassword);
/**
 * @api {Put} /api/admin/store/change-password/:id Change Store Password
 * @apiName Change Password of Store
 * @apiGroup Admin-Store
 *
 * @apiParam (Body) {String} password Change Store Password
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "store": {
 *            "timings": {
 *                "open_time": "10:00",
 *                "close_time": "20:00"
 *            },
 *            "owner": {
 *                "email": "tanzeels@gmail.com",
 *                "password": "$2b$10$ENfeK7ifcqH/.W91fBVK2uoCjMUYkPvsAByboYtT3NoRhnWgGToZW",
 *                "full_name": "Tanzeel",
 *                "contact_number": "03018492425"
 *            },
 *            "storeInfo": {
 *                "faq": "<h5 class=\"ql-align-center\"><strong style=\"color: rgb(0, 102, 204);\">What is InstaShop?</strong></h5><p class=\"ql-align-center\"><br></p><p>The result? More time to enjoy doing the things you love with the people you love the most. InstaShop is available for free on iOS, Android and web.</p><h5><strong>How can I make an order on InstaShop for the first time?</strong></h5><p>First select your location. For your first order, fill-in your address and register your mobile number (your personal information is treated confidentially. For more information please read our privacy policy)</p><p>Feel free to choose a preferred supermarket, browse through a wide variety of products or search for a particular product and add it to your basket by tapping on it. The last step is to review your order, select the preferred payment method and place your order.</p><h5><strong>Does InstaShop provide any other services besides grocery delivery?</strong></h5><p>Although, grocery delivery is the primary service of InstaShop, it does provide other services like delivery of organic products and house cleaning. Moreover, InstaShop is always on the road to expand its services and fulfill the demands of their users.</p><h5><strong>What kind of products do you have?</strong></h5><p>With InstaShop you can order a wide range of products, from fresh fruits to birthday candles. Product lines include: fruits &amp; vegetables, dairy &amp; eggs, bakery, soft drinks &amp; juices, candies &amp; snacks, beauty &amp; hygiene products, meat &amp; fish, cans &amp; jars, baby care products, household care products, pasta and rice, coffee and tea, herbs, pet care and healthy and organic products.</p><h5><strong>Can’t find a product, what can I do?</strong></h5><p>Make sure there are no spelling mistakes in your search words. If the product is unavailable, there are two easy ways to suggest to us to add it. You can either visit the side menu and tap the suggest a product option or suggest the product via the no results search screen. We will do our best to include it in the application as of the earliest.</p>",
 *                "termAndCondition": "<h1 class=\"ql-align-center\"><strong>Terms of service</strong></h1><p><br></p><p class=\"ql-align-justify\"><strong>Welcome to InstaShop!</strong></p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">Here you can find all the terms and conditions that we apply in order to perform our provided services at the highest level of our standards. If you’re here, that means you’re smart enough to read them carefully before using our services.</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">PLEASE READ THE FOLLOWING TERMS AND CONDITIONS CAREFULLY. THEY CONTAIN IMPORTANT INFORMATION ABOUT YOUR RIGHTS AND OBLIGATIONS, AS WELL AS LIMITATIONS AND EXCLUSIONS THAT APPLY TO YOUR PURCHASES.</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* GENERAL SCOPE</strong></p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">InstaShop provides software-based delivery services for goods such as food, beverages and other grocery products (collectively, Groceries). These terms (Terms of Service) apply when you use the InstaShop mobile applications or websites (collectively, Services).</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">By using the Services, you automatically agree to the Terms of Service.</p><p class=\"ql-align-justify\">&nbsp;</p><p class=\"ql-align-justify\">InstaShop is a platform for facilitating the exchange of services between individuals (User) who are willing to order Groceries via our partners (Shops) that are willing to collect and deliver the ordered Groceries.</p>",
 *                "privacyAndPolicy": "<h1 class=\"ql-align-center\"><strong>Privacy Policy</strong></h1><p><br></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong><u>** INSTASHOP PRIVACY POLICY</u></strong></p><p class=\"ql-align-justify\"><strong><u>------------------------------------------------------------</u></strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong><u>Last Updated: January 15, 2018</u></strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Thank you for using InstaShop! We are committed to providing you the best online shopping and delivery experience possible. This Privacy Policy explains what information we collect, how that information is used, under what circumstances we share information, and the choices you can make about that information. This Policy applies whether you access InstaShop through a browser, through a mobile app, or through some other method.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong><em><u>INFORMATION WE COLLECT</u></em></strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">* Information you provide to us or allow others to provide to us</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">At various points in the InstaShop experience, you may provide us with information about yourself. For example, when you create an account with InstaShop, you provide us with personal information like your name, email address, and zip code. And if you place an order with InstaShop, we collect information including your address, phone number and the details of your order.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">If you log into the InstaShop service through a third-party, we may receive some information about you through them. For example, if you choose to log into InstaShop with your Facebook account, we may receive information about your contacts. We may also offer social sharing tools (such as the Facebook Like button) that let you share actions on InstaShop with other sites and vice versa. You should check the privacy policies of these services and your settings there for more information.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">* Technical information about usage of InstaShop</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">When you use the InstaShop services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p>",
 *                "contactInfo": "<p>Call to store: 021 3434345</p><p>Store Manager: Hammad Siddique</p>"
 *            },
 *            "picture": "cowwww.jpg",
 *            "has_express_delivery": false,
 *            "drivers": [],
 *            "status": 1,
 *            "_id": "5df637e34648a37afa44d109",
 *            "self_delivery": true,
 *            "address": [
 *                {
 *                    "coordinates": {
 *                        "latitude": 24.909252523573674,
 *                        "longitude": 67.13001967493653
 *                    },
 *                    "_id": "5df637e34648a37afa44d10a",
 *                    "city_id": "5d7603909b5f0f76ee4f68ad",
 *                    "area_id": "5e262d10d21fe166d8c93049",
 *                    "shop_no": "37",
 *                    "locality": "Johar",
 *                    "gps_address": "32, Block 18 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                    "unique_link": "Z2jPHpd"
 *                }
 *            ],
 *            "name": "Fresh Picked",
 *            "commission": 3,
 *            "created_at": "2019-12-15T13:40:51.978Z",
 *            "updated_at": "2020-03-18T13:21:11.735Z",
 *            "__v": 0,
 *            "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjYzN2UzNDY0OGEzN2FmYTQ0ZDEwOSIsInR5cGUiOjIsImlhdCI6MTU4MjgxMDY5NH0.5Ff7eEVx5wgWMSuogS3Gj8_pjlPoZ-lOK4GC_VQKvJo",
 *            "storeCategory": "5e4ff077d463092ecbc36e6e",
 *            "delivery_charges": [
 *                {
 *                    "order_amount": 500,
 *                    "charges": 100
 *                },
 *                {
 *                    "order_amount": 800,
 *                    "charges": 50
 *                },
 *                {
 *                    "order_amount": 1000,
 *                    "charges": 50
 *                }
 *            ]
 *        }
 *    }
 *}
 *
 * @apiError Internal Server Error 500
 *
 * @apiErrorExample Password is a required field.
 * {
 *    "success": false,
 *    "code": {
 *        "code": 422,
 *        "name": "UNPROCESSABLE_ENTITY",
 *        "description": "Validation failed. The request and the format is valid, however the request was unable to process. For instance when sent data does not pass validation tests."
 *    },
 *    "singleStringMessage": "Password is a required field.",
 *    "error": {
 *        "validation": {
 *            "password": [
 *                "Password is a required field."
 *            ]
 *        }
 *    }
 *}
 */

router.get('/links', StoreController.generateAllStoreLink);

module.exports = router;

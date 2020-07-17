const router = require('express').Router();
const OrderController = require('../../../controllers/admin/order');
const CustomerOrderController = require('../../../controllers/customer/order');

router.get('/', OrderController.getOrders);
/**
 * @api {Get} /api/admin/order Get Order List
 * @apiName Get Order List
 * @apiGroup Admin-Order
 *
 *
 * @apiParam (Query Params) {String} (Optional) pageNo Page Number
 * @apiParam (Query Params) {String} (Optional) perPage: Items to be displayed per Page.
 * @apiParam (Query Params) {String} (Optional)search: Coupon to be searched.
 * @apiParam (Query Params) {String} (Optional) sortType To be Sorted.
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "order": [
 *            {
 *                "_id": "5d886976d22f1e78b767249f",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9210435,
 *                            "longitude": 67.10559360000002
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "NA-Class 190/219",
 *                        "locality": "Karachi"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 28.4649909,
 *                            "longitude": 77.0318711
 *                        },
 *                        "full_name": "Taimoor Lang",
 *                        "email": "taimoor.lang@aapkidokan.com",
 *                        "contact_number": "1234123123",
 *                        "house_no": "F-16",
 *                        "locality": "Gajnavi, Salar Masood",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "alias": "home",
 *                        "gps_address": "Gurgaon bus stand, Unnamed Road, Adarsh Nagar, Sector 12, Gurugram, Haryana, India",
 *                        "landmark": "Md Gauri is ghar",
 *                        "what_3_words": "",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 150,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5d7e8a6cd22f1e78b7671fad",
 *                "deliver_start_time": "2019-09-23T07:00:00.000Z",
 *                "deliver_end_time": "2019-09-23T09:00:00.000Z",
 *                "customer_id": "5d79f86fd22f1e78b7671d84",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "00200056.jpg"
 *                        ],
 *                        "_id": "5d886976d22f1e78b76724a0",
 *                        "product_id": "5d788f0ed22f1e78b7671c3a",
 *                        "size": "92.1gm",
 *                        "price": 670,
 *                        "count": 2,
 *                        "name": "Doritos Spicy Sweet Chili"
 *                    }
 *                ],
 *                "total_amount": 1400,
 *                "taxes": [],
 *                "total_amount_after_tax": 1400,
 *                "commission_percentage": 2,
 *                "admin_commission_amount": 28,
 *                "store_payout_amount": 1372,
 *                "order_id": "eafeffd",
 *                "created_at": "2019-09-23T06:43:02.053Z",
 *                "updated_at": "2020-03-18T10:28:52.455Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d7607c59b5f0f76ee4f68b0",
 *                    "picture": "12.png",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "12:00",
 *                        "close_time": "21:00"
 *                    },
 *                    "owner": {
 *                        "email": "ham.hassansiddiqui@gmail.com",
 *                        "password": "$2b$10$yTWjJmy7DS2R6h8zyDr.6unwkX0teyzU50lT4pvoQo3NYTHZBKmQu",
 *                        "full_name": "Hammad Hassan",
 *                        "contact_number": "03333743790"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d7607c59b5f0f76ee4f68b1",
 *                            "coordinates": {
 *                                "latitude": 24.9210435,
 *                                "longitude": 67.10559360000002
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d10d21fe166d8c93049",
 *                            "shop_no": "NA-Class 190/219",
 *                            "locality": "Karachi",
 *                            "unique_link": "TKhr3"
 *                        }
 *                    ],
 *                    "name": "METRO",
 *                    "commission": 3,
 *                    "created_at": "2019-09-09T08:05:25.721Z",
 *                    "updated_at": "2020-03-05T06:26:57.905Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsInR5cGUiOjIsImlhdCI6MTU4MzM4ODM4NX0.4uZ9x7xPDnYiRisnZJ7a0UPep8LRYYOD8KXxgi6J-7o",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsImlhdCI6MTU3ODkxMTA4Mn0.k-Ek52UwRftyj8hywTqFUneWb1kW8_pfocE0ayMaFZI",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389a",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389b",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389c",
 *                            "order_amount": 1001,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeInfo": {
 *                        "faq": "<p>dfdf</p><p><br></p><p>a</p><p>d</p><p>s</p>",
 *                        "termAndCondition": "<h2>Term and condition</h2><h2>Term and condition</h2><h2>Term and condition</h2><h2><br></h2>",
 *                        "privacyAndPolicy": "<p>Last Updated: May 25, 2019</p><p>Thank you for using aapkidokan.com services. We are dedicated to provide you the best online shopping and delivery experience possible. This Privacy Policy outlines how we respect and value the trust you put in aapkidokan.com. This Policy applies regardless of how you access the aapkidokan.com platform - whether this is via a mobile app or web interface.</p><p><br></p><p>INFORMATION WE COLLECT</p><p>When you use our website or mobile application, you may provide us with information about yourself. For instance, when you create an account with aapkidokan.com you provide us with personal information like your name, email address, and phone number. And if you place an order with aapkidokan.com, we collect information including your address and the details of your order.</p><p>If you log into the services through a third-party service, both we and that third-party may receive some information about you and your use of the service. For example, if you choose to log into the services with your Facebook account, we may receive information from Facebook, such as your name, e-mail address, and public profile information about your contacts. We may also offer social sharing tools that let you share actions on the services with other websites and vice versa. In those cases, the providers of those tools may receive information about you when you use those tools. You should check the privacy policies of these third party services and your settings there for more information.</p><p>We use your contact information to send you offers based on your previous orders and your interests when you use the aapkidokan.com services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p><p><br></p><p>USE OF YOUR INFORMATION</p><p><strong> We may use the information we collect for various purposes including:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Manage and improve the services aapkidokan.com provide to you</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Administer and operate your account</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Process your orders, receive payments for the orders</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Understand your shopping behavior to develop and improve our products and services and offer you customized content (including advertising and promotions), such as prominently displaying items you purchase frequently</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Provide customer service, respond to your communications and requests, and resolve complaint and disputes and contact you about your use of appkidokan.com services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">Inform you about online offers, products, services and important changes to the Website and our services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our Website.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.</li></ul><p>DISCLOSING YOUR PERSONAL INFORMATION</p><p><strong> Your personal information is safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul><p>COOKIES AND OTHER TRACKING TECHNOLOGIES</p><p>We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests.</p><p>Cookies are small text files that are sent by your computer when you access our services through a browser. We may use session cookies (which expire when you close your browser), persistent cookies (which expire when you choose to clear them from your browser), and other identifiers to collect information from your browser or device that helps us personalize your experience, measure, manage, and display advertising on the services or on other services; understand your usage of the Services and other services in order to serve customized ads and remember that you are logged into the Services. By using your browser settings, you may block cookies or adjust settings for notifications when a cookie is set.</p><p>Additionally, you may encounter \"cookies\" or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties</p><p><br></p><p>WHAT SECURITY MEASURES WE APPLY</p><p>We maintain commercially reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy, and to protect against unauthorized access or alteration to, disclosure, or destruction of your Information. We may, for example, use encryption technology to secure your Information by utilizing Secure Socket Layer (SSL) software. Only those authorized employees, contractors, and agents who need to know your Information in connection with the performance of their services are allowed to access this Information.</p><p>It is important for you to protect yourself against unauthorized access to your password and to your devices used to access our Services. You are responsible for keeping your password confidential. For example, ensure that you sign off when you have finished using a shared device.</p><p>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our Platform and any transmission is at your own risk.</p><p><br></p><p>CHANGES TO OUR POLICY</p><p>Our business changes constantly, and our Privacy Policy may therefore also need to change. We reserve the right to change the policy at any time. We will post the current version of this Privacy Policy on the Platform and each such change will be effective upon posting on the Platform or upon the date designated by us as the \"effective date\".</p><p>We may e-mail periodic reminders of our notices and conditions, but you should check our Platform frequently to see recent changes.</p><p>It is your obligation to regularly check the Privacy Policy. Your continued use of the Platform following any such change constitutes your agreement to this Privacy Policy as so modified</p><p><br></p><p>CONTACT INFORMATION</p><p>If you have any concerns, questions or comments about your Information or our Privacy Policy, please contact us&nbsp;with thorough description at following:</p>",
 *                        "contactInfo": "<h2 class=\"ql-align-center\"><strong style=\"color: rgb(255, 194, 102);\">Your personal information is</strong><strong> </strong></h2><p><br></p><p><strong>safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul>"
 *                    }
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-19T12:14:06.318Z",
 *                    "__v": 0,
 *                    "fcm_token": "fui46PA2ZTk:APA91bGDNaCm_0ZeT1Lq89xwx6PQDdUaHE4U5dSz22vk6ReWUx2HcvZv2P28M7079GA5Ud0OJUuk-CkPfCh2l8aJ0A2s5RTZ2CeaGUNlbbBTI5x8GNBmj07obxfU3LdeMiYx3L1bHg1u",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDYyMDA0Nn0.ZRfBIdtxbgWyfPMbQHM4ouJEfs88VEz1YY2S2zXsZDQ",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5da2dbbb7a30b1642ce9cc31",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9210435,
 *                            "longitude": 67.10559360000002
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "NA-Class 190/219",
 *                        "locality": "Karachi"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.908779121311746,
 *                            "longitude": 67.13000267744064
 *                        },
 *                        "full_name": "Tanzeel",
 *                        "email": "tanzeels@gmail.com",
 *                        "contact_number": "03018492428",
 *                        "house_no": "B-602/ bait ul Hina Apartments ",
 *                        "locality": "gulshan e jauhar, block 18",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "alias": "home",
 *                        "gps_address": "32, Block 18 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "landmark": "near Rabia city",
 *                        "what_3_words": "What3Words",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 5,
 *                "is_express_delivery": true,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 150,
 *                "driver_assigned": false,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "deliver_start_time": "2019-10-13T08:09:31.383Z",
 *                "deliver_end_time": "2019-10-13T10:09:31.383Z",
 *                "customer_id": "5da2dab97a30b1642ce9cc2f",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "01500024.jpg"
 *                        ],
 *                        "_id": "5da2dbbb7a30b1642ce9cc32",
 *                        "product_id": "5d8a097cd22f1e78b7672639",
 *                        "size": "1 Pack X 52 Pcs",
 *                        "price": 2289,
 *                        "count": 1,
 *                        "name": "Pampers - Pants Junior (Size-5) "
 *                    }
 *                ],
 *                "total_amount": 2289,
 *                "taxes": [],
 *                "total_amount_after_tax": 2289,
 *                "commission_percentage": 2,
 *                "admin_commission_amount": 45.78,
 *                "store_payout_amount": 2243.22,
 *                "order_id": "5d51668",
 *                "created_at": "2019-10-13T08:09:31.402Z",
 *                "updated_at": "2019-12-21T08:26:24.900Z",
 *                "__v": 0,
 *                "cancelled_by": "customer",
 *                "store": {
 *                    "_id": "5d7607c59b5f0f76ee4f68b0",
 *                    "picture": "12.png",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "12:00",
 *                        "close_time": "21:00"
 *                    },
 *                    "owner": {
 *                        "email": "ham.hassansiddiqui@gmail.com",
 *                        "password": "$2b$10$yTWjJmy7DS2R6h8zyDr.6unwkX0teyzU50lT4pvoQo3NYTHZBKmQu",
 *                        "full_name": "Hammad Hassan",
 *                        "contact_number": "03333743790"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d7607c59b5f0f76ee4f68b1",
 *                            "coordinates": {
 *                                "latitude": 24.9210435,
 *                                "longitude": 67.10559360000002
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d10d21fe166d8c93049",
 *                            "shop_no": "NA-Class 190/219",
 *                            "locality": "Karachi",
 *                            "unique_link": "TKhr3"
 *                        }
 *                    ],
 *                    "name": "METRO",
 *                    "commission": 3,
 *                    "created_at": "2019-09-09T08:05:25.721Z",
 *                    "updated_at": "2020-03-05T06:26:57.905Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsInR5cGUiOjIsImlhdCI6MTU4MzM4ODM4NX0.4uZ9x7xPDnYiRisnZJ7a0UPep8LRYYOD8KXxgi6J-7o",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsImlhdCI6MTU3ODkxMTA4Mn0.k-Ek52UwRftyj8hywTqFUneWb1kW8_pfocE0ayMaFZI",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389a",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389b",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389c",
 *                            "order_amount": 1001,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeInfo": {
 *                        "faq": "<p>dfdf</p><p><br></p><p>a</p><p>d</p><p>s</p>",
 *                        "termAndCondition": "<h2>Term and condition</h2><h2>Term and condition</h2><h2>Term and condition</h2><h2><br></h2>",
 *                        "privacyAndPolicy": "<p>Last Updated: May 25, 2019</p><p>Thank you for using aapkidokan.com services. We are dedicated to provide you the best online shopping and delivery experience possible. This Privacy Policy outlines how we respect and value the trust you put in aapkidokan.com. This Policy applies regardless of how you access the aapkidokan.com platform - whether this is via a mobile app or web interface.</p><p><br></p><p>INFORMATION WE COLLECT</p><p>When you use our website or mobile application, you may provide us with information about yourself. For instance, when you create an account with aapkidokan.com you provide us with personal information like your name, email address, and phone number. And if you place an order with aapkidokan.com, we collect information including your address and the details of your order.</p><p>If you log into the services through a third-party service, both we and that third-party may receive some information about you and your use of the service. For example, if you choose to log into the services with your Facebook account, we may receive information from Facebook, such as your name, e-mail address, and public profile information about your contacts. We may also offer social sharing tools that let you share actions on the services with other websites and vice versa. In those cases, the providers of those tools may receive information about you when you use those tools. You should check the privacy policies of these third party services and your settings there for more information.</p><p>We use your contact information to send you offers based on your previous orders and your interests when you use the aapkidokan.com services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p><p><br></p><p>USE OF YOUR INFORMATION</p><p><strong> We may use the information we collect for various purposes including:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Manage and improve the services aapkidokan.com provide to you</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Administer and operate your account</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Process your orders, receive payments for the orders</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Understand your shopping behavior to develop and improve our products and services and offer you customized content (including advertising and promotions), such as prominently displaying items you purchase frequently</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Provide customer service, respond to your communications and requests, and resolve complaint and disputes and contact you about your use of appkidokan.com services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">Inform you about online offers, products, services and important changes to the Website and our services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our Website.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.</li></ul><p>DISCLOSING YOUR PERSONAL INFORMATION</p><p><strong> Your personal information is safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul><p>COOKIES AND OTHER TRACKING TECHNOLOGIES</p><p>We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests.</p><p>Cookies are small text files that are sent by your computer when you access our services through a browser. We may use session cookies (which expire when you close your browser), persistent cookies (which expire when you choose to clear them from your browser), and other identifiers to collect information from your browser or device that helps us personalize your experience, measure, manage, and display advertising on the services or on other services; understand your usage of the Services and other services in order to serve customized ads and remember that you are logged into the Services. By using your browser settings, you may block cookies or adjust settings for notifications when a cookie is set.</p><p>Additionally, you may encounter \"cookies\" or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties</p><p><br></p><p>WHAT SECURITY MEASURES WE APPLY</p><p>We maintain commercially reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy, and to protect against unauthorized access or alteration to, disclosure, or destruction of your Information. We may, for example, use encryption technology to secure your Information by utilizing Secure Socket Layer (SSL) software. Only those authorized employees, contractors, and agents who need to know your Information in connection with the performance of their services are allowed to access this Information.</p><p>It is important for you to protect yourself against unauthorized access to your password and to your devices used to access our Services. You are responsible for keeping your password confidential. For example, ensure that you sign off when you have finished using a shared device.</p><p>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our Platform and any transmission is at your own risk.</p><p><br></p><p>CHANGES TO OUR POLICY</p><p>Our business changes constantly, and our Privacy Policy may therefore also need to change. We reserve the right to change the policy at any time. We will post the current version of this Privacy Policy on the Platform and each such change will be effective upon posting on the Platform or upon the date designated by us as the \"effective date\".</p><p>We may e-mail periodic reminders of our notices and conditions, but you should check our Platform frequently to see recent changes.</p><p>It is your obligation to regularly check the Privacy Policy. Your continued use of the Platform following any such change constitutes your agreement to this Privacy Policy as so modified</p><p><br></p><p>CONTACT INFORMATION</p><p>If you have any concerns, questions or comments about your Information or our Privacy Policy, please contact us&nbsp;with thorough description at following:</p>",
 *                        "contactInfo": "<h2 class=\"ql-align-center\"><strong style=\"color: rgb(255, 194, 102);\">Your personal information is</strong><strong> </strong></h2><p><br></p><p><strong>safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul>"
 *                    }
 *                }
 *            },
 *            {
 *                "_id": "5dcbfeb0ed31e91844278ebd",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9210435,
 *                            "longitude": 67.10559360000002
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "NA-Class 190/219",
 *                        "locality": "Karachi"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.861478767361103,
 *                            "longitude": 67.00280588493344
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Enuke",
 *                        "email": "enuke@enuke.com",
 *                        "contact_number": "9999999999",
 *                        "house_no": "test",
 *                        "locality": "test",
 *                        "landmark": "test",
 *                        "gps_address": "Data Center, Bhimpura Karachi, Karachi City, Sindh, Pakistan",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5dcbf585ed31e91844278e65",
 *                "deliver_start_time": "2019-11-19T07:00:00.000Z",
 *                "deliver_end_time": "2019-11-19T09:00:00.000Z",
 *                "customer_id": "5dcbf452ed31e91844278e4a",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "anlkvhnhqk0cvys3y.jpg"
 *                        ],
 *                        "_id": "5dcbfeb0ed31e91844278ec0",
 *                        "product_id": "5d76bc669b5f0f76ee4f6952",
 *                        "size": "9 gm",
 *                        "price": 240,
 *                        "count": 1,
 *                        "name": "Cadbury dairy milk Box"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "anlkvhnhqk0c6vrjq.jpeg"
 *                        ],
 *                        "_id": "5dcbfeb0ed31e91844278ebf",
 *                        "product_id": "5d7617d39b5f0f76ee4f68fa",
 *                        "size": "500 gm",
 *                        "price": 47.5,
 *                        "count": 1,
 *                        "name": " Beetroot (Chukandar)"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "anlkvhnhqk0cdu28n.jpg"
 *                        ],
 *                        "_id": "5dcbfeb0ed31e91844278ebe",
 *                        "product_id": "5d7645719b5f0f76ee4f6912",
 *                        "size": "51gm",
 *                        "price": 105,
 *                        "count": 2,
 *                        "name": "Mars Chocolate"
 *                    }
 *                ],
 *                "total_amount": 497.5,
 *                "taxes": [],
 *                "total_amount_after_tax": 497.5,
 *                "commission_percentage": 2,
 *                "admin_commission_amount": 9.95,
 *                "store_payout_amount": 487.55,
 *                "order_id": "c027885",
 *                "created_at": "2019-11-13T13:01:36.227Z",
 *                "updated_at": "2020-01-10T14:21:24.408Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d7607c59b5f0f76ee4f68b0",
 *                    "picture": "12.png",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "12:00",
 *                        "close_time": "21:00"
 *                    },
 *                    "owner": {
 *                        "email": "ham.hassansiddiqui@gmail.com",
 *                        "password": "$2b$10$yTWjJmy7DS2R6h8zyDr.6unwkX0teyzU50lT4pvoQo3NYTHZBKmQu",
 *                        "full_name": "Hammad Hassan",
 *                        "contact_number": "03333743790"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d7607c59b5f0f76ee4f68b1",
 *                            "coordinates": {
 *                                "latitude": 24.9210435,
 *                                "longitude": 67.10559360000002
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d10d21fe166d8c93049",
 *                            "shop_no": "NA-Class 190/219",
 *                            "locality": "Karachi",
 *                            "unique_link": "TKhr3"
 *                        }
 *                    ],
 *                    "name": "METRO",
 *                    "commission": 3,
 *                    "created_at": "2019-09-09T08:05:25.721Z",
 *                    "updated_at": "2020-03-05T06:26:57.905Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsInR5cGUiOjIsImlhdCI6MTU4MzM4ODM4NX0.4uZ9x7xPDnYiRisnZJ7a0UPep8LRYYOD8KXxgi6J-7o",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsImlhdCI6MTU3ODkxMTA4Mn0.k-Ek52UwRftyj8hywTqFUneWb1kW8_pfocE0ayMaFZI",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389a",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389b",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389c",
 *                            "order_amount": 1001,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeInfo": {
 *                        "faq": "<p>dfdf</p><p><br></p><p>a</p><p>d</p><p>s</p>",
 *                        "termAndCondition": "<h2>Term and condition</h2><h2>Term and condition</h2><h2>Term and condition</h2><h2><br></h2>",
 *                        "privacyAndPolicy": "<p>Last Updated: May 25, 2019</p><p>Thank you for using aapkidokan.com services. We are dedicated to provide you the best online shopping and delivery experience possible. This Privacy Policy outlines how we respect and value the trust you put in aapkidokan.com. This Policy applies regardless of how you access the aapkidokan.com platform - whether this is via a mobile app or web interface.</p><p><br></p><p>INFORMATION WE COLLECT</p><p>When you use our website or mobile application, you may provide us with information about yourself. For instance, when you create an account with aapkidokan.com you provide us with personal information like your name, email address, and phone number. And if you place an order with aapkidokan.com, we collect information including your address and the details of your order.</p><p>If you log into the services through a third-party service, both we and that third-party may receive some information about you and your use of the service. For example, if you choose to log into the services with your Facebook account, we may receive information from Facebook, such as your name, e-mail address, and public profile information about your contacts. We may also offer social sharing tools that let you share actions on the services with other websites and vice versa. In those cases, the providers of those tools may receive information about you when you use those tools. You should check the privacy policies of these third party services and your settings there for more information.</p><p>We use your contact information to send you offers based on your previous orders and your interests when you use the aapkidokan.com services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p><p><br></p><p>USE OF YOUR INFORMATION</p><p><strong> We may use the information we collect for various purposes including:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Manage and improve the services aapkidokan.com provide to you</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Administer and operate your account</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Process your orders, receive payments for the orders</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Understand your shopping behavior to develop and improve our products and services and offer you customized content (including advertising and promotions), such as prominently displaying items you purchase frequently</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Provide customer service, respond to your communications and requests, and resolve complaint and disputes and contact you about your use of appkidokan.com services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">Inform you about online offers, products, services and important changes to the Website and our services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our Website.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.</li></ul><p>DISCLOSING YOUR PERSONAL INFORMATION</p><p><strong> Your personal information is safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul><p>COOKIES AND OTHER TRACKING TECHNOLOGIES</p><p>We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests.</p><p>Cookies are small text files that are sent by your computer when you access our services through a browser. We may use session cookies (which expire when you close your browser), persistent cookies (which expire when you choose to clear them from your browser), and other identifiers to collect information from your browser or device that helps us personalize your experience, measure, manage, and display advertising on the services or on other services; understand your usage of the Services and other services in order to serve customized ads and remember that you are logged into the Services. By using your browser settings, you may block cookies or adjust settings for notifications when a cookie is set.</p><p>Additionally, you may encounter \"cookies\" or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties</p><p><br></p><p>WHAT SECURITY MEASURES WE APPLY</p><p>We maintain commercially reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy, and to protect against unauthorized access or alteration to, disclosure, or destruction of your Information. We may, for example, use encryption technology to secure your Information by utilizing Secure Socket Layer (SSL) software. Only those authorized employees, contractors, and agents who need to know your Information in connection with the performance of their services are allowed to access this Information.</p><p>It is important for you to protect yourself against unauthorized access to your password and to your devices used to access our Services. You are responsible for keeping your password confidential. For example, ensure that you sign off when you have finished using a shared device.</p><p>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our Platform and any transmission is at your own risk.</p><p><br></p><p>CHANGES TO OUR POLICY</p><p>Our business changes constantly, and our Privacy Policy may therefore also need to change. We reserve the right to change the policy at any time. We will post the current version of this Privacy Policy on the Platform and each such change will be effective upon posting on the Platform or upon the date designated by us as the \"effective date\".</p><p>We may e-mail periodic reminders of our notices and conditions, but you should check our Platform frequently to see recent changes.</p><p>It is your obligation to regularly check the Privacy Policy. Your continued use of the Platform following any such change constitutes your agreement to this Privacy Policy as so modified</p><p><br></p><p>CONTACT INFORMATION</p><p>If you have any concerns, questions or comments about your Information or our Privacy Policy, please contact us&nbsp;with thorough description at following:</p>",
 *                        "contactInfo": "<h2 class=\"ql-align-center\"><strong style=\"color: rgb(255, 194, 102);\">Your personal information is</strong><strong> </strong></h2><p><br></p><p><strong>safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul>"
 *                    }
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-19T12:14:06.318Z",
 *                    "__v": 0,
 *                    "fcm_token": "fui46PA2ZTk:APA91bGDNaCm_0ZeT1Lq89xwx6PQDdUaHE4U5dSz22vk6ReWUx2HcvZv2P28M7079GA5Ud0OJUuk-CkPfCh2l8aJ0A2s5RTZ2CeaGUNlbbBTI5x8GNBmj07obxfU3LdeMiYx3L1bHg1u",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDYyMDA0Nn0.ZRfBIdtxbgWyfPMbQHM4ouJEfs88VEz1YY2S2zXsZDQ",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5dccea83ed31e91844278ed1",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9210435,
 *                            "longitude": 67.10559360000002
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "NA-Class 190/219",
 *                        "locality": "Karachi"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.81780509999999,
 *                            "longitude": 66.9847155
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Shakeel",
 *                        "email": "hashir.ahmed@aapkidokan.com",
 *                        "contact_number": "03142219941",
 *                        "house_no": "Plot # 26 Oil Installation Area ",
 *                        "locality": "Shahrah e ghalib",
 *                        "landmark": "Kemari",
 *                        "gps_address": "burshane ",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 150,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5dcbf585ed31e91844278e59",
 *                "deliver_start_time": "2019-11-16T07:00:00.000Z",
 *                "deliver_end_time": "2019-11-16T09:00:00.000Z",
 *                "customer_id": "5dcce5e8ed31e91844278ecf",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "005000143.jpg"
 *                        ],
 *                        "_id": "5dccea83ed31e91844278ed3",
 *                        "product_id": "5d8085e7d22f1e78b76720d1",
 *                        "size": "1.9 kg",
 *                        "price": 1622,
 *                        "count": 1,
 *                        "name": "Nestle EveryDay Milk Powder "
 *                    },
 *                    {
 *                        "pictures": [
 *                            "00300045.jpg"
 *                        ],
 *                        "_id": "5dccea83ed31e91844278ed2",
 *                        "product_id": "5d7cc650d22f1e78b7671f66",
 *                        "size": "1 KG",
 *                        "price": 85,
 *                        "count": 1,
 *                        "name": "Leela Sugar "
 *                    }
 *                ],
 *                "total_amount": 1707,
 *                "taxes": [],
 *                "total_amount_after_tax": 1707,
 *                "commission_percentage": 2,
 *                "admin_commission_amount": 34.14,
 *                "store_payout_amount": 1672.86,
 *                "order_id": "26d2730",
 *                "created_at": "2019-11-14T05:47:47.289Z",
 *                "updated_at": "2020-01-10T14:21:21.530Z",
 *                "__v": 0,
 *                "driver_id": "5d79f10ed22f1e78b7671d74",
 *                "store": {
 *                    "_id": "5d7607c59b5f0f76ee4f68b0",
 *                    "picture": "12.png",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "12:00",
 *                        "close_time": "21:00"
 *                    },
 *                    "owner": {
 *                        "email": "ham.hassansiddiqui@gmail.com",
 *                        "password": "$2b$10$yTWjJmy7DS2R6h8zyDr.6unwkX0teyzU50lT4pvoQo3NYTHZBKmQu",
 *                        "full_name": "Hammad Hassan",
 *                        "contact_number": "03333743790"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d7607c59b5f0f76ee4f68b1",
 *                            "coordinates": {
 *                                "latitude": 24.9210435,
 *                                "longitude": 67.10559360000002
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d10d21fe166d8c93049",
 *                            "shop_no": "NA-Class 190/219",
 *                            "locality": "Karachi",
 *                            "unique_link": "TKhr3"
 *                        }
 *                    ],
 *                    "name": "METRO",
 *                    "commission": 3,
 *                    "created_at": "2019-09-09T08:05:25.721Z",
 *                    "updated_at": "2020-03-05T06:26:57.905Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsInR5cGUiOjIsImlhdCI6MTU4MzM4ODM4NX0.4uZ9x7xPDnYiRisnZJ7a0UPep8LRYYOD8KXxgi6J-7o",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsImlhdCI6MTU3ODkxMTA4Mn0.k-Ek52UwRftyj8hywTqFUneWb1kW8_pfocE0ayMaFZI",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389a",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389b",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389c",
 *                            "order_amount": 1001,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeInfo": {
 *                        "faq": "<p>dfdf</p><p><br></p><p>a</p><p>d</p><p>s</p>",
 *                        "termAndCondition": "<h2>Term and condition</h2><h2>Term and condition</h2><h2>Term and condition</h2><h2><br></h2>",
 *                        "privacyAndPolicy": "<p>Last Updated: May 25, 2019</p><p>Thank you for using aapkidokan.com services. We are dedicated to provide you the best online shopping and delivery experience possible. This Privacy Policy outlines how we respect and value the trust you put in aapkidokan.com. This Policy applies regardless of how you access the aapkidokan.com platform - whether this is via a mobile app or web interface.</p><p><br></p><p>INFORMATION WE COLLECT</p><p>When you use our website or mobile application, you may provide us with information about yourself. For instance, when you create an account with aapkidokan.com you provide us with personal information like your name, email address, and phone number. And if you place an order with aapkidokan.com, we collect information including your address and the details of your order.</p><p>If you log into the services through a third-party service, both we and that third-party may receive some information about you and your use of the service. For example, if you choose to log into the services with your Facebook account, we may receive information from Facebook, such as your name, e-mail address, and public profile information about your contacts. We may also offer social sharing tools that let you share actions on the services with other websites and vice versa. In those cases, the providers of those tools may receive information about you when you use those tools. You should check the privacy policies of these third party services and your settings there for more information.</p><p>We use your contact information to send you offers based on your previous orders and your interests when you use the aapkidokan.com services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p><p><br></p><p>USE OF YOUR INFORMATION</p><p><strong> We may use the information we collect for various purposes including:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Manage and improve the services aapkidokan.com provide to you</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Administer and operate your account</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Process your orders, receive payments for the orders</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Understand your shopping behavior to develop and improve our products and services and offer you customized content (including advertising and promotions), such as prominently displaying items you purchase frequently</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Provide customer service, respond to your communications and requests, and resolve complaint and disputes and contact you about your use of appkidokan.com services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">Inform you about online offers, products, services and important changes to the Website and our services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our Website.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.</li></ul><p>DISCLOSING YOUR PERSONAL INFORMATION</p><p><strong> Your personal information is safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul><p>COOKIES AND OTHER TRACKING TECHNOLOGIES</p><p>We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests.</p><p>Cookies are small text files that are sent by your computer when you access our services through a browser. We may use session cookies (which expire when you close your browser), persistent cookies (which expire when you choose to clear them from your browser), and other identifiers to collect information from your browser or device that helps us personalize your experience, measure, manage, and display advertising on the services or on other services; understand your usage of the Services and other services in order to serve customized ads and remember that you are logged into the Services. By using your browser settings, you may block cookies or adjust settings for notifications when a cookie is set.</p><p>Additionally, you may encounter \"cookies\" or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties</p><p><br></p><p>WHAT SECURITY MEASURES WE APPLY</p><p>We maintain commercially reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy, and to protect against unauthorized access or alteration to, disclosure, or destruction of your Information. We may, for example, use encryption technology to secure your Information by utilizing Secure Socket Layer (SSL) software. Only those authorized employees, contractors, and agents who need to know your Information in connection with the performance of their services are allowed to access this Information.</p><p>It is important for you to protect yourself against unauthorized access to your password and to your devices used to access our Services. You are responsible for keeping your password confidential. For example, ensure that you sign off when you have finished using a shared device.</p><p>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our Platform and any transmission is at your own risk.</p><p><br></p><p>CHANGES TO OUR POLICY</p><p>Our business changes constantly, and our Privacy Policy may therefore also need to change. We reserve the right to change the policy at any time. We will post the current version of this Privacy Policy on the Platform and each such change will be effective upon posting on the Platform or upon the date designated by us as the \"effective date\".</p><p>We may e-mail periodic reminders of our notices and conditions, but you should check our Platform frequently to see recent changes.</p><p>It is your obligation to regularly check the Privacy Policy. Your continued use of the Platform following any such change constitutes your agreement to this Privacy Policy as so modified</p><p><br></p><p>CONTACT INFORMATION</p><p>If you have any concerns, questions or comments about your Information or our Privacy Policy, please contact us&nbsp;with thorough description at following:</p>",
 *                        "contactInfo": "<h2 class=\"ql-align-center\"><strong style=\"color: rgb(255, 194, 102);\">Your personal information is</strong><strong> </strong></h2><p><br></p><p><strong>safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul>"
 *                    }
 *                },
 *                "driver": {
 *                    "_id": "5d79f10ed22f1e78b7671d74",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "prince.kumar@enukesoftware.com",
 *                    "password": "$2b$10$68KJiWoNIlfe0m27HVQZA.CIqb4qIF.ioMNsbiNcLt8f1s1EaIN26",
 *                    "full_name": "PRINCE KUMAR",
 *                    "contact_number": "8285724681",
 *                    "address": "C 37 Najafgarh Nayabazar, Near BVM Public School",
 *                    "created_at": "2019-09-12T07:17:34.858Z",
 *                    "updated_at": "2020-03-19T12:14:06.318Z",
 *                    "__v": 0,
 *                    "fcm_token": "fui46PA2ZTk:APA91bGDNaCm_0ZeT1Lq89xwx6PQDdUaHE4U5dSz22vk6ReWUx2HcvZv2P28M7079GA5Ud0OJUuk-CkPfCh2l8aJ0A2s5RTZ2CeaGUNlbbBTI5x8GNBmj07obxfU3LdeMiYx3L1bHg1u",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzlmMTBlZDIyZjFlNzhiNzY3MWQ3NCIsInR5cGUiOjQsImlhdCI6MTU4NDYyMDA0Nn0.ZRfBIdtxbgWyfPMbQHM4ouJEfs88VEz1YY2S2zXsZDQ",
 *                    "percentageCommission": 10
 *                }
 *            },
 *            {
 *                "_id": "5dea98bd68a40316a20bf8ab",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.86092389611868,
 *                            "longitude": 67.00235527381894
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Khushal",
 *                        "email": "khushalp32@gmail.com",
 *                        "contact_number": "9711669906",
 *                        "locality": "Karachi block 1",
 *                        "house_no": "123",
 *                        "gps_address": "Data Center, Bhimpura Karachi, Karachi City, Sindh, Pakistan",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 150,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5de64674d85c19035ebf06d9",
 *                "deliver_start_time": "2019-12-07T07:00:00.000Z",
 *                "deliver_end_time": "2019-12-07T09:00:00.000Z",
 *                "customer_id": "5ddd17e6d85c19035ebf0338",
 *                "store_id": "5d9eda647a30b1642ce9cb77",
 *                "products": [
 *                    {
 *                        "pictures": [],
 *                        "_id": "5dea98bd68a40316a20bf8ac",
 *                        "product_id": "5de90bced85c19035ebf11d3",
 *                        "size": "5kg",
 *                        "price": 960,
 *                        "count": 2,
 *                        "name": "Laar - Lazzat Basmati Rice (Sella) 5kg"
 *                    }
 *                ],
 *                "total_amount": 1920,
 *                "taxes": [],
 *                "total_amount_after_tax": 1920,
 *                "commission_percentage": 1,
 *                "admin_commission_amount": 19.2,
 *                "store_payout_amount": 1900.8,
 *                "order_id": "5f8fd26",
 *                "created_at": "2019-12-06T18:06:53.519Z",
 *                "updated_at": "2019-12-07T17:30:15.985Z",
 *                "__v": 0,
 *                "driver_id": "5d9dda22d22f1e78b76728c3",
 *                "store": {
 *                    "_id": "5d9eda647a30b1642ce9cb77",
 *                    "picture": "Saveway Store logo.jpg",
 *                    "has_express_delivery": true,
 *                    "drivers": [
 *                        "5d9dda22d22f1e78b76728c3",
 *                        "5dea53edd85c19035ebf121d",
 *                        "5dea5445d85c19035ebf121e",
 *                        "5dea5479d85c19035ebf121f",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "11:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "nasirahmed110@gmail.com",
 *                        "password": "$2b$10$79BZrJpB2WeHAFRBN5.AFuHJPDse3vRUyBEa3yuYyB9TowG8GnGMm",
 *                        "full_name": "Dr. Farooq ",
 *                        "contact_number": "03218994366"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d9eda647a30b1642ce9cb78",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d43d21fe166d8c9304a",
 *                            "shop_no": "37",
 *                            "locality": "Karachi",
 *                            "gps_address": "saveway",
 *                            "unique_link": "Zsm7Em"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1229",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5d7605099b5f0f76ee4f68ae",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRt"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1228",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea5254d85c19035ebf1217",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRx"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1227",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52b5d85c19035ebf1218",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRy"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1226",
 *                            "coordinates": {
 *                                "longitude": 67.0802142,
 *                                "latitude": 24.9128145
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52bfd85c19035ebf1219",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRz"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1225",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52d0d85c19035ebf121a",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1Aw"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1224",
 *                            "coordinates": {
 *                                "longitude": 67.0802142,
 *                                "latitude": 24.9128145
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52e0d85c19035ebf121b",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1Az"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1223",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52eed85c19035ebf121c",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1AC"
 *                        }
 *                    ],
 *                    "name": "Saveway Super Store",
 *                    "commission": 1,
 *                    "created_at": "2019-10-10T07:14:44.355Z",
 *                    "updated_at": "2020-02-24T12:32:19.381Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsInR5cGUiOjIsImlhdCI6MTU3ODk5Mjk1Mn0.Cwk6bEQ73cP-KAMUihbhTuXW4XEScnqEAsm9F8JsFtk",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsImlhdCI6MTU3ODkxMTMzMX0.nMJVQksXhU572y57lNHSl8Bor3ldNtx1jHPtN0OZIBs",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "order_amount": 1000,
 *                            "charges": 50
 *                        }
 *                    ]
 *                },
 *                "driver": {
 *                    "_id": "5d9dda22d22f1e78b76728c3",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "nasir.ahmed@aapkidokan.com",
 *                    "password": "$2b$10$Se2zNSy8Ct3UA788zAdwSO2NkQeqhMKZcGpTAi2xXuTDkeelIRUdC",
 *                    "full_name": "Nasir Ahmed",
 *                    "contact_number": "03218994366",
 *                    "address": "Bait-ul-Mukaram Masjid, B29, Master Square، University Rd, Block 13/A Block 13 A Opp، Karachi, Karachi City, Sindh, Pakistan",
 *                    "driving_license": "154512154956",
 *                    "created_at": "2019-10-09T13:01:22.730Z",
 *                    "updated_at": "2020-01-15T09:08:51.960Z",
 *                    "__v": 0,
 *                    "fcm_token": "em_1AecwxWg:APA91bE-u0HYQ9_7z3RNl9KrlA86vY5DSyKmzSNgFu1D8YFIjrtzvZtQ65QDjbZEbFegYjZ_QTqgp3TcF720_015Q52iXoSTst87VnG0WXa8GleHsHB1g_KPqHojtQ5mYxeCcmPTy803",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWRkYTIyZDIyZjFlNzhiNzY3MjhjMyIsInR5cGUiOjQsImlhdCI6MTU3OTA3OTMyN30.WRLVWh3--pe7H8e9-mWdFgSrH3Zlil4f_wLSrK6Vn9s"
 *                }
 *            },
 *            {
 *                "_id": "5deb555468a40316a20bf916",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5dea52b5d85c19035ebf1218",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.90920783669007,
 *                            "longitude": 67.1299919120278
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Najam ul Saqib",
 *                        "email": "najam.sahto@gmail.com",
 *                        "contact_number": "03012999901",
 *                        "locality": "Gulstan-e-Johar, Block 18",
 *                        "landmark": "Rabia City",
 *                        "house_no": "Flat 506, Bait ul Hina",
 *                        "gps_address": "32, Block 18 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": true,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 150,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "deliver_start_time": "2019-12-07T07:31:32.364Z",
 *                "deliver_end_time": "2019-12-07T09:31:32.365Z",
 *                "customer_id": "5dea7a2bd85c19035ebf122b",
 *                "store_id": "5d9eda647a30b1642ce9cb77",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "003000359.jpeg"
 *                        ],
 *                        "_id": "5deb555468a40316a20bf918",
 *                        "product_id": "5de90bced85c19035ebf11d3",
 *                        "size": "5kg",
 *                        "price": 960,
 *                        "count": 1,
 *                        "name": "Laar - Lazzat Basmati Rice (Sella) 5kg"
 *                    },
 *                    {
 *                        "pictures": [
 *                            "009000201.jpg"
 *                        ],
 *                        "_id": "5deb555468a40316a20bf917",
 *                        "product_id": "5de51973d85c19035ebf05bf",
 *                        "size": "500 ml",
 *                        "price": 350,
 *                        "count": 1,
 *                        "name": "Dettol - Kitchen Cleaner 500 ml"
 *                    }
 *                ],
 *                "total_amount": 1310,
 *                "taxes": [],
 *                "total_amount_after_tax": 1310,
 *                "commission_percentage": 1,
 *                "admin_commission_amount": 13.1,
 *                "store_payout_amount": 1296.9,
 *                "order_id": "6b42811",
 *                "created_at": "2019-12-07T07:31:32.381Z",
 *                "updated_at": "2019-12-07T07:34:02.340Z",
 *                "__v": 0,
 *                "driver_id": "5d9dda22d22f1e78b76728c3",
 *                "store": {
 *                    "_id": "5d9eda647a30b1642ce9cb77",
 *                    "picture": "Saveway Store logo.jpg",
 *                    "has_express_delivery": true,
 *                    "drivers": [
 *                        "5d9dda22d22f1e78b76728c3",
 *                        "5dea53edd85c19035ebf121d",
 *                        "5dea5445d85c19035ebf121e",
 *                        "5dea5479d85c19035ebf121f",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "11:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "nasirahmed110@gmail.com",
 *                        "password": "$2b$10$79BZrJpB2WeHAFRBN5.AFuHJPDse3vRUyBEa3yuYyB9TowG8GnGMm",
 *                        "full_name": "Dr. Farooq ",
 *                        "contact_number": "03218994366"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d9eda647a30b1642ce9cb78",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d43d21fe166d8c9304a",
 *                            "shop_no": "37",
 *                            "locality": "Karachi",
 *                            "gps_address": "saveway",
 *                            "unique_link": "Zsm7Em"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1229",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5d7605099b5f0f76ee4f68ae",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRt"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1228",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea5254d85c19035ebf1217",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRx"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1227",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52b5d85c19035ebf1218",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRy"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1226",
 *                            "coordinates": {
 *                                "longitude": 67.0802142,
 *                                "latitude": 24.9128145
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52bfd85c19035ebf1219",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRz"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1225",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52d0d85c19035ebf121a",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1Aw"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1224",
 *                            "coordinates": {
 *                                "longitude": 67.0802142,
 *                                "latitude": 24.9128145
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52e0d85c19035ebf121b",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1Az"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1223",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52eed85c19035ebf121c",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1AC"
 *                        }
 *                    ],
 *                    "name": "Saveway Super Store",
 *                    "commission": 1,
 *                    "created_at": "2019-10-10T07:14:44.355Z",
 *                    "updated_at": "2020-02-24T12:32:19.381Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsInR5cGUiOjIsImlhdCI6MTU3ODk5Mjk1Mn0.Cwk6bEQ73cP-KAMUihbhTuXW4XEScnqEAsm9F8JsFtk",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsImlhdCI6MTU3ODkxMTMzMX0.nMJVQksXhU572y57lNHSl8Bor3ldNtx1jHPtN0OZIBs",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "order_amount": 1000,
 *                            "charges": 50
 *                        }
 *                    ]
 *                },
 *                "driver": {
 *                    "_id": "5d9dda22d22f1e78b76728c3",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "nasir.ahmed@aapkidokan.com",
 *                    "password": "$2b$10$Se2zNSy8Ct3UA788zAdwSO2NkQeqhMKZcGpTAi2xXuTDkeelIRUdC",
 *                    "full_name": "Nasir Ahmed",
 *                    "contact_number": "03218994366",
 *                    "address": "Bait-ul-Mukaram Masjid, B29, Master Square، University Rd, Block 13/A Block 13 A Opp، Karachi, Karachi City, Sindh, Pakistan",
 *                    "driving_license": "154512154956",
 *                    "created_at": "2019-10-09T13:01:22.730Z",
 *                    "updated_at": "2020-01-15T09:08:51.960Z",
 *                    "__v": 0,
 *                    "fcm_token": "em_1AecwxWg:APA91bE-u0HYQ9_7z3RNl9KrlA86vY5DSyKmzSNgFu1D8YFIjrtzvZtQ65QDjbZEbFegYjZ_QTqgp3TcF720_015Q52iXoSTst87VnG0WXa8GleHsHB1g_KPqHojtQ5mYxeCcmPTy803",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWRkYTIyZDIyZjFlNzhiNzY3MjhjMyIsInR5cGUiOjQsImlhdCI6MTU3OTA3OTMyN30.WRLVWh3--pe7H8e9-mWdFgSrH3Zlil4f_wLSrK6Vn9s"
 *                }
 *            },
 *            {
 *                "_id": "5df220cee1c7be6b429732ca",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "khushal",
 *                        "email": "test@gmail.com",
 *                        "contact_number": "9711669906",
 *                        "house_no": "11",
 *                        "locality": "22",
 *                        "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5de8026cd85c19035ebf1169",
 *                "deliver_start_time": "2019-12-12T13:00:00.000Z",
 *                "deliver_end_time": "2019-12-12T15:00:00.000Z",
 *                "customer_id": "5ddd1734d85c19035ebf0336",
 *                "store_id": "5d9eda647a30b1642ce9cb77",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "0030006151.jpg"
 *                        ],
 *                        "_id": "5df220cee1c7be6b429732cb",
 *                        "product_id": "5dd3d02bed31e9184427931f",
 *                        "size": "100 gm",
 *                        "price": 65,
 *                        "count": 1,
 *                        "name": "National - Coriander Powder 100 gm"
 *                    }
 *                ],
 *                "total_amount": 65,
 *                "taxes": [],
 *                "total_amount_after_tax": 65,
 *                "commission_percentage": 1,
 *                "admin_commission_amount": 0.65,
 *                "store_payout_amount": 64.35,
 *                "order_id": "71733d1",
 *                "created_at": "2019-12-12T11:13:18.763Z",
 *                "updated_at": "2019-12-16T07:22:31.951Z",
 *                "__v": 0,
 *                "driver_id": "5d9dda22d22f1e78b76728c3",
 *                "store": {
 *                    "_id": "5d9eda647a30b1642ce9cb77",
 *                    "picture": "Saveway Store logo.jpg",
 *                    "has_express_delivery": true,
 *                    "drivers": [
 *                        "5d9dda22d22f1e78b76728c3",
 *                        "5dea53edd85c19035ebf121d",
 *                        "5dea5445d85c19035ebf121e",
 *                        "5dea5479d85c19035ebf121f",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "11:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "nasirahmed110@gmail.com",
 *                        "password": "$2b$10$79BZrJpB2WeHAFRBN5.AFuHJPDse3vRUyBEa3yuYyB9TowG8GnGMm",
 *                        "full_name": "Dr. Farooq ",
 *                        "contact_number": "03218994366"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d9eda647a30b1642ce9cb78",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d43d21fe166d8c9304a",
 *                            "shop_no": "37",
 *                            "locality": "Karachi",
 *                            "gps_address": "saveway",
 *                            "unique_link": "Zsm7Em"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1229",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5d7605099b5f0f76ee4f68ae",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRt"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1228",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea5254d85c19035ebf1217",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRx"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1227",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52b5d85c19035ebf1218",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRy"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1226",
 *                            "coordinates": {
 *                                "longitude": 67.0802142,
 *                                "latitude": 24.9128145
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52bfd85c19035ebf1219",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRz"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1225",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52d0d85c19035ebf121a",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1Aw"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1224",
 *                            "coordinates": {
 *                                "longitude": 67.0802142,
 *                                "latitude": 24.9128145
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52e0d85c19035ebf121b",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1Az"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1223",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52eed85c19035ebf121c",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1AC"
 *                        }
 *                    ],
 *                    "name": "Saveway Super Store",
 *                    "commission": 1,
 *                    "created_at": "2019-10-10T07:14:44.355Z",
 *                    "updated_at": "2020-02-24T12:32:19.381Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsInR5cGUiOjIsImlhdCI6MTU3ODk5Mjk1Mn0.Cwk6bEQ73cP-KAMUihbhTuXW4XEScnqEAsm9F8JsFtk",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsImlhdCI6MTU3ODkxMTMzMX0.nMJVQksXhU572y57lNHSl8Bor3ldNtx1jHPtN0OZIBs",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "order_amount": 1000,
 *                            "charges": 50
 *                        }
 *                    ]
 *                },
 *                "driver": {
 *                    "_id": "5d9dda22d22f1e78b76728c3",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "nasir.ahmed@aapkidokan.com",
 *                    "password": "$2b$10$Se2zNSy8Ct3UA788zAdwSO2NkQeqhMKZcGpTAi2xXuTDkeelIRUdC",
 *                    "full_name": "Nasir Ahmed",
 *                    "contact_number": "03218994366",
 *                    "address": "Bait-ul-Mukaram Masjid, B29, Master Square، University Rd, Block 13/A Block 13 A Opp، Karachi, Karachi City, Sindh, Pakistan",
 *                    "driving_license": "154512154956",
 *                    "created_at": "2019-10-09T13:01:22.730Z",
 *                    "updated_at": "2020-01-15T09:08:51.960Z",
 *                    "__v": 0,
 *                    "fcm_token": "em_1AecwxWg:APA91bE-u0HYQ9_7z3RNl9KrlA86vY5DSyKmzSNgFu1D8YFIjrtzvZtQ65QDjbZEbFegYjZ_QTqgp3TcF720_015Q52iXoSTst87VnG0WXa8GleHsHB1g_KPqHojtQ5mYxeCcmPTy803",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWRkYTIyZDIyZjFlNzhiNzY3MjhjMyIsInR5cGUiOjQsImlhdCI6MTU3OTA3OTMyN30.WRLVWh3--pe7H8e9-mWdFgSrH3Zlil4f_wLSrK6Vn9s"
 *                }
 *            },
 *            {
 *                "_id": "5df22110e1a77a6b60162b5e",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9128145,
 *                            "longitude": 67.0802142
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "37",
 *                        "locality": "Gulshan"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.8607,
 *                            "longitude": 67.0011
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "khushal",
 *                        "email": "test@gmail.com",
 *                        "contact_number": "9711669906",
 *                        "house_no": "11",
 *                        "locality": "22",
 *                        "gps_address": "2, Napier Quarter, Karachi, Karachi City, Sindh, Pakistan",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5de8026cd85c19035ebf1169",
 *                "deliver_start_time": "2019-12-12T13:00:00.000Z",
 *                "deliver_end_time": "2019-12-12T15:00:00.000Z",
 *                "customer_id": "5ddd1734d85c19035ebf0336",
 *                "store_id": "5d9eda647a30b1642ce9cb77",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "009000201.jpg"
 *                        ],
 *                        "_id": "5df22110e1a77a6b60162b5f",
 *                        "product_id": "5de51973d85c19035ebf05bf",
 *                        "size": "500 ml",
 *                        "price": 350,
 *                        "count": 1,
 *                        "name": "Dettol - Kitchen Cleaner 500 ml"
 *                    }
 *                ],
 *                "total_amount": 350,
 *                "taxes": [],
 *                "total_amount_after_tax": 350,
 *                "commission_percentage": 1,
 *                "admin_commission_amount": 3.5,
 *                "store_payout_amount": 346.5,
 *                "order_id": "a42ab39",
 *                "created_at": "2019-12-12T11:14:24.491Z",
 *                "updated_at": "2019-12-16T07:22:27.674Z",
 *                "__v": 0,
 *                "driver_id": "5d9dda22d22f1e78b76728c3",
 *                "store": {
 *                    "_id": "5d9eda647a30b1642ce9cb77",
 *                    "picture": "Saveway Store logo.jpg",
 *                    "has_express_delivery": true,
 *                    "drivers": [
 *                        "5d9dda22d22f1e78b76728c3",
 *                        "5dea53edd85c19035ebf121d",
 *                        "5dea5445d85c19035ebf121e",
 *                        "5dea5479d85c19035ebf121f",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "11:00",
 *                        "close_time": "23:00"
 *                    },
 *                    "owner": {
 *                        "email": "nasirahmed110@gmail.com",
 *                        "password": "$2b$10$79BZrJpB2WeHAFRBN5.AFuHJPDse3vRUyBEa3yuYyB9TowG8GnGMm",
 *                        "full_name": "Dr. Farooq ",
 *                        "contact_number": "03218994366"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d9eda647a30b1642ce9cb78",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d43d21fe166d8c9304a",
 *                            "shop_no": "37",
 *                            "locality": "Karachi",
 *                            "gps_address": "saveway",
 *                            "unique_link": "Zsm7Em"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1229",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5d7605099b5f0f76ee4f68ae",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRt"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1228",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea5254d85c19035ebf1217",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRx"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1227",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52b5d85c19035ebf1218",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRy"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1226",
 *                            "coordinates": {
 *                                "longitude": 67.0802142,
 *                                "latitude": 24.9128145
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52bfd85c19035ebf1219",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "53iRz"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1225",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52d0d85c19035ebf121a",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1Aw"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1224",
 *                            "coordinates": {
 *                                "longitude": 67.0802142,
 *                                "latitude": 24.9128145
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52e0d85c19035ebf121b",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1Az"
 *                        },
 *                        {
 *                            "_id": "5dea5605d85c19035ebf1223",
 *                            "coordinates": {
 *                                "latitude": 24.9128145,
 *                                "longitude": 67.0802142
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5dea52eed85c19035ebf121c",
 *                            "shop_no": "37",
 *                            "locality": "Gulshan",
 *                            "unique_link": "22H1AC"
 *                        }
 *                    ],
 *                    "name": "Saveway Super Store",
 *                    "commission": 1,
 *                    "created_at": "2019-10-10T07:14:44.355Z",
 *                    "updated_at": "2020-02-24T12:32:19.381Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsInR5cGUiOjIsImlhdCI6MTU3ODk5Mjk1Mn0.Cwk6bEQ73cP-KAMUihbhTuXW4XEScnqEAsm9F8JsFtk",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWVkYTY0N2EzMGIxNjQyY2U5Y2I3NyIsImlhdCI6MTU3ODkxMTMzMX0.nMJVQksXhU572y57lNHSl8Bor3ldNtx1jHPtN0OZIBs",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "order_amount": 1000,
 *                            "charges": 50
 *                        }
 *                    ]
 *                },
 *                "driver": {
 *                    "_id": "5d9dda22d22f1e78b76728c3",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "nasir.ahmed@aapkidokan.com",
 *                    "password": "$2b$10$Se2zNSy8Ct3UA788zAdwSO2NkQeqhMKZcGpTAi2xXuTDkeelIRUdC",
 *                    "full_name": "Nasir Ahmed",
 *                    "contact_number": "03218994366",
 *                    "address": "Bait-ul-Mukaram Masjid, B29, Master Square، University Rd, Block 13/A Block 13 A Opp، Karachi, Karachi City, Sindh, Pakistan",
 *                    "driving_license": "154512154956",
 *                    "created_at": "2019-10-09T13:01:22.730Z",
 *                    "updated_at": "2020-01-15T09:08:51.960Z",
 *                    "__v": 0,
 *                    "fcm_token": "em_1AecwxWg:APA91bE-u0HYQ9_7z3RNl9KrlA86vY5DSyKmzSNgFu1D8YFIjrtzvZtQ65QDjbZEbFegYjZ_QTqgp3TcF720_015Q52iXoSTst87VnG0WXa8GleHsHB1g_KPqHojtQ5mYxeCcmPTy803",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOWRkYTIyZDIyZjFlNzhiNzY3MjhjMyIsInR5cGUiOjQsImlhdCI6MTU3OTA3OTMyN30.WRLVWh3--pe7H8e9-mWdFgSrH3Zlil4f_wLSrK6Vn9s"
 *                }
 *            },
 *            {
 *                "_id": "5df52ef74648a37afa44d0ff",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9210435,
 *                            "longitude": 67.10559360000002
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "NA-Class 190/219",
 *                        "locality": "Karachi"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.90920783669007,
 *                            "longitude": 67.1299919120278
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Najam ul Saqib",
 *                        "email": "najam.sahto@gmail.com",
 *                        "contact_number": "03012999901",
 *                        "locality": "Gulstan-e-Johar, Block 18",
 *                        "landmark": "Rabia City",
 *                        "house_no": "Flat 506, Bait ul Hina",
 *                        "gps_address": "32, Block 18 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 200,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5debf6ec68a40316a20bfb05",
 *                "deliver_start_time": "2019-12-15T09:00:00.000Z",
 *                "deliver_end_time": "2019-12-15T11:00:00.000Z",
 *                "customer_id": "5dea7a2bd85c19035ebf122b",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "00200056.jpg"
 *                        ],
 *                        "_id": "5df52ef74648a37afa44d100",
 *                        "product_id": "5d788f0ed22f1e78b7671c3a",
 *                        "size": "92.1gm",
 *                        "price": 670,
 *                        "count": 1,
 *                        "name": "Doritos Spicy Sweet Chili"
 *                    }
 *                ],
 *                "total_amount": 670,
 *                "taxes": [],
 *                "total_amount_after_tax": 670,
 *                "commission_percentage": 2,
 *                "admin_commission_amount": 13.4,
 *                "store_payout_amount": 656.6,
 *                "order_id": "94b0191",
 *                "created_at": "2019-12-14T18:50:31.963Z",
 *                "updated_at": "2019-12-21T08:38:34.421Z",
 *                "__v": 0,
 *                "driver_id": "5dea892ed85c19035ebf1238",
 *                "store": {
 *                    "_id": "5d7607c59b5f0f76ee4f68b0",
 *                    "picture": "12.png",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "12:00",
 *                        "close_time": "21:00"
 *                    },
 *                    "owner": {
 *                        "email": "ham.hassansiddiqui@gmail.com",
 *                        "password": "$2b$10$yTWjJmy7DS2R6h8zyDr.6unwkX0teyzU50lT4pvoQo3NYTHZBKmQu",
 *                        "full_name": "Hammad Hassan",
 *                        "contact_number": "03333743790"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d7607c59b5f0f76ee4f68b1",
 *                            "coordinates": {
 *                                "latitude": 24.9210435,
 *                                "longitude": 67.10559360000002
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d10d21fe166d8c93049",
 *                            "shop_no": "NA-Class 190/219",
 *                            "locality": "Karachi",
 *                            "unique_link": "TKhr3"
 *                        }
 *                    ],
 *                    "name": "METRO",
 *                    "commission": 3,
 *                    "created_at": "2019-09-09T08:05:25.721Z",
 *                    "updated_at": "2020-03-05T06:26:57.905Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsInR5cGUiOjIsImlhdCI6MTU4MzM4ODM4NX0.4uZ9x7xPDnYiRisnZJ7a0UPep8LRYYOD8KXxgi6J-7o",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsImlhdCI6MTU3ODkxMTA4Mn0.k-Ek52UwRftyj8hywTqFUneWb1kW8_pfocE0ayMaFZI",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389a",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389b",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389c",
 *                            "order_amount": 1001,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeInfo": {
 *                        "faq": "<p>dfdf</p><p><br></p><p>a</p><p>d</p><p>s</p>",
 *                        "termAndCondition": "<h2>Term and condition</h2><h2>Term and condition</h2><h2>Term and condition</h2><h2><br></h2>",
 *                        "privacyAndPolicy": "<p>Last Updated: May 25, 2019</p><p>Thank you for using aapkidokan.com services. We are dedicated to provide you the best online shopping and delivery experience possible. This Privacy Policy outlines how we respect and value the trust you put in aapkidokan.com. This Policy applies regardless of how you access the aapkidokan.com platform - whether this is via a mobile app or web interface.</p><p><br></p><p>INFORMATION WE COLLECT</p><p>When you use our website or mobile application, you may provide us with information about yourself. For instance, when you create an account with aapkidokan.com you provide us with personal information like your name, email address, and phone number. And if you place an order with aapkidokan.com, we collect information including your address and the details of your order.</p><p>If you log into the services through a third-party service, both we and that third-party may receive some information about you and your use of the service. For example, if you choose to log into the services with your Facebook account, we may receive information from Facebook, such as your name, e-mail address, and public profile information about your contacts. We may also offer social sharing tools that let you share actions on the services with other websites and vice versa. In those cases, the providers of those tools may receive information about you when you use those tools. You should check the privacy policies of these third party services and your settings there for more information.</p><p>We use your contact information to send you offers based on your previous orders and your interests when you use the aapkidokan.com services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p><p><br></p><p>USE OF YOUR INFORMATION</p><p><strong> We may use the information we collect for various purposes including:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Manage and improve the services aapkidokan.com provide to you</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Administer and operate your account</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Process your orders, receive payments for the orders</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Understand your shopping behavior to develop and improve our products and services and offer you customized content (including advertising and promotions), such as prominently displaying items you purchase frequently</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Provide customer service, respond to your communications and requests, and resolve complaint and disputes and contact you about your use of appkidokan.com services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">Inform you about online offers, products, services and important changes to the Website and our services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our Website.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.</li></ul><p>DISCLOSING YOUR PERSONAL INFORMATION</p><p><strong> Your personal information is safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul><p>COOKIES AND OTHER TRACKING TECHNOLOGIES</p><p>We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests.</p><p>Cookies are small text files that are sent by your computer when you access our services through a browser. We may use session cookies (which expire when you close your browser), persistent cookies (which expire when you choose to clear them from your browser), and other identifiers to collect information from your browser or device that helps us personalize your experience, measure, manage, and display advertising on the services or on other services; understand your usage of the Services and other services in order to serve customized ads and remember that you are logged into the Services. By using your browser settings, you may block cookies or adjust settings for notifications when a cookie is set.</p><p>Additionally, you may encounter \"cookies\" or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties</p><p><br></p><p>WHAT SECURITY MEASURES WE APPLY</p><p>We maintain commercially reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy, and to protect against unauthorized access or alteration to, disclosure, or destruction of your Information. We may, for example, use encryption technology to secure your Information by utilizing Secure Socket Layer (SSL) software. Only those authorized employees, contractors, and agents who need to know your Information in connection with the performance of their services are allowed to access this Information.</p><p>It is important for you to protect yourself against unauthorized access to your password and to your devices used to access our Services. You are responsible for keeping your password confidential. For example, ensure that you sign off when you have finished using a shared device.</p><p>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our Platform and any transmission is at your own risk.</p><p><br></p><p>CHANGES TO OUR POLICY</p><p>Our business changes constantly, and our Privacy Policy may therefore also need to change. We reserve the right to change the policy at any time. We will post the current version of this Privacy Policy on the Platform and each such change will be effective upon posting on the Platform or upon the date designated by us as the \"effective date\".</p><p>We may e-mail periodic reminders of our notices and conditions, but you should check our Platform frequently to see recent changes.</p><p>It is your obligation to regularly check the Privacy Policy. Your continued use of the Platform following any such change constitutes your agreement to this Privacy Policy as so modified</p><p><br></p><p>CONTACT INFORMATION</p><p>If you have any concerns, questions or comments about your Information or our Privacy Policy, please contact us&nbsp;with thorough description at following:</p>",
 *                        "contactInfo": "<h2 class=\"ql-align-center\"><strong style=\"color: rgb(255, 194, 102);\">Your personal information is</strong><strong> </strong></h2><p><br></p><p><strong>safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul>"
 *                    }
 *                },
 *                "driver": {
 *                    "_id": "5dea892ed85c19035ebf1238",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "najam.sahto@gmail.com",
 *                    "password": "$2b$10$jeLNLonOzCtta7I2rcVzXuf.yMQCBdd8OmXnQn4T2Xze8RdRrIwfu",
 *                    "full_name": "Najam",
 *                    "contact_number": "03012999901",
 *                    "address": "Gulshan",
 *                    "created_at": "2019-12-06T17:00:30.248Z",
 *                    "updated_at": "2019-12-21T09:17:00.925Z",
 *                    "__v": 0,
 *                    "fcm_token": "diLyMin-RYI:APA91bFAAsTj-4mkvLOgVg9eDCtwxflmxaEQ2T_oAamgAz3xXhW2v1wlbytzzfWDhPXG6Kr2LWxwSKu1oLfMe3ciobwHiRZVA8dPCKBxBdiTMVkol85Q2tFkDk-kkdbfEqz7COQt-ftv",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWE4OTJlZDg1YzE5MDM1ZWJmMTIzOCIsInR5cGUiOjQsImlhdCI6MTU3NjkxOTgyMH0.HLD-AmOo7Nlz63x3Xyqqth_8nHm4XRxpm01vliZ_izU"
 *                }
 *            },
 *            {
 *                "_id": "5df52f914648a37afa44d102",
 *                "address": {
 *                    "pickup": {
 *                        "coordinates": {
 *                            "latitude": 24.9210435,
 *                            "longitude": 67.10559360000002
 *                        },
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "area_id": "5d7605099b5f0f76ee4f68ae",
 *                        "shop_no": "NA-Class 190/219",
 *                        "locality": "Karachi"
 *                    },
 *                    "delivery": {
 *                        "coordinates": {
 *                            "latitude": 24.90920783669007,
 *                            "longitude": 67.1299919120278
 *                        },
 *                        "alias": "home",
 *                        "city_id": "5d7603909b5f0f76ee4f68ad",
 *                        "full_name": "Najam ul Saqib",
 *                        "email": "najam.sahto@gmail.com",
 *                        "contact_number": "03012999901",
 *                        "locality": "Gulstan-e-Johar, Block 18",
 *                        "landmark": "Rabia City",
 *                        "house_no": "Flat 506, Bait ul Hina",
 *                        "gps_address": "32, Block 18 Gulistan-e-Johar, Karachi, Karachi City, Sindh, Pakistan",
 *                        "city": {
 *                            "_id": "5d7603909b5f0f76ee4f68ad",
 *                            "areas": [
 *                                "5d7605099b5f0f76ee4f68ae",
 *                                "5d7605219b5f0f76ee4f68af",
 *                                "5dea5254d85c19035ebf1217",
 *                                "5dea52b5d85c19035ebf1218",
 *                                "5dea52bfd85c19035ebf1219",
 *                                "5dea52d0d85c19035ebf121a",
 *                                "5dea52e0d85c19035ebf121b",
 *                                "5dea52eed85c19035ebf121c",
 *                                "5df635134648a37afa44d108",
 *                                "5e05acca954bc84f45786dd2",
 *                                "5e05acf1954bc84f45786dd3",
 *                                "5e05acfb954bc84f45786dd4",
 *                                "5e05ad5e954bc84f45786dd5",
 *                                "5e262d10d21fe166d8c93049",
 *                                "5e262d43d21fe166d8c9304a",
 *                                "5e2ac47dd21fe166d8c930b3",
 *                                "5e469966d21fe166d8c9356f"
 *                            ],
 *                            "status": 1,
 *                            "name": "Karachi",
 *                            "created_at": "2019-09-09T07:47:28.591Z",
 *                            "updated_at": "2020-02-14T12:58:14.336Z",
 *                            "__v": 0
 *                        }
 *                    }
 *                },
 *                "status": 1,
 *                "is_express_delivery": false,
 *                "payment_type": 1,
 *                "discount": 0,
 *                "delivery_charges": 150,
 *                "driver_assigned": true,
 *                "is_delivered_by_store": false,
 *                "store_paid": false,
 *                "slot_id": "5debf6ec68a40316a20bfb05",
 *                "deliver_start_time": "2019-12-15T09:00:00.000Z",
 *                "deliver_end_time": "2019-12-15T11:00:00.000Z",
 *                "customer_id": "5dea7a2bd85c19035ebf122b",
 *                "store_id": "5d7607c59b5f0f76ee4f68b0",
 *                "products": [
 *                    {
 *                        "pictures": [
 *                            "00400015.png"
 *                        ],
 *                        "_id": "5df52f914648a37afa44d105",
 *                        "product_id": "5d7f2fc2d22f1e78b7671fcc",
 *                        "size": "3 Ltr",
 *                        "price": 700,
 *                        "count": 1,
 *                        "name": "Dalda - Cooking Oil Bottle"
 *                    }
 *                ],
 *                "total_amount": 700,
 *                "taxes": [],
 *                "total_amount_after_tax": 700,
 *                "commission_percentage": 2,
 *                "admin_commission_amount": 27.34,
 *                "store_payout_amount": 1339.66,
 *                "order_id": "a76ead2",
 *                "created_at": "2019-12-14T18:53:05.750Z",
 *                "updated_at": "2020-03-18T11:14:52.200Z",
 *                "__v": 0,
 *                "driver_id": "5dea892ed85c19035ebf1238",
 *                "store": {
 *                    "_id": "5d7607c59b5f0f76ee4f68b0",
 *                    "picture": "12.png",
 *                    "has_express_delivery": false,
 *                    "drivers": [
 *                        "5d79f10ed22f1e78b7671d74",
 *                        "5dea892ed85c19035ebf1238"
 *                    ],
 *                    "status": 1,
 *                    "timings": {
 *                        "open_time": "12:00",
 *                        "close_time": "21:00"
 *                    },
 *                    "owner": {
 *                        "email": "ham.hassansiddiqui@gmail.com",
 *                        "password": "$2b$10$yTWjJmy7DS2R6h8zyDr.6unwkX0teyzU50lT4pvoQo3NYTHZBKmQu",
 *                        "full_name": "Hammad Hassan",
 *                        "contact_number": "03333743790"
 *                    },
 *                    "self_delivery": false,
 *                    "address": [
 *                        {
 *                            "_id": "5d7607c59b5f0f76ee4f68b1",
 *                            "coordinates": {
 *                                "latitude": 24.9210435,
 *                                "longitude": 67.10559360000002
 *                            },
 *                            "city_id": "5d7603909b5f0f76ee4f68ad",
 *                            "area_id": "5e262d10d21fe166d8c93049",
 *                            "shop_no": "NA-Class 190/219",
 *                            "locality": "Karachi",
 *                            "unique_link": "TKhr3"
 *                        }
 *                    ],
 *                    "name": "METRO",
 *                    "commission": 3,
 *                    "created_at": "2019-09-09T08:05:25.721Z",
 *                    "updated_at": "2020-03-05T06:26:57.905Z",
 *                    "__v": 0,
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsInR5cGUiOjIsImlhdCI6MTU4MzM4ODM4NX0.4uZ9x7xPDnYiRisnZJ7a0UPep8LRYYOD8KXxgi6J-7o",
 *                    "sku_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzYwN2M1OWI1ZjBmNzZlZTRmNjhiMCIsImlhdCI6MTU3ODkxMTA4Mn0.k-Ek52UwRftyj8hywTqFUneWb1kW8_pfocE0ayMaFZI",
 *                    "storeCategory": "5e4fb5e3beee3369a6b32a0d",
 *                    "delivery_charges": [
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389a",
 *                            "order_amount": 500,
 *                            "charges": 100
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389b",
 *                            "order_amount": 800,
 *                            "charges": 50
 *                        },
 *                        {
 *                            "_id": "5e5798dc89c6c4420e8f389c",
 *                            "order_amount": 1001,
 *                            "charges": 30
 *                        }
 *                    ],
 *                    "storeInfo": {
 *                        "faq": "<p>dfdf</p><p><br></p><p>a</p><p>d</p><p>s</p>",
 *                        "termAndCondition": "<h2>Term and condition</h2><h2>Term and condition</h2><h2>Term and condition</h2><h2><br></h2>",
 *                        "privacyAndPolicy": "<p>Last Updated: May 25, 2019</p><p>Thank you for using aapkidokan.com services. We are dedicated to provide you the best online shopping and delivery experience possible. This Privacy Policy outlines how we respect and value the trust you put in aapkidokan.com. This Policy applies regardless of how you access the aapkidokan.com platform - whether this is via a mobile app or web interface.</p><p><br></p><p>INFORMATION WE COLLECT</p><p>When you use our website or mobile application, you may provide us with information about yourself. For instance, when you create an account with aapkidokan.com you provide us with personal information like your name, email address, and phone number. And if you place an order with aapkidokan.com, we collect information including your address and the details of your order.</p><p>If you log into the services through a third-party service, both we and that third-party may receive some information about you and your use of the service. For example, if you choose to log into the services with your Facebook account, we may receive information from Facebook, such as your name, e-mail address, and public profile information about your contacts. We may also offer social sharing tools that let you share actions on the services with other websites and vice versa. In those cases, the providers of those tools may receive information about you when you use those tools. You should check the privacy policies of these third party services and your settings there for more information.</p><p>We use your contact information to send you offers based on your previous orders and your interests when you use the aapkidokan.com services, either through a browser or mobile app, we automatically receive some technical information about the hardware and software that is being used.</p><p><br></p><p>USE OF YOUR INFORMATION</p><p><strong> We may use the information we collect for various purposes including:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Manage and improve the services aapkidokan.com provide to you</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Administer and operate your account</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Process your orders, receive payments for the orders</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Understand your shopping behavior to develop and improve our products and services and offer you customized content (including advertising and promotions), such as prominently displaying items you purchase frequently</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> Provide customer service, respond to your communications and requests, and resolve complaint and disputes and contact you about your use of appkidokan.com services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">Inform you about online offers, products, services and important changes to the Website and our services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users' activity on our Website.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\">We identify and use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information.</li></ul><p>DISCLOSING YOUR PERSONAL INFORMATION</p><p><strong> Your personal information is safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"http://localhost:4201/assets/img/point.jpg\"> We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul><p>COOKIES AND OTHER TRACKING TECHNOLOGIES</p><p>We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests.</p><p>Cookies are small text files that are sent by your computer when you access our services through a browser. We may use session cookies (which expire when you close your browser), persistent cookies (which expire when you choose to clear them from your browser), and other identifiers to collect information from your browser or device that helps us personalize your experience, measure, manage, and display advertising on the services or on other services; understand your usage of the Services and other services in order to serve customized ads and remember that you are logged into the Services. By using your browser settings, you may block cookies or adjust settings for notifications when a cookie is set.</p><p>Additionally, you may encounter \"cookies\" or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties</p><p><br></p><p>WHAT SECURITY MEASURES WE APPLY</p><p>We maintain commercially reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy, and to protect against unauthorized access or alteration to, disclosure, or destruction of your Information. We may, for example, use encryption technology to secure your Information by utilizing Secure Socket Layer (SSL) software. Only those authorized employees, contractors, and agents who need to know your Information in connection with the performance of their services are allowed to access this Information.</p><p>It is important for you to protect yourself against unauthorized access to your password and to your devices used to access our Services. You are responsible for keeping your password confidential. For example, ensure that you sign off when you have finished using a shared device.</p><p>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our Platform and any transmission is at your own risk.</p><p><br></p><p>CHANGES TO OUR POLICY</p><p>Our business changes constantly, and our Privacy Policy may therefore also need to change. We reserve the right to change the policy at any time. We will post the current version of this Privacy Policy on the Platform and each such change will be effective upon posting on the Platform or upon the date designated by us as the \"effective date\".</p><p>We may e-mail periodic reminders of our notices and conditions, but you should check our Platform frequently to see recent changes.</p><p>It is your obligation to regularly check the Privacy Policy. Your continued use of the Platform following any such change constitutes your agreement to this Privacy Policy as so modified</p><p><br></p><p>CONTACT INFORMATION</p><p>If you have any concerns, questions or comments about your Information or our Privacy Policy, please contact us&nbsp;with thorough description at following:</p>",
 *                        "contactInfo": "<h2 class=\"ql-align-center\"><strong style=\"color: rgb(255, 194, 102);\">Your personal information is</strong><strong> </strong></h2><p><br></p><p><strong>safe with us, we will never disclose your information to anyone outside the aapkidokan.com except where we have your consent, and we may also disclose the information where:</strong></p><ul><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;To other companies who provide a service to us, For example, we may provide information to advertisers to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We will share your information with entities outside of the Services when we have your consent to do so or it is done at your direction.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with our retail partners in order to provide and maintain the Services.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information with third parties to process information on our behalf or to provide certain services (such as delivery services, advertising services, or information to better tailor our services to you). For the purposes of this processing or provision of services, we may share your information with such third parties under appropriate confidentiality provisions.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;For legal purposes, we may share your information when we believe that the disclosure is reasonably necessary to (a) comply with applicable laws, regulations, legal process, or requests from law enforcement or regulatory authorities, (b) prevent, detect, or otherwise handle fraud, security, or technical issues, and (c) protect the safety, rights, or property of any person, the public, or aapkidokan.com.</li><li><img src=\"https://aapkidokan.com/assets/img/point.jpg\">&nbsp;We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company. We may also share your information between and among aapkidokan.com and other companies under common control and ownership.</li></ul>"
 *                    }
 *                },
 *                "driver": {
 *                    "_id": "5dea892ed85c19035ebf1238",
 *                    "picture": null,
 *                    "is_online": true,
 *                    "is_logout": false,
 *                    "status": 1,
 *                    "email": "najam.sahto@gmail.com",
 *                    "password": "$2b$10$jeLNLonOzCtta7I2rcVzXuf.yMQCBdd8OmXnQn4T2Xze8RdRrIwfu",
 *                    "full_name": "Najam",
 *                    "contact_number": "03012999901",
 *                    "address": "Gulshan",
 *                    "created_at": "2019-12-06T17:00:30.248Z",
 *                    "updated_at": "2019-12-21T09:17:00.925Z",
 *                    "__v": 0,
 *                    "fcm_token": "diLyMin-RYI:APA91bFAAsTj-4mkvLOgVg9eDCtwxflmxaEQ2T_oAamgAz3xXhW2v1wlbytzzfWDhPXG6Kr2LWxwSKu1oLfMe3ciobwHiRZVA8dPCKBxBdiTMVkol85Q2tFkDk-kkdbfEqz7COQt-ftv",
 *                    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWE4OTJlZDg1YzE5MDM1ZWJmMTIzOCIsInR5cGUiOjQsImlhdCI6MTU3NjkxOTgyMH0.HLD-AmOo7Nlz63x3Xyqqth_8nHm4XRxpm01vliZ_izU"
 *                }
 *            }
 *        ],
 *        "paginationVariables": {
 *            "pageNo": 1,
 *            "perPage": 10,
 *            "totalItems": 186
 *        }
 *    }
 *}
 *
 * @apiError ValidationError 401
 *
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
 *}
 */
router.put('/:id', OrderController.updateOrder);
/**
 * @api {Put} /api/admin/order/:id Update Order
 * @apiName  Update Order
 * @apiGroup Admin-Order
 *
 *
 *  @apiParam (Body) {String} _id: Unique Order Id
 *  @apiParam (Body) {Object} address: An Object with fields "pickup" , (Displaying information regarding pickup), "delivery" ("coordinates", "alias", "city_id", "full_name", "email", "contact_number", "locality", "house_no", "gps_address", "city").
 *  @apiParam (Body) {String} status: Status of the Order
 *  @apiParam (Body) {boolean} is_express_delivery: Is Express Delivery
 *  @apiParam (Body) {number} payment_type : Type of Payment
 *  @apiParam (Body) {number} discount: Discount in our Order
 *  @apiParam (Body) {number} delivery_charges: Delivery Charges
 *  @apiParam (Body) {Boolean} driver_assigned: Is Driver Assigned
 *  @apiParam (Body) {Boolean} is_delivered_by_store: Is Products Delivered by Store
 *  @apiParam (Body) {Boolean} store_paid : Store Paid
 *  @apiParam (Body) {String} slot_id: Slot Id
 *  @apiParam (Body) {String} deliver_start_time: Delivery Start Time
 *  @apiParam (Body) {String} deliver_end_time : Delivery End Time
 *  @apiParam (Body) {String} customer_id: Customer Id
 *  @apiParam (Body) {String} store_id : Store Id
 *  @apiParam (Body) {Array[]} products : An Array of objects with fields "pictures" (pictures), "id" (Unique Id), "product_id" (Product Id), "size" (Size of the products ), "price" (Price of the product), "count" (Count of the product), "name" (Name)
 *  @apiParam (Body) {String} total_amount: Total Amount to be Paid
 *  @apiParam (Body) {Array} taxes: Taxes
 *  @apiParam (Body) {String} total_amount_after_tax: Total Amount after paying tax
 *  @apiParam (Body) {String} commission_percentage: Percentage Commission,
 *  @apiParam (Body) {String} admin_commission_amount: Admin's Commission Amount
 *  @apiParam (Body) {String} store_payout_amount: Store Payout Amount
 *  @apiParam (Body) {String} order_id: Order Id
 *  @apiParam (Body) {String} created_at: Created At
 *  @apiParam (Body) {String} updated_at: Updated At
 *  @apiParam (Body) {String} driver_id : Driver Id
 *  @apiParam (Body) {Object} store : An Object with field names "id" (Unique Id of the Store), "picture" (Picture of the Store), "has_express_delivery" (Boolean), "drivers" (Array of Drivers), "status" (Status), "timings" (open_time, close_time) , "owner" (Details of Owner with "email", "password", "full_name", "contact_number"), "self_delivery" (Store has Self Delivery), "address" (an array with fields "_id", "coordinates", "city_id", "area_id", "shop_no", "locality", "gps_address", "unique_link"), "name" (Name), "commission" (Commission), "created_at" (Created At), "updated_at" (Updated At), "auth_token" (Authorisation token), "sku_token" (SKU token), "storeCategory" (Store Category), "delivery_charges" (An Array with fields "order_amount" (Order Amount), "charges" (Charges))
 *  @apiParam (Body) {Object} driver: An Object with field names "_id" (Unique Id of the Driver), "picture" (Picture of the Driver), "is_online" (Is Online), "is_logout" (Is Logout), "status" (Status of the Driver), "email" (EmailId of the Driver), "password" (Password of the Driver),  "full_name" (Full Name of the Driver), "contact_number" (Contact Number), "address" (Address pf the Driver), "driving_license" (Driving License of the Driver), "created_at" (Created Date of the Driver), "updated_at" (Updated Date of the Driver),"fcm_token" (FCM token), "auth_token" (Auth Token)
 *  @apiSuccessExample Success-Response
 *  HTTP/1.1 200 OK
 *        "{
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "updateOrder": {
 *            "address": {
 *                "pickup": {
 *                    "coordinates": {
 *                        "latitude": 24.9128145,
 *                        "longitude": 67.0802142
 *                    },
 *                    "city_id": "5d7603909b5f0f76ee4f68ad",
 *                    "area_id": "5d7605099b5f0f76ee4f68ae",
 *                    "shop_no": "37",
 *                    "locality": "Gulshan"
 *                },
 *                "delivery": {
 *                    "coordinates": {
 *                        "latitude": 24.86092389611868,
 *                        "longitude": 67.00235527381894
 *                    },
 *                    "alias": "home",
 *                    "city_id": "5d7603909b5f0f76ee4f68ad",
 *                    "full_name": "Khushal",
 *                    "email": "khushalp32@gmail.com",
 *                    "contact_number": "9711669906",
 *                    "locality": "Karachi block 1",
 *                    "house_no": "123",
 *                    "gps_address": "Data Center, Bhimpura Karachi, Karachi City, Sindh, Pakistan"
 *                }
 *            },
 *            "status": 1,
 *            "is_express_delivery": false,
 *            "payment_type": 1,
 *            "discount": 0,
 *            "delivery_charges": 150,
 *            "driver_assigned": true,
 *            "is_delivered_by_store": false,
 *            "store_paid": false,
 *            "_id": "5dea98bd68a40316a20bf8ab",
 *            "slot_id": "5de64674d85c19035ebf06d9",
 *            "deliver_start_time": "2019-12-07T07:00:00.000Z",
 *            "deliver_end_time": "2019-12-07T09:00:00.000Z",
 *            "customer_id": "5ddd17e6d85c19035ebf0338",
 *            "store_id": "5d9eda647a30b1642ce9cb77",
 *            "products": [
 *                {
 *                    "pictures": [],
 *                    "_id": "5dea98bd68a40316a20bf8ac",
 *                    "product_id": "5de90bced85c19035ebf11d3",
 *                    "size": "5kg",
 *                    "price": 960,
 *                    "count": 2,
 *                    "name": "Laar - Lazzat Basmati Rice (Sella) 5kg"
 *                }
 *            ],
 *            "total_amount": 1920,
 *            "taxes": [],
 *            "total_amount_after_tax": 1920,
 *            "commission_percentage": 1,
 *            "admin_commission_amount": 19.2,
 *            "store_payout_amount": 1900.8,
 *            "order_id": "5f8fd26",
 *            "created_at": "2019-12-06T18:06:53.519Z",
 *            "updated_at": "2020-03-20T04:39:48.389Z",
 *            "__v": 0,
 *            "driver_id": "5dea53edd85c19035ebf121d"
 *        }
 *    }
 *}
 * @apiError INTERNAL SERVER Error Address is Required
 * @apiErrorExample
 * {
 *    "success": false,
 *    "singleStringMessage": "Cannot read property 'delivery' of undefined",
 *    "error": {}
 *}
 *
 */

router.put('/:id/remove-product', OrderController.removeProductFromOrder);
router.get('/today-count', OrderController.getTodayOrdersCount);
/**
 * @api {Get} /api/admin/order/today-count Get Order Today Count
 * @apiName Get Order Count
 * @apiGroup Admin-Order
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 *
 * {
 *    "success": true,
 *    "code": 200,
 *    "data": {
 *        "ordersCount": 2
 *    }
 *}

 * @apiError ValidationError 401
 * @apiErrorExample
 * {
 *    "success": false,
 *    "error": 401
}
 *
 */
router.post('/checkout', CustomerOrderController.placeOrder);

module.exports = router;

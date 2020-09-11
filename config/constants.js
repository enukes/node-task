const constants = {

  authSecretToken: 'enuke',

  status: { active: 1, inactive: 2, pending: 3 },

  googleClientId: '348600376683-aj6hh12mvd23tgritho98vbgs3fme88q.apps.googleusercontent.com',

  facebookAuth: {
    clientId: '2050097381958688',
    clientSecret: '331af030e2ef57eefdb8b822ef46dddc'
  },

  otp: {

    username: 'aapkidokan_api',
    password: 'pak12345',
    originator: '99095',

    authKey: '250114Acu4D4Sl5c04d060',
    expiry: 5,
    sender: 'DEMOMSG',
    countryCode: 92 // pakistan => 92
  },

  slots: {
    days: 7, // max days for deliver
    eachSlotTime: 2, // hours time for each slot
    maximumOrders: 5
  },

  defaultDeliveryCharges: [
    {
      order_amount: 500,
      charges: 100
    },
    {
      order_amount: 800,
      charges: 50
    },
    {
      order_amount: 1000,
      charges: 50
    }
  ],
  pagination: {
    pageNo: 1,
    perPage: 10
  },
  sort: {
    name: 'created_at',
    sortType: 1
  },

  baseURL: 'http://localhost:5000',

  adminMailRecipients: ['khushal.pahuja@enukesoftware.com'],

  mailer: {
    service: 'gmail',
    email: 'khushal.pahuja@enukesoftware.com',
    password: 'Quartz@9711',
    mailFrom: '"Aapki Dokan" <no-reply@aapkidokan.com>'
  },

  // Firebase server configuration
  fcmCreds: {
    databaseUrl: 'https://aapkidokan-4c311.firebaseio.com'
  },

  notificationTypes: {
    orderPlace: '1',
    orderStatusChange: '2'
  },

  momentTimezone: 'Asia/Kolkata',
  homeConfigWidgets: {
    BANNERS: 'Banners',
    FEATURED_PRODUCTS: 'Featured Products',
    OFFERS: 'Offers',
    CATEGORIES: 'Categories',
    FAVORITE_PRODUCTS: 'Favorite Products'
  }
};

module.exports = constants;

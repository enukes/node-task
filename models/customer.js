const mongoose = require('mongoose');
const messages = require('../common/messages');

const pointSchema = require('./common/point-schema');

const schema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, messages.FULL_NAME_REQUIRED]
  },
  email: {
    type: String,
    required: false,
    sparse: true,
    unique: true
  },
  contact_number: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: false
  },
  birth_date: {
    type: Date,
    required: false
  },
  address: [{
    house_no: {
      type: String,
      required: true
    },

    full_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },

    contact_number: {
      type: String,
      required: true
    },

    locality: {
      type: String,
      required: true
    },

    coordinates: {

      latitude: {
        type: Number,
        required: false
      },

      longitude: {
        type: Number,
        required: false
      }
    },

    gps_address: {
      type: String,
      required: false
    },

    landmark: {
      type: String,
      required: false
    },

    city_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },

    alias: {
      type: String,
      required: true
    },
    what_3_words: {
      type: String,
      required: false
    }

  }],
  picture: {
    type: String,
    required: false,
    default: null
  },
  gmail_id: {
    type: String,
    required: false,
    default: null
  },
  facebook_id: {
    type: String,
    required: false,
    default: null
  },


  is_logout: {
    type: Boolean,
    default: false
  },

  otp: Number,
  otp_created: Date,
  fcm_token: String,
  auth_token: String,
  verification_token: String,
  password_reset_token: String,
  status: {
    type: Number,
    enum: [1, 2, 3, 4], // 1-> Active , 2->Inactive, 3-> Pending, 4-> Verified
    default: 3
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

schema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email Already Exists'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Customer', schema);

const mongoose = require('mongoose');
const messages = require('../common/messages');

const { Schema } = mongoose;

const addressSchema = new Schema({
  shop_no: {
    type: String,
    required: true
  },

  locality: {
    type: String,
    required: true
  },

  area_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
    required: true
  },

  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  geoPoint: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },

  gps_address: {
    type: String,
    required: false
  },

  unique_link: {
    type: String
  }
});

addressSchema.index({ geoPoint: '2dsphere' });

const schema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false,
      unique: true
    },
    contact_number: {
      type: String,
      required: false,
      unique: true
    },

    sku_token: {
      type: String,
      required: false
    },

    timings: {
      open_time: {
        type: String,
        required: true
      },
      close_time: {
        type: String,
        required: true
      }
    },
    address: [{
      type: addressSchema,
      required: true
    }],
    picture: {
      type: String,
      required: true,
      default: null
    },
    commission: {
      type: Number,
      required: true
    },
    owner: {
      full_name: {
        type: String,
        required: true
      },
      contact_number: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    },

    has_express_delivery: {
      type: Boolean,
      default: false
    },

    self_delivery: {
      type: Boolean,
      required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, messages.CATEGORY_ID_REQUIRED],
    }],
    storeInfo: {
      faq: {
        type: String
      },
      termAndCondition: {
        type: String
      },
      privacyAndPolicy: {
        type: String
      },
      contactInfo: {
        type: String
      }
    },
    drivers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver'
    }],

    otp: Number,
    auth_token: String,
    verification_token: String,
    password_reset_token: String,
    status: {
      type: Number,
      enum: [
        1, // Active
        2 // Inactive
      ],
      default: 2
    },
    storeApproval: {
      type: String,
      enum: [
        'Active',
        'Rejected',
        'Pending'
      ],
      default: 'Pending'
    },
    isFreeDelivery: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Store', schema);

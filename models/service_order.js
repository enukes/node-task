const mongoose = require('mongoose');
const messages = require('../common/messages');

const schema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  service_provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true
  },
  address: {
    pickup: {
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

      coordinates: {

        latitude: {
          type: Number,
          required: false
        },

        longitude: {
          type: Number,
          required: false
        }
      }
    },

    delivery: {
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
      }
    }
  },
  status: {
    type: Number,
    enum: [
      1, // Placed
      2, // Fulfilled
      3, // UnFulfilled
      4 // Cancelled
    ],
    default: 1
  },
  deliver_start_time: {
    type: Date,
    required: true
  },
  deliver_end_time: {
    type: Date,
    required: true
  },
  slot_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot'
  },
  transaction_id: {
    type: String
  },
  payment_type: {
    type: Number,
    enum: [
      1, // COD
      2 // Credit Card
    ],
    default: 1
  },
  services: [
    {
      service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      },
      name: {
        type: String,
        required: [true, messages.NAME_REQUIRED]
      },
      pictures: [{
        type: String,
        required: [true, messages.PRODUCT_PICTURE_REQUIRED]
      }],
      size: {
        type: String,
        required: [true, messages.PRODUCT_SIZE_REQUIRED]
      },
      price: {
        type: Number,
        required: [true, messages.PRICE_REQUIRED],
        min: [1, messages.PRICE_GREATER_THAN_0]
      },
      count: {
        type: Number,
        required: [true, messages.COUNT_REQUIRED],
        min: [1, messages.COUNT_GREATER_THAN_0]
      }
    }],
  total_amount: {
    type: Number,
    required: [true, messages.TOTAL_AMOUNT_REQUIRED],
    min: [0, messages.TOTAL_AMOUNT_NON_NEGATIVE]
  },
  total_amount_after_tax: {
    type: Number,
    required: [true, messages.TOTAL_AMOUNT_REQUIRED],
    min: [0, messages.TOTAL_AMOUNT_NON_NEGATIVE]
  },
  coupon: {
    type: Object
  },
  discount: {
    type: Number,
    min: [0, messages.DISCOUNT_NON_NEGATIVE],
    default: 0
  },
  taxes: [{
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }],
  service_order_id: {
    type: String,
    required: true
  },
  undelivered_description: {
    type: String
  },
  commission_percentage: {
    type: Number,
    required: true
  },
  admin_commission_amount: {
    type: Number,
    required: true
  },
  service_provider_payout_amount: {
    type: Number,
    required: true
  },
  service_provider_paid: {
    type: Boolean,
    required: true,
    default: false
  },

  service_provider_paid_date: {
    type: Date,
    required: false
  },
  cancelled_by: {
    type: String,
    enum: ['customer', 'store']
  },
  rating: Number,
  review: String,
  delivery_code: {
    type: String,
    unique: true
  }
},

 {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('ServiceOrder', schema);

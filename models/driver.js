const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  contact_number: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: true
  },
  birth_date: {
    type: Date,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  driving_license: {
    type: String,
    required: false
  },
  driving_license_picture: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: false,
    default: null
  },
  percentageCommission: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100
  },
  is_online: {
    type: Boolean,
    default: true
  },

  is_logout: {
    type: Boolean,
    default: false
  },

  gmail_id: {
    type: String,
    required: false
  },
  facebook_id: {
    type: String,
    required: false
  },
  otp: Number,
  otp_created: Date,
  fcm_token: String,
  auth_token: String,
  verification_token: String,
  password_reset_token: String,
  status: {
    type: Number,
    enum: [1, 2], // 1-> Active , 2->Inactive
    default: 2
  },
  driverApproval: {
    type: String,
    enum: [
      'Accepted',
      'Rejected',
      'Pending'
    ],
    default: 'Pending'
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Driver', schema);

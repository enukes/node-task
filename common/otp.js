/* eslint-disable no-console */

const moment = require('moment-timezone');
const rp = require('request-promise');
const helper = require('./helper');
const config = require('../config/constants');
const AuthService = require('../services/auth');
const Mailer = require('./mailer');
const apiError = require('./api-errors');
const messages = require('./messages');
const { base } = require('../models/slot');

module.exports = {
  async send(contactNumber, type,verification_token,baseUrl) {
    try {
      const hostName=config.baseURL;
      const contact = config.otp.countryCode + contactNumber.slice(-10);
      const user = await AuthService.getUser({ contact_number: contactNumber }, type);
      if(!user){
         user = await AuthService.getUser({ email: contactNumber }, type);
      }
      Mailer.sendMail({
        to: [user.email],
        from: 'aapkidokan@gmail.com',
        subject: 'Account created',
        html: `<h4>Dear ${user.full_name}!</h4><p>Please click on the below link for activate your account.</p><br><a href="${hostName}${baseUrl}/verify-account?token=${verification_token}">${hostName}${baseUrl}/verify-account?token=${verification_token}</a>`
      });
    } catch (error) {
      console.log(error);
    }
  },
  async sendPasswordResetLink(user, type,baseUrl,genrateToken) {
    try {
      const hostName=config.baseURL;
      if (type==5) base="service-provider";
      else base=baseUrl;
      if(!user){
         user = await AuthService.getUser({ email: contactNumber }, type);
      }
      Mailer.sendMail({
        to: [user.email],
        from: 'aapkidokan@gmail.com',
        subject: 'Reset Password',
        html: `<h4>Dear ${user.full_name}!</h4><p>Please click on the below link for reset your password.</p><br><a href="${hostName}${base}/reset-password?token=${genrateToken}">${hostName}${baseUrl}/reset-password?token=${genrateToken}</a>`
      });
    } catch (error) {
      console.log(error);
    }

  },
  async verify(contactNumber, otp, user) {
    try {
      if (`${otp}` === `${user.otp}`) {
        let date = moment(user.otp_created);
        date = date.add(config.otp.expiry, 'minutes');
        const current = moment();
        const result = current.isSameOrBefore(date);

        if (result) {
          return {
            success: true,
            message: messages.OTP_VIA_CONTACT_NUMBER
          };
        }
        return {
          success: false,
          message: messages.OTP_EXPIRED
        };
      }
      return {
        success: false,
        message: messages.OTP_MISMATCH
      };
    } catch (error) {
      return {
        success: false,
        message: messages.OTP_MISMATCH
      };
    }
  },
  async verifyToken(token, user) {
    try {
      if (`${token}` === `${user.verification_token}`) {
          return {
            success: true,
            message: messages.LINK_VIA_EMAIL
          };
      }
      return {
        success: false,
        message: messages.TOKEN_MISMATCH
      };
    } catch (error) {
      return {
        success: false,
        message: messages.TOKEN_MISMATCH
      };
    }
  }
};

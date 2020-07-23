/* eslint-disable no-console */

const moment = require('moment-timezone');
const rp = require('request-promise');
const helper = require('../common/helper');
const config = require('../config/constants');
const AuthService = require('../services/auth');
const Mailer = require('../common/mailer');
const apiError = require('../common/api-errors');
const messages = require('../common/messages');

module.exports = {
  async send(contactNumber, type) {
    try {
      const contact = config.otp.countryCode + contactNumber.slice(-10);
      const user = await AuthService.getUser({ contact_number: contactNumber }, type);
      let OTP;
      if (user.otp) {
        let date = moment(user.otp_created);
        date = date.add(config.otp.expiry, 'minutes');

        const current = moment();

        const result = current.isSameOrBefore(date);

        if (result) {
          OTP = user.otp;
        } else {
          OTP = helper.generateOTP();
          const updatedUser = await AuthService.updateUser(
            { otp: OTP, otp_created: moment().toDate() },
            { contact_number: contactNumber },
            type
          );
          if (!updatedUser) throw new apiError.InternalServerError();
        }
      } else {
        OTP = helper.generateOTP();
        const updatedUser = await AuthService.updateUser(
          { otp: OTP, otp_created: moment().toDate() },
          { contact_number: contactNumber },
          type
        );
        if (!updatedUser) throw new apiError.InternalServerError();
      }

      const options = {
        method: 'GET',
        uri: 'http://smsctp3.eocean.us:24555/api',
        qs: {
          action: 'sendmessage',
          username: config.otp.username,
          password: config.otp.password,
          originator: config.otp.originator,
          recipient: contact,
          messagedata: `${OTP} is your OTP for Encomendaria, Please don't share this with anyone.`
        },
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true

      };
      rp(options);

      Mailer.sendMail({
        to: [user.email],
        from: 'aapkidokan@gmail.com',
        subject: 'Account created',
        html: `<h4>Dear ${user.full_name}!</h4><p>${OTP} is your OTP for Encomendaria, Please don't share this with anyone.</p><br>`
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
  }
};

/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const rp = require('request-promise');
const config = require('../../config/constants');

const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const AuthService = require('../../services/auth');
const ResponseService = require('../../common/response');
const OTP = require('../../common/otp');
const googleAuth = require('../../common/google-auth');

class AuthController {
  async login(req, res) {
    try {
      const request = { ...req.body };

      const type = this.getUserType(req.baseUrl);

      // If no username provided, Throw error.
      if (!request.username) throw new apiError.ValidationError('username', messages.USERNAME_REQUIRED);

      request.username = request.username.toLowerCase();

      let user;
      // If no password provided, Throw unauthorized
      if (!request.password) throw new apiError.ValidationError('password', messages.PASSWORD_REQUIRED);

      if (type === 2) {
        let contact = request.username;

        if (contact.length >= 10) {
          contact = contact.slice(-10);
          contact = new RegExp(contact, 'i');

          user = await AuthService.getUser({ 'owner.contact_number': contact }, type);
        }

        if (!user) user = await AuthService.getUser({ 'owner.email': request.username }, type);
        if (!user) throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);

        if (user && user.status === 2) {
          throw new apiError.UnauthorizedError(messages.STORE_INACTIVE);
        }
        const matchBcrypt = await bcrypt.compare(request.password, user.owner.password);
        if (!matchBcrypt) {
          throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);
        }
      }else if(type === 4){
        let contact = request.username;

        if (contact.length >= 10) {
          contact = contact.slice(-10);
          contact = new RegExp(contact, 'i');

          user = await AuthService.getUser({ 'contact_number': contact }, type);
         
        }

        if (!user) user = await AuthService.getUser({ 'email': request.username }, type);
        if (!user) throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);

        if (user && user.status === 2) {
          throw new apiError.UnauthorizedError(messages.DRIVER_INACTIVE);
        }
        if (user && user.driverApproval === 'Rejected' || user.driverApproval==='Pending') {
          throw new apiError.UnauthorizedError(messages.DRIVER_APPROVAL);
        }
        const matchBcrypt = await bcrypt.compare(request.password, user.password);
        if (!matchBcrypt) {
          throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);
        }
      } else if(type === 3){
        let contact = request.username;

        if (contact.length >= 10) {
          contact = contact.slice(-10);
          contact = new RegExp(contact, 'i');

          user = await AuthService.getUser({ 'contact_number': contact }, type);
         
        }

        if (!user) user = await AuthService.getUser({ 'email': request.username }, type);
        if (!user) throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);

        if (user && user.status === 2) {
          throw new apiError.UnauthorizedError(messages.DRIVER_INACTIVE);
        }

        const matchBcrypt = await bcrypt.compare(request.password, user.password);
        if (!matchBcrypt) {
          throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);
        }
      }else {
        let contact = request.username;

        if (contact.length >= 10) {
          contact = contact.slice(-10);
          contact = new RegExp(contact, 'i');

          user = await AuthService.getUser({ contact_number: contact }, type);
        }

        if (user && user.status === 3) {
          throw new apiError.UnauthorizedError(messages.OTP_NOT_VERIFIED, {
            contact_number: user.contact_number,
            verification_token: user.verification_token,
            otp_verified: false
          });
        }
        if (user && user.status === 2) {
          throw new apiError.UnauthorizedError(messages.CUSTOMER_INACTIVE);
        }
        if (!user) {
          user = await AuthService.getUser({ email: request.username }, type);
          if (!user) throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);
          if (user.status === 3) {
            throw new apiError.UnauthorizedError(messages.OTP_NOT_VERIFIED, {
              contact_number: user.contact_number,
              verification_token: user.verification_token,
              otp_verified: false
            });
          }
          if (user && user.status === 2) {
            throw new apiError.UnauthorizedError(messages.CUSTOMER_INACTIVE);
          }
        }
        if (!user.password) {
          throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);
        }

        const matchBcrypt = await bcrypt.compare(request.password, user.password);
        if (!matchBcrypt) {
          throw new apiError.UnauthorizedError(messages.USERNAME_OR_PASSWORD_INVALID);
        }
      }

      // Remove password from response
      user.password = null;

      // Get JWT auth token and return with response
      const token = await this.getJwtAuthToken(user, type);
      const updationObj = {};

      // fcm_token
      if (request.fcm_token) {
        updationObj.fcm_token = request.fcm_token;
      }

      if (type === 3 || type === 4) {
        updationObj.is_logout = false;
      }

      if (type !== 1) {
        updationObj.auth_token = token;
      }

      const updatedUser = await AuthService.updateUser(updationObj, { _id: user._id }, type);
      if (!updatedUser) throw apiError.InternalServerError();

      const response = {
        token,
        user
      };

      return res.status(200).send(ResponseService.success(response));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async register(req, res) {
    try {
      const data = { ...req.body };
      const type = this.getUserType(req.baseUrl);

      if (!data.contact_number) throw new apiError.ValidationError('contact_number', messages.CONTACT_REQUIRED);
      if (!data.email) throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);

      data.email = data.email.toLowerCase();
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(data.password, salt);

      if (!hash) throw apiError.InternalServerError();

      data.password = hash;

      let user = await AuthService.getUser({ email: data.email }, type);
      if (user) {
        if (user.status === 3) await AuthService.deleteUser({ email: data.email }, type);
        else throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);
      }

      let contact = data.contact_number;

      if (contact.length >= 10) {
        contact = contact.slice(-10);
        contact = new RegExp(contact, 'i');
      } else {
        throw new apiError.ValidationError('contact_number', messages.CONTACT_INVALID);
      }

      user = await AuthService.getUser({ contact_number: contact }, type);
      if (user) {
        if (user.status === 3) await AuthService.deleteUser({ contact_number: contact }, type);
        else throw new apiError.ValidationError('contact_number', messages.CONTACT_ALREADY_EXIST);
      }

      data.verification_token = uuidv4();

      const userData = await AuthService.createUser(data, type);

      const newUser = JSON.parse(JSON.stringify(userData));
      delete newUser.password;
      delete newUser.created_at;
      delete newUser.updated_at;
      console.log(req.baseUrl);
      OTP.send(newUser.contact_number, type,data.verification_token,req.baseUrl);
      res.send(ResponseService.success({
        message: messages.LINK_VIA_EMAIL_ID
      }));
    } catch (err) {
      res.status(err.status || 500).send(ResponseService.failure(err));
    }
  }

  async verifyOTP(req, res) {
    try {
      const request = { ...req.body };
      const type = this.getUserType(req.baseUrl);

      // If otp field is missing, Throw validation error
      if (!request.otp) throw new apiError.ValidationError('otp', messages.OTP_REQUIRED);

      // If contact number field is missing, Throw validation error
      if (!request.contact_number) throw new apiError.ValidationError('contact_number', messages.CONTACT_REQUIRED);

      // If verification token is missing, Throw validation error
      if (!request.verification_token) throw new apiError.ValidationError('verification_token', messages.VERIFICATION_TOKEN_REQUIRED);

      // If no user, Throw not found error

      let response = {};

      let contact = request.contact_number;

      if (contact.length >= 10) {
        contact = contact.slice(-10);
        contact = new RegExp(contact, 'i');
      } else {
        throw new apiError.ValidationError('contact_number', messages.CONTACT_INVALID);
      }

      const user = await AuthService.getUser({
        verification_token: request.verification_token
      }, type);
      if (user === null) throw new apiError.ValidationError('verification_token', messages.VERIFICATION_TOKEN_INVALID);

      // Verify OTP sent to the user's contact number

      // Get JWT auth token and return with response
      const token = await this.getJwtAuthToken(user, type);

      const otpVerification = await OTP.verify(request.contact_number, request.otp, user);

      // otp match 123456

      if (otpVerification.success || request.otp === '123456') {
        const userObj = {
          status: config.status.active,
          $unset: { otp: 1, otp_created: 1, verification_token: 1 }
        };

        if (type !== 1) {
          userObj.auth_token = token;
        }

        // Update user with a password reset token
        await AuthService.updateUser(userObj, { contact_number: contact }, type);

        response = {
          user,
          token
        };
        return res.status(200).send(ResponseService.success(response));
      }
      if (otpVerification.message) {
        return res.status(422).send(ResponseService.failure({ message: otpVerification.message }));
      }
      return res.status(422).send(ResponseService.failure({ message: messages.OTP_MISMATCH }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
  async verifyAccount(req, res) {
    try {
      const request = { ...req.query };
      const type = this.getUserType(req.baseUrl);
    
      // If verification token is missing, Throw validation error
      if (!request.token) throw new apiError.ValidationError('verification_token', messages.VERIFICATION_TOKEN_REQUIRED);

      // If no user, Throw not found error

      let response = {};

      const user = await AuthService.getUser({
        verification_token: request.token
      }, type);
      if (user === null) throw new apiError.ValidationError('verification_token', messages.VERIFICATION_TOKEN_INVALID);
      
      // Get JWT auth token and return with response
      const token = await this.getJwtAuthToken(user, type);

      const tokenVerification = await OTP.verifyToken(request.token,user);

      // otp match 123456

      if (tokenVerification.success) {
        const userObj = {
          status: config.status.active,
          $unset: { otp: 1, otp_created: 1, verification_token: 1 }
        };

        if (type !== 1) {
          userObj.auth_token = token;
        }

        // Update user with a password reset token
        await AuthService.updateUser(userObj, { verification_token: request.token }, type);

        response = {
          user,
          token
        };
        return res.status(200).send(ResponseService.success(response));
      }
      if (tokenVerification.message) {
        return res.status(422).send(ResponseService.failure({ message: tokenVerification.message }));
      }
      return res.status(422).send(ResponseService.failure({ message: messages.TOKEN_MISMATCH }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async googleLogin(req, res) {
    try {
      const request = { ...req.body };
      const type = this.getUserType(req.baseUrl);

      if (!request.id_token) throw new apiError.ValidationError('id_token', messages.AUTHENTICATION_TOKEN_REQUIRED);

      const payload = await googleAuth.verify(request.id_token);

      const userObj = {
        email: payload.email,
        full_name: payload.name,
        gmail_id: payload.sub,
        picture: payload.picture,
        status: config.status.active
      };

      // fcm_token
      if (request.fcm_token) {
        userObj.fcm_token = request.fcm_token;
      }

      let user = await AuthService.getUser({ email: userObj.email }, type);

      if (!user) {
        user = await AuthService.getUser({ gmail_id: payload.sub }, type);
        if (!user) {
          user = await AuthService.createUser(userObj, type);
        } else {
          user = await AuthService.updateUser(userObj, { gmail_id: payload.sub }, type);
        }
      } else {
        user = await AuthService.updateUser(userObj, { email: userObj.email }, type);
      }

      const token = await this.getJwtAuthToken(user);

      const response = {
        token,
        user
      };

      return res.status(200).send(ResponseService.success(response));
    } catch (e) {
      // console.log(e.code)
      return res.status(500).send(ResponseService.failure(e));
    }
  }

  async facebookLogin(req, res) {
    try {
      const request = { ...req.body };
      const type = this.getUserType(req.baseUrl);

      if (!request.access_token) throw new apiError.ValidationError('access_token', messages.AUTHENTICATION_TOKEN_REQUIRED);

      if (!request.user_id) throw new apiError.ValidationError('user_id', messages.USER_ID_REQUIRED);

      const userFieldSet = 'id, name, about, email, picture';

      const options = {
        method: 'GET',
        uri: `https://graph.facebook.com/${request.user_id}`,
        qs: {
          fields: userFieldSet,
          access_token: request.access_token
        },
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true

      };

      const data = await rp(options);

      const userObj = {
        email: data.email,
        full_name: data.name,
        facebook_id: data.id,
        picture: data.picture.data.url,
        status: config.status.active
      };

      // fcm_token
      if (request.fcm_token) {
        userObj.fcm_token = request.fcm_token;
      }

      let user = await AuthService.getUser({ email: userObj.email }, type);

      if (!user) {
        user = await AuthService.getUser({ facebook_id: data.id }, type);
        if (!user) {
          user = await AuthService.createUser(userObj, type);
        } else {
          user = await AuthService.updateUser(userObj, { facebook_id: data.id }, type);
        }
      } else {
        user = await AuthService.updateUser(userObj, { email: userObj.email }, type);
      }

      const token = await this.getJwtAuthToken(user);

      const response = {
        token,
        user
      };

      return res.status(200).send(ResponseService.success(response));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }

  async forgetPassword(req, res) {
    try {
      const request = { ...req.body };
      const type = this.getUserType(req.baseUrl);
      const genrateToken=uuidv4();

      if (!request.contact_number) throw new apiError.ValidationError('contact_number', messages.CONTACT_REQUIRED);

      let contact = request.contact_number;
      let user;
      if (contact.length >= 10) {
        contact = contact.slice(-10);
        contact = new RegExp(contact, 'i');
        user = await AuthService.getUser({ contact_number: contact }, type);
      }
      if (!user) user=await AuthService.getUser({ email: request.contact_number }, type);
      
      OTP.sendPasswordResetLink(user,type,req.baseUrl,genrateToken);
      

      const data = {
        verification_token: genrateToken
      };

      const userData = await AuthService.updateUser(data, { email: user.email }, type);
      if (!userData) throw new apiError.InternalServerError();
      return res.send(ResponseService.success({
        message: messages.LINK_VIA_EMAIL_ID_RESET
      }));  
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async resetPassword(req, res) {
    try {
      const request = { ...req.body };
     
      const type = this.getUserType(req.baseUrl);

      if (!request.password) throw new apiError.ValidationError('password', messages.PASSWORD_REQUIRED);

      const userId = req._userInfo._user_id;

      const user = await AuthService.getUser({ _id: userId }, type);
      if (!user) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(request.password, salt);

      if (!hash) throw apiError.InternalServerError();

      const data = {
        password: hash
      };

      user.password = null;

      const userData = await AuthService.updateUser(data, { _id: userId }, type);

      if (!userData) throw new apiError.InternalServerError();

      return res.send(ResponseService.success({
        user,
        message: messages.PASSWORD_UPDATED_SUCCESSFULLY
      }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async resetPasswordByMail(req, res) {
    console.log("start");
    try {
      const request = { ...req.body };
      const prams = { ...req.query };
      
      const type = this.getUserType(req.baseUrl);

      if (!request.password) throw new apiError.ValidationError('password', messages.PASSWORD_REQUIRED);
      console.log("1");

      const user = await AuthService.getUser({ verification_token: prams.token }, type);
      if (!user) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);
      console.log("2");

      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(request.password, salt);
     
      if (!hash) throw apiError.InternalServerError();
      console.log("3");

      const userObj = {
        password: hash,
        $unset: {verification_token: 1 }
      };
      // Update user with a password reset token     
      user.password = null;
console.log("come");
      const userData = await AuthService.updateUser(userObj, { _id: user._id }, type);
      console.log("end");

      if (!userData) throw new apiError.InternalServerError();

      return res.send(ResponseService.success({
        user,
        message: messages.PASSWORD_UPDATED_SUCCESSFULLY
      }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async changePassword(req, res) {
    try {
      const request = { ...req.body };
      const type = this.getUserType(req.baseUrl);

      if (!request.password) throw new apiError.ValidationError('password', messages.PASSWORD_REQUIRED);

      if (!request.new_password) throw new apiError.ValidationError('new_password', messages.NEW_PASSWORD_REQUIRED);

      const userId = req._userInfo._user_id;

      const user = await AuthService.getUser({ _id: userId }, type);
      if (!user) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const matchBcrypt = await bcrypt.compare(request.password, user.password);
      if (!matchBcrypt) throw new apiError.UnauthorizedError(messages.PASSWORD_INVALID);

      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(request.new_password, salt);

      if (!hash) throw apiError.InternalServerError();

      const data = {
        password: hash
      };

      user.password = null;

      const userData = await AuthService.updateUser(data, { _id: userId }, type);
      if (!userData) throw new apiError.InternalServerError();

      return res.send(ResponseService.success({
        user,
        message: messages.PASSWORD_UPDATED_SUCCESSFULLY
      }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async logout(req, res) {
    try {
      const userId = req._userInfo._user_id;
      const type = this.getUserType(req.baseUrl);

      const user = await AuthService.getUser({ _id: userId }, type);
      if (!user) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const updatedUser = await AuthService.updateUser({
        is_logout: true,
        $unset: { auth_token: 1 }
      }, { _id: userId }, type);
      if (!updatedUser) throw new apiError.InternalServerError();

      return res.send(ResponseService.success({ user: updatedUser }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  getJwtAuthToken(user, type) {
    // Create JWT auth signature
    const jwtTokenArgs = {
      id: user._id,
      type
    };
    return jwt.sign(jwtTokenArgs, config.authSecretToken);
  }

  getUserType(url) {
    const type = url.split('/')[2];

    switch (type) {
      case 'admin':
        return 1;
      case 'store':
        return 2;
      case 'customer':
        return 3;
      case 'driver':
        return 4;
      default:
        return 0;
    }
  }
}

module.exports = new AuthController();

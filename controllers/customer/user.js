const CustomerService = require('../../services/customer');
const AreaService = require('../../services/area');
const SlotService = require('../../services/slot');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

class UserController {
  async getAddress(req, res) {
    try {
      const type = this.getUserType(req.baseUrl);

      let user_id;
      if (type == 1) user_id = req.query.user_id;
      else user_id = req._userInfo._user_id;

      console.log('type', type);
      if (!user_id) throw new apiError.ValidationError('user_id', messages.USER_ID_REQUIRED);

      const customer = await CustomerService.getCustomerWithAddress(user_id);
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      if (customer.length > 0) {
        return res.send(ResponseService.success({ address: customer[0].address }));
      }
      res.send(ResponseService.success({ address: [] }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async addAddress(req, res) {
    try {
      const request = { ...req.body };

      const type = this.getUserType(req.baseUrl);

      let user_id;
      if (type == 1) user_id = req.query.user_id;
      else user_id = req._userInfo._user_id;

      if (!user_id) throw new apiError.ValidationError('user_id', messages.USER_ID_REQUIRED);

      if (!request.house_no) throw new apiError.ValidationError('house_no', messages.HOUSE_NO_REQUIRED);
      if (!request.locality) throw new apiError.ValidationError('street', messages.STREET_NAME_REQUIRED);
      if (!request.email) throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);
      if (!request.full_name) throw new apiError.ValidationError('full_name', messages.NAME_REQUIRED);
      if (!request.contact_number) throw new apiError.ValidationError('email', messages.CONTACT_REQUIRED);
      if (!request.city_id) throw new apiError.ValidationError('city_id', messages.CITY_ID_REQUIRED);
      if (!request.alias) throw new apiError.ValidationError('alias', messages.ALIAS_REQUIRED);

      const city = await AreaService.getCity({ _id: request.city_id });
      if (!city) throw new apiError.ValidationError('city_id', messages.ID_INVALID);

      const customer = await CustomerService.getCustomer({ _id: user_id });
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const updatedCustomer = await CustomerService.addAddress(request, user_id);

      return res.send(ResponseService.success({ customer: updatedCustomer }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async updateAddress(req, res) {
    try {
      const { id } = req.params;

      const request = { ...req.body };

      const type = this.getUserType(req.baseUrl);

      let user_id;
      if (type == 1) user_id = req.query.user_id;
      else user_id = req._userInfo._user_id;

      if (!user_id) throw new apiError.ValidationError('user_id', messages.USER_ID_REQUIRED);

      if (!request.house_no) throw new apiError.ValidationError('house_no', messages.HOUSE_NO_REQUIRED);
      if (!request.locality) throw new apiError.ValidationError('street', messages.STREET_NAME_REQUIRED);
      if (!request.email) throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);
      if (!request.full_name) throw new apiError.ValidationError('full_name', messages.NAME_REQUIRED);
      if (!request.contact_number) throw new apiError.ValidationError('email', messages.CONTACT_REQUIRED);
      if (!request.city_id) throw new apiError.ValidationError('city_id', messages.CITY_ID_REQUIRED);
      if (!request.alias) throw new apiError.ValidationError('alias', messages.ALIAS_REQUIRED);

      const city = await AreaService.getCity({ _id: request.city_id });
      if (!city) throw new apiError.ValidationError('city_id', messages.ID_INVALID);

      const customer = await CustomerService.getCustomer({ _id: user_id });
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const updatedCustomer = await CustomerService.updateAddress(request, id, user_id);

      return res.send(ResponseService.success({ customer: updatedCustomer }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async deleteAddress(req, res) {
    try {
      const { id } = req.params;

      const type = this.getUserType(req.baseUrl);

      let user_id;
      if (type == 1) user_id = req.query.user_id;
      else user_id = req._userInfo._user_id;

      const customer = await CustomerService.getCustomer({ _id: user_id });
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const updatedCustomer = await CustomerService.deleteAddress(id, user_id);
      return res.send(ResponseService.success({ customer: updatedCustomer }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async getProfile(req, res) {
    try {
      const user_id = req._userInfo._user_id;

      const customer = await CustomerService.getCustomer({ _id: user_id });
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      return res.send(ResponseService.success({ customer }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async updateProfile(req, res) {
    try {
      console.log(req.files);

      const user_id = req._userInfo._user_id;
      const request = { ...req.body };

      const customer = await CustomerService.getCustomer({ _id: user_id });
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const { id } = req.params;
      if (id != user_id) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      if (req.files && req.files.length > 0) {
        const picture = req.files.filter((ele) => ele.fieldname === 'picture');
        request.picture = picture[0].filename;
      }

      if (!customer.gmail_id && !customer.facebook_id) {
        delete request.contact_number;
        delete request.email;
      }

      delete request._id;
      delete request.password;
      delete request.verification_token;

      const updatedCustomer = await CustomerService.updateCustomer(request, { _id: user_id });
      return res.send(ResponseService.success({ customer: updatedCustomer }));
    } catch (e) {
      console.log('e', e);
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async addSlot(req, res) {
    await SlotService.slotScheduler();
    return res.send(ResponseService.success({ message: 'Scheduler Run' }));
  }

  async addFcmToken(req, res) {
    try {
      const { fcm_token } = req.body;
      if (!fcm_token) throw new apiError.ValidationError('fcm_token', messages.FCM_TOKEN_REQUIRED);

      const user_id = req._userInfo._user_id;

      const customer = await CustomerService.getCustomer({ _id: user_id });
      if (!customer) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const updatedCustomer = await CustomerService.updateCustomer({ fcm_token }, { _id: user_id });
      return res.send(ResponseService.success({ customer: updatedCustomer }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  getUserType(url) {
    console.log('url', url);
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

module.exports = new UserController();

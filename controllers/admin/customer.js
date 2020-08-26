const bcrypt = require('bcrypt');
const CustomerService = require('../../services/customer');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');

module.exports = {

  async addCustomer(req, res) {
    try {
      const request = { ...req.body };

      if (!request.email) throw new apiError.ValidationError('contact_number', messages.EMAIL_REQUIRED);
      if (!request.full_name) throw new apiError.ValidationError('contact_number', messages.FULL_NAME_REQUIRED);
      if (!request.contact_number) throw new apiError.ValidationError('contact_number', messages.CONTACT_REQUIRED);

      let user = await CustomerService.getCustomer({ email: request.email });
      if (user) throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);

      let contact = request.contact_number;

      if (contact.length >= 10) {
        contact = contact.slice(-10);
        contact = new RegExp(contact, 'i');
      } else {
        throw new apiError.ValidationError('contact_number', messages.CONTACT_INVALID);
      }

      user = await CustomerService.getCustomer({ contact_number: contact });
      if (user) throw new apiError.ValidationError('contact_number', messages.CONTACT_ALREADY_EXIST);

      if (request.password) {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(request.password, salt);

        if (!hash) throw new Error();

        request.password = hash;
      }

      request.status = 1;

      const customer = await CustomerService.createCustomer(request);

      return res.status(200).send(ResponseService.success({ customer }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getCustomers(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const { search = '' } = req.query;
      const sort = { [req.query.name]: Number(req.query.sortType) };

      const customers = await CustomerService.getCustomersWithPagination(
        {},
        pageNo,
        perPage,
        search,
        sort
      );
      const totalCount = await CustomerService.getTotalCustomerCount({}, search);

      return res.status(200).send(ResponseService.success({ customers, totalCount }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async editCustomer(req, res) {
    try {
      const data = req.body;
      const id = data._id;
      delete data._id;
      delete data.password;
      delete data.verification_token;
      delete data.created_at;
      delete data.updated_at;

      const customer = await CustomerService.updateCustomer(data, { _id: id });

      return res.status(200).send(ResponseService.success({ customer }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async checkCustomerExist(req, res) {
    try {
      let { emailOrContactNumber = '' } = { ...req.body };
      emailOrContactNumber = emailOrContactNumber.toLowerCase();
      const isContactNumber = !Number.isNaN(Number(emailOrContactNumber));

      if (isContactNumber) {
        if (emailOrContactNumber.length >= 10) {
          emailOrContactNumber = emailOrContactNumber.slice(-10);
        } else {
          throw new apiError.ValidationError('contact_number', messages.EMAIL_OR_CONTACT_INVALID);
        }
      } else if (!(/\S+@\S+\.\S+/.test(emailOrContactNumber))) {
        throw new apiError.ValidationError('email', messages.EMAIL_OR_CONTACT_INVALID);
      }

      const customer = await CustomerService.getCustomer({
        $or: [
          { email: emailOrContactNumber },
          { contact_number: { $regex: emailOrContactNumber } }
        ]
      });

      if (customer) {
        return res.status(200).send(ResponseService.success({ customer }));
      }

      return res.send({
        success: false,
        message: 'No customer Exists for this detail'
      });
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
};

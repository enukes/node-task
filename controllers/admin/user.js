const bcrypt = require('bcrypt');
const AdminService = require('../../services/admin');
const StoreService = require('../../services/store');
const CustomerService = require('../../services/customer');
const DriverService = require('../../services/driver');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');

class UserController {
  async addSubAdmin(req, res) {
    try {
      const data = { ...req.body };
      if (!data.email) throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);
      if (!data.password) throw new apiError.ValidationError('password', messages.PASSWORD_REQUIRED);
      if (!data.permissions) data.permissions = [];

      data.email = data.email.toLowerCase();

      const admin = await AdminService.getAdmin({ email: data.email });
      if (admin) throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);

      const store = await StoreService.getStore({ email: data.email });
      if (store) throw new apiError.ValidationError('email', 'A store with same Email Exists');

      const customer = await CustomerService.getCustomer({ email: data.email });
      if (customer) throw new apiError.ValidationError('email', 'A customer with same Email Exists');

      const driver = await DriverService.getDriver({ email: data.email });
      if (driver) throw new apiError.ValidationError('email', 'A driver with same Email Exists');

      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(data.password, salt);

      if (!hash) throw errorHandler.InternalServerError();

      data.password = hash;

      const { permissions } = data;
      let flag = false;

      for (let i = 0; i < permissions.length; i++) {
        const element = permissions[i];
        if (element == 'SETTING') {
          flag = true;
          break;
        }
      }
      if (flag) permissions.splice(i, 1);

      const subAdmin = await AdminService.createAdmin(data);
      return res.status(200).send(ResponseService.success({ admin: subAdmin }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }

  async getSubAdmins(req, res) {
    try {
      const pageNo = parseInt(req.query.pageNo || config.pagination.pageNo);
      const perPage = parseInt(req.query.perPage || config.pagination.perPage);
      const search = req.query.search || '';

      const total = await AdminService.adminTotalCount({ email: new RegExp(search, 'i') });

      const admins = await AdminService.getAdmins({ email: new RegExp(search, 'i') }, perPage, pageNo);
      return res.status(200).send(ResponseService.success({ admins, count: total }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }

  async updateSubAdmin(req, res) {
    try {
      const data = { ...req.body };
      if (!data.permissions) data.permissions = [];

      delete data.email;
      delete data.password;

      const subAdminId = req.params.id;

      let subAdmin = await AdminService.getAdmin({ _id: subAdminId });
      if (!subAdmin) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const { permissions } = data;
      let flag = false;

      for (let i = 0; i < permissions.length; i++) {
        const element = permissions[i];
        if (element == 'SETTING') {
          flag = true;
          break;
        }
      }
      if (flag) permissions.splice(i, 1);

      subAdmin = await AdminService.updateAdmin(data, { _id: subAdminId });
      return res.status(200).send(ResponseService.success({ admin: subAdmin }));
    } catch (e) {
      console.log('e', e);
      return res.status(500).send(ResponseService.failure(e));
    }
  }

  async deleteSubAdmin(req, res) {
    try {
      const { id } = req.params;
      if (!HelperService.isValidMongoId(id)) throw new apiError.ValidationError('product_id', messages.ID_INVALID);

      const subAdmin = await AdminService.getAdmin({ _id: id });
      if (!subAdmin) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const deletedSubAdmin = await AdminService.deleteAdmin({ _id: id });

      return res.status(200).send(ResponseService.success({ product: deletedSubAdmin }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new UserController();

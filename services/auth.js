const AdminService = require('./admin');
const StoreService = require('./store');
const CustomerService = require('./customer');
const DriverService = require('./driver');

module.exports = {
  async getUser(request, type) {
    switch (type) {
      case 1:
        return AdminService.getAdmin(request);
      case 2:
        return StoreService.getStore(request);
      case 3:
        return CustomerService.getCustomer(request);
      case 4:
        return DriverService.getDriver(request);
      default:
        return null;
    }
  },

  async createUser(details, type) {
    switch (type) {
      case 1:
        return AdminService.createAdmin(details);
      case 2:
        return StoreService.createStore(details);
      case 3:
        return CustomerService.createCustomer(details);
      case 4:
        return DriverService.createDriver(details);
      default:
        return null;
    }
  },

  async updateUser(newData, criteria, type) {
    switch (type) {
      case 1:
        return AdminService.updateAdmin(newData, criteria);
      case 2:
        return StoreService.updateStore(newData, criteria);
      case 3:
        return CustomerService.updateCustomer(newData, criteria);
      case 4:
        return DriverService.updateDriver(newData, criteria);
      default:
        return null;
    }
  },

  async deleteUser(criteria, type) {
    switch (type) {
      // case 1:
      //     return AdminService.updateAdmin(newData, criteria);
      case 2:
        return null;
      case 3:
        return CustomerService.deleteCustomer(criteria);
      case 4:
        return DriverService.deleteDriver(criteria);
      default:
        return null;
    }
  }
};

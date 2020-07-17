const Driver = require('../models/driver');
const Order = require('../models/order');
const Store = require('../models/store');

module.exports = {
  getDriver(request) {
    return Driver.findOne(request);
  },

  getDrivers(request) {
    return Driver.find(request);
  },

  createDriver(details) {
    return new Driver(details).save();
  },

  updateDriver(details, criteria) {
    return Driver.findOneAndUpdate(criteria, details, { new: true });
  },

  deleteDriver(criteria) {
    return Driver.findOneAndDelete(criteria);
  },

  getTotalDriverCount(request, search) {
    const condition = {
      $and:
        [
          {
            $or:
              [
                { full_name: new RegExp(search, 'i') }
              ]
          },
          request
        ]
    };
    return Driver.countDocuments(condition);
  },

  getDriversWithPagination(request, pageNo, perPage, search, sort) {
    const condition = {
      $and:
        [
          {
            $or:
              [
                { full_name: new RegExp(search, 'i') }
              ]
          },
          request
        ]
    };
    return Driver.find(condition).skip((pageNo - 1) * perPage).limit(perPage).sort(sort);
  },

  async getStoreDriversFCMArray(store) {
    const { drivers } = store;
    const fcmArray = [];

    for (let i = 0; i < drivers.length; i++) {
      const driverId = drivers[i];
      // eslint-disable-next-line no-await-in-loop
      const driver = await this.getDriver({
        _id: driverId,
        is_online: true,
        is_logout: false
      });

      if (driver && driver.fcm_token) {
        fcmArray.push(driver.fcm_token);
      }
    }

    return fcmArray;
  },

  async checkIfDriverIsAssigned(driverId) {
    if (await Store.find({ drivers: { $in: [driverId] } }).count() > 0) {
      return true;
    }
    return await Order.find({
      driver_id: driverId,
      status: { $ne: 3 }
    }).count() > 0;
  }
};

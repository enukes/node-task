const Config = require('../models/config');

module.exports = {
  addConfig(config) {
    return new Config(config).save();
  },

  getConfig() {
    return Config.findOne({}, {
      taxes: 1,
      per_slot_order_limit: 1
    });
  },

  getDeliveryCharges() {
    return Config.findOne({});
  },
  updateConfig(details) {
    return Config.findOneAndUpdate({}, details, { new: true });
  }
};

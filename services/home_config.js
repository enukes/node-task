const mongoose = require('mongoose');
const HomeConfig = require('../models/home_config');

module.exports = {
  countHomeConfig: () => HomeConfig.count(),
  addHomeConfig: (config) => new HomeConfig(config).save(),
  getHomeConfig: (criteria) => HomeConfig.find(criteria, null, { sort: { position: 1 } }),
  getHomeConfigById: (id) => HomeConfig.findOne({ _id: mongoose.Types.ObjectId(id) }),
  updateConfig: (criteria, details) => HomeConfig.findOneAndUpdate(
    criteria,
    details,
    { new: true }
  ),
  deleteConfig: (criteria) => HomeConfig.remove(criteria)
};

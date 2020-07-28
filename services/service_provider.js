const ServiceProvider = require('../models/service_provider');

module.exports = {
  getServiceProvidersByCategoryId(serviceCategoryId) {
    return ServiceProvider.findOne({ serviceCategory: serviceCategoryId})
  }
}

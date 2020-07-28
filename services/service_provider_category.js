const ServiceProviderCategory = require('../models/service_provider_category');
module.exports = {
  addServiceProviderCategory(serviceProviderCategoryDetails) {
    return new ServiceProviderCategory(serviceProviderCategoryDetails).save();
  }
}

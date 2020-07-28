const ServiceOrder = require('../models/service_order');
module.exports = {
  /**
   * Get Orders for Service Provider
   */
  getServiceOrder(request) {
    return ServiceOrder.findOne(request);
  },

}

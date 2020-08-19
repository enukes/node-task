const mongoose = require('mongoose');
const Service = require('../models/service');
module.exports = {
  getServicesWithPagination(request, pageNo, perPage, criteria, sort) {
    const condition = {
      $and:
        [
          {
            $or:
              [
                { name: new RegExp(criteria.search, 'i') },
                { tags: { $regex: criteria.search, $options: 'i' } }
              ]
          },
          {
            service_provider_id: criteria.service_provider_id,
          }
        ]
    };

    return Service.find(condition).skip((pageNo - 1) * perPage).limit(perPage).sort(sort);
  },

  /**
   * Add a Service
   */

  addAServiceToServiceProvider(details) {
    return new Service(details).save();
  },

  /**
   * Total Services Count
   */

  getTotalServicesCount(request, criteria) {
    const condition = {
      $and: [
        {
          $or: [
            { name: new RegExp(criteria.search, 'i') }
          ]
        },
        {
          service_provider_id: criteria.store_id,
        }
      ]
    };
    return Service.countDocuments(condition);
  },

  /**
   * Find a Service
   */

  getService(request) {
    return Service.findOne(request);
  },

  /**
   * Update a Service
   */

  updateService(criteria, details) {
    return Service.findOneAndUpdate(criteria, details, { new: true });
  },

  /**
   * Delete a Service
   */
  deleteService(request) {
    return Service.deleteOne(request);
  },
}

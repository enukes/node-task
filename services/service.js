const mongoose = require('mongoose');
const Service = require('../models/service');
const ServiceOrder = require('../models/service_order');

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
            service_provider_id: criteria.service_provider_id
          },
          {
            category_id: criteria.categoryId
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
          service_provider_id: criteria.service_provider_id
        },
        {
          category_id: criteria.categoryId
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

  updateService(criteria, details) {
    return Service.findOneAndUpdate(criteria, details, { new: true });
  },

  /**
   * Delete a Service
   */
  deleteService(request) {
    return Service.deleteOne(request);
  },

  getTotalServiceOrderCount(request, criteria) {
    let filter = {};
    filter.service_provider_id = criteria.service_provider_id;
    
    const condition = {
      $and: [
        filter
      ]
    };
    return ServiceOrder.countDocuments(condition);
  },

  getServiceOrderWithPagination(request, pageNo, perPage, criteria, sort) {
    let filter = {} ;
    filter.service_provider_id = criteria.service_provider_id ;
   
    const condition = {
      $and:
        [
         filter
        ]
    };

    return ServiceOrder.find(condition).skip((pageNo - 1) * perPage).limit(perPage).sort(sort);
  },
};

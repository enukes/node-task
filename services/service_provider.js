const mongoose = require('mongoose');
const moment = require('moment-timezone');
const ServiceProvider = require('../models/service_provider');
const Slot = require('../models/slot');
const config = require('../config/constants');

module.exports = {
  /**
   * get Service Provider
   */
  getServiceProvider(request) {
    return ServiceProvider.findOne(request);
  },

  /**
 * Get Service Provider List
 */

  getServiceProviderList(request) {
    return ServiceProvider.find(request);
  },

  /**
   * Create a Service Provider
   */

  async createServiceProvider(details) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const opts = { session };
    try {
      const service_provider = await new ServiceProvider(details).save(opts);
      if (!service_provider) {
        throw apiError.InternalServerError();
      }

      const { days } = config.slots;
      for (let i = 0; i < days; i++) {
        const startTime = service_provider.timings.open_time;
        const endTime = service_provider.timings.close_time;
        const interval = config.slots.eachSlotTime;
        const start = moment(`${moment().format('YYYY-MM-DD')} ${startTime}`, 'YYYY-MM-DD HH:mm').add(i, 'd');
        const end = moment(`${moment().format('YYYY-MM-DD')} ${endTime}`, 'YYYY-MM-DD HH:mm').add(i, 'd');

        while (end.diff(start, 'hours') > 0) {
          const slotStart = moment(start);
          const slotEnd = moment(slotStart).add(interval, 'hours');

          start.add(interval, 'hours');

          const slotObject = {
            start_time: slotStart.toISOString(),
            end_time: slotEnd.toISOString(),
            store_id: service_provider._id
          };

          const slot = await new Slot(slotObject).save(opts);
          if (!slot) throw apiError.InternalServerError();
        }
      }

      await session.commitTransaction();
      session.endSession();

      return { service_provider, success: true };
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return { error: e, success: false };
    }
  },

  /**
   * Update Service Provider
   */

  updateServiceProvider(details, criteria) {
    return ServiceProvider.findOneAndUpdate(criteria, details, { new: true });
  },

  /**
    * Get Total Service Providers
    */

  getTotalServiceProviderCount(request, search) {
    const condition = {
      $and:
        [
          {
            $or:
              [
                { name: new RegExp(search, 'i') }
              ]
          },
          request
        ]
    };
    return ServiceProvider.countDocuments(condition);
  },

  /**
   * Get All Service Providers
   */
  getServiceProvidersWithPagination(request, pageNo, perPage, search, sort) {
    const condition = {
      $and:
        [
          {
            $or:
              [
                { name: new RegExp(search, 'i') }
              ]
          },
          request
        ]
    };

    // To Get All Service Providers
    if (pageNo == -1) return ServiceProvider.find(condition);
    return ServiceProvider.find(condition).skip((pageNo - 1) * perPage).limit(perPage).sort(sort);
  },

  /**
   * Delete Service Provider
   */

  async deleteServiceProvider(service_provider_id, parentSession) {
    let session;

    if (parentSession) {
      session = parentSession;
    } else {
      session = await mongoose.startSession();
      session.startTransaction();
    }
    const opts = { session };

    try {
      // const categories = await CategoryService.getCategories(service_provider_id);

      // for (let i = 0; i < categories.length; i++) {
      //   const category = categories[i];

      //   if (category._id) {
      //     const deletedCategory = await CategoryService.deleteCategory(category, session);
      //   } else {
      //     throw new Error('Invalid Category ID');
      //   }
      // }

      const deletedServiceProvider = await ServiceProvider.deleteMany({ _id: service_provider_id }, opts);

      if (!parentSession) {
        await session.commitTransaction();
        session.endSession();
      }

      return deletedServiceProvider;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return e;
    }
  },

  /**
   * Get Service Provider By Category Id
   */

  getServiceProvidersByCategoryId(serviceCategoryId) {
    return ServiceProvider.findOne({ serviceCategory: serviceCategoryId });
  },

    /**
   * Get Service Provider profile by id
   */

  getServiceProviderProfile(serviceproviderId) {
    return ServiceProvider.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(serviceproviderId) }
      },
      {
        $unwind: '$address'
      },
      {
        $lookup: {
          from : 'cities',
          localField: 'address.city_id',
          foreignField: '_id',
          as: 'city'
        }
      },
      {
        $lookup: {
          from: 'areas',
          localField: 'address.area_id',
          foreignField: '_id',
          as: 'area'
        }
      },
      {
        $group: {
          _id: '$_id',
          picture: { $first: '$picture' },
          status: { $first: '$status' },
          timings: { $first: '$timings' },
          owner: { $first: '$owner'},
          address: { $first: '$address'},
          name: { $first: '$name'},
          commission: { $first: '$commission'},
          created_at: { $first: '$created_at'},
          updated_at: { $first: '$updated_at'},
          auth_token: { $first: '$auth_token'},
          serviceCategory: { $push: '$serviceCategory'},
          serviceProviderApproval: { $first: '$serviceProviderApproval'},
          city: { $first: '$city'},
          area: { $first: '$area'}
        }
      }
    ])
  },

  getServiceprovidersWithCategories(serviceproviderId) {
    return ServiceProvider.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(serviceproviderId) }
      },
      {
        $unwind: '$serviceCategory'
      },
      {
        $lookup: {
          from : 'serviceprovidercategories',
          localField: 'categories',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $group: {
          _id: '$_id',
          serviceCategory: { $push: '$serviceCategory'},
          category: { $push: '$category'}
        }
      }
    ])
  }
};




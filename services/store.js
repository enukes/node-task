const moment = require('moment-timezone');
const mongoose = require('mongoose');
const Store = require('../models/store');
const Slot = require('../models/slot');
const config = require('../config/constants');
const CategoryService = require('./category');
const apiError = require('../common/api-errors');

module.exports = {
  getStore(request) {
    return Store.findOne(request);
  },

  getStoresList(request) {
    return Store.find(request);
  },

  // getStoresGroupedByCategories(request) {
  //   return Store.aggregate([
  //     {
  //       $match: request
  //     },
  //     {
  //       $group: {
  //         _id: '$storeCategory',
  //         stores: { $push: '$$ROOT' }
  //       }
  //     },
  //     {
  //       $lookup: {
  //         from: 'storecategories',
  //         localField: '_id',
  //         foreignField: '_id',
  //         as: 'categoryDetails'
  //       }
  //     },
  //     {
  //       $match: {
  //         'categoryDetails.status': 1
  //       }
  //     },
  //     {
  //       $unwind: '$categoryDetails'
  //     }
  //   ]);
  // },

  async createStore(details) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const opts = { session };
    try {
      const store = await new Store(details).save(opts);
      if (!store) throw apiError.InternalServerError();

      const { days } = config.slots;

      for (let i = 0; i < days; i++) {
        const startTime = store.timings.open_time;
        const endTime = store.timings.close_time;
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
            store_id: store._id
          };

          const slot = await new Slot(slotObject).save(opts);
          if (!slot) throw apiError.InternalServerError();
        }
      }

      await session.commitTransaction();
      session.endSession();

      return { store, success: true };
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return { error: e, success: false };
    }
  },

  updateStore(details, criteria) {
    return Store.findOneAndUpdate(criteria, details, { new: true });
  },

  getStoreDriverDetails(request) {
    return Store.findOne(request).populate({
      path: 'drivers',
      match: { status: 1 }
    });
  },

  getTotalStoreCount(request, search) {
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
    return Store.countDocuments(condition);
  },

  getStoresWithPagination(request, pageNo, perPage, search, sort) {
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

    // To Get All Stores
    if (pageNo == -1) return Store.find(condition);
    return Store.find(condition).skip((pageNo - 1) * perPage).limit(perPage).sort(sort);
  },

  getStorePaymentDetails(from_date, to_date) {
    return Store.aggregate([
      {
        $match: {
          $and: [{ created_at: { $gt: moment(from_date).toDate(), $lt: moment(to_date).toDate() } }]
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'store_id',
          as: 'orders'
        }
      }
    ]);
  },

  async deleteStore(store_id, parentSession) {
    let session;

    if (parentSession) {
      session = parentSession;
    } else {
      session = await mongoose.startSession();
      session.startTransaction();
    }

    const opts = { session };

    try {
      const categories = await CategoryService.getCategories(store_id);

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];

        if (category._id) {
          const deletedCategory = await CategoryService.deleteCategory(category, session);
        } else {
          throw new Error('Invalid Category ID');
        }
      }

      const deletedStore = await Store.deleteMany({ _id: store_id }, opts);

      if (!parentSession) {
        await session.commitTransaction();
        session.endSession();
      }

      return deletedStore;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return e;
    }
  },

  getStoreByArea(request) {
    return Store.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [request.lat, request.long]
          },
          distanceField: 'dist.calculated',
          maxDistance: 20000
        }
      },
      {
        $unwind: '$categories'
      }, {
        $lookup: {
          from: 'categorynews',
          localField: 'categories._id',
          foreignField: '_id',
          as: 'categoryDetails'
        }
      },
      {
        $match: {
          'categoryDetails.status': 1
        }
      },
      {
        $group: {
          _id: '$categoryDetails',
          stores: { $push: '$$ROOT' }
        }
      },

      // {
      //   $group: {
      //     _id: '$storeCategory',
      //     stores: { $push: '$$ROOT' }
      //   }
      // },
      // {
      //   $lookup: {
      //     from: 'storecategories',
      //     localField: '_id',
      //     foreignField: '_id',
      //     as: 'categoryDetails'
      //   }
      // },
      // {
      //   $match: {
      //     'categoryDetails.status': 1
      //   }
      // },
      // {
      //   $unwind: '$categoryDetails'
      // }
    ]);
  },

  getStoresWithCategories(storeId) {
    return Store.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(storeId) }
      },
      {
        $unwind: '$categories'
      },
      {
        $project: {
          categories: 1,
          name: 1,
          _id: 1
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categoryDetails'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryDetails._id',
          foreignField: 'parent',
          as: 'subcategories'
        }
      },
      {
        $unwind: '$categoryDetails'
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          categoryIds: { $push: '$categories' },
          categoryDetails: { $push: { $mergeObjects: ['$categoryDetails', { subcategories: '$subcategories' }] } }
        }
      }
    ]);
  },
  getStoresBySubCategory(category,lat,long,search) {

        return Store.find(
          {
            categories:category,
            status:1,
            storeApproval:"Accepted"
          }   
        );
  },

  getStoreProfile(storeId) {
    return Store.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(storeId) }
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
          name: { $first: '$name'},
          commission: { $first: '$commission'},
          created_at: { $first: '$created_at'},
          updated_at: { $first: '$updated_at'},
          auth_token: { $first: '$auth_token'},
          categories: { $push: '$categories'},
          isFreeDelivery: { $first: '$isFreeDelivery'},
          address: { $first: '$address'},
          city: { $first: '$city'},
          area: { $first: '$area'}
        }
      }
    ])
  }
   
};

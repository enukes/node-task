const mongoose = require('mongoose');
const ServiceOrder = require('../models/service_order');
const ServicesService = require('./service');
const moment = require('moment');
module.exports = {
  /**
   * Get Orders for Service Provider
   */
  getServiceOrder(request) {
    return ServiceOrder.findOne(request);
  },

  /**
   * Add a Service Order
   */
  async addOrder(details) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const opts = { session };
    try {
      const serviceOrder = await new ServiceOrder(details).save();
      if (!serviceOrder) {
        throw new apiError.InternalServerError();
      }

      for (let i = 0; i < details.services.length; i++) {
        const newStockQuantity = Number(details.services[i].stock_quantity)
          - Number(details.services[i].count);

        const product = await ServicesService.updateService(
          { _id: details.services[i].service_id },
          { stock_quantity: newStockQuantity },
          opts

        );
        if (!product) {
          throw new apiError.InternalServerError();
        }
      }

      if (details.coupon) {
        const count = Number(details.coupon.usage) - 1;
        await couponService.updateCoupon(
          { _id: details.coupon._id },
          { usage: count },
          opts
        );
      }

      await session.commitTransaction();
      session.endSession();

      return serviceOrder;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return e;
    }
  },

  /**
   * Get Orders List
   */

  async getOrders(request, sort = null, pageNo = null, perPage = null) {
    let sortObject = {};
    if (sort) sortObject = sort;
    else sortObject = { created_at: -1 };

    if (!pageNo) {
      return ServiceOrder.aggregate([

        { $match: request },
        {
          $lookup: {
            from: 'serviceproviders',
            foreignField: '_id',
            localField: 'service_provider_id',
            as: 'serviceProvider'
          }
        },
        {
          $unwind: '$serviceProvider'
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'address.delivery.city_id',
            foreignField: '_id',
            as: 'address.delivery.city'
          }
        },
        {
          $unwind: '$address.delivery.city'
        },
        {
          $lookup: {
            from: 'customers',
            foreignField: '_id',
            localField: 'customer_id',
            as: 'customer'
          }
        },
        {
          $unwind: '$customer'
        },
        {
          $sort: sortObject
        }
      ]);
    }

    return ServiceOrder.aggregate([

      { $match: request },
      {
        $lookup: {
          from: 'serviceproviders',
          foreignField: '_id',
          localField: 'service_provider_id',
          as: 'serviceProvider'
        }
      },
      {
        $unwind: '$serviceProvider'
      },
      {
        $lookup: {
          from: 'cities',
          localField: 'address.delivery.city_id',
          foreignField: '_id',
          as: 'address.delivery.city'
        }
      },
      {
        $unwind: '$address.delivery.city'
      },
      {
        $lookup: {
          from: 'customers',
          foreignField: '_id',
          localField: 'customer_id',
          as: 'customer'
        }
      },
      {
        $unwind: '$customer'
      },
      {
        $sort: sortObject
      },
      {
        $skip: ((pageNo - 1) * perPage)
      },

      {
        $limit: perPage
      }
    ]);
  },

  /**
   * Get Total Orders Count
   */

  getTotalOrdersCount(request) {
    return ServiceOrder.countDocuments(request);
  },

  /**
   * Update an Order
   */
  updateServiceOrder(details, criteria) {
    return ServiceOrder.findOneAndUpdate(criteria, details, { new: true, upsert: false });
  },

  // getting orders for super-admin
  async getServiceOrdersWithPagination(request, pageNo, perPage, search, sort = null) {
    if (sort) {
      return ServiceOrder.aggregate([
        {
          $match: {
            $and:
              [
                {
                  $or:
                    [
                      { service_order_id: new RegExp(search, 'i') }
                      // { "store.name": new RegExp(search, 'i') },
                    ]
                },
                request
              ]
          }
        },
        {
          $lookup: {
            from: 'serviceproviders',
            foreignField: '_id',
            localField: 'service_provider_id',
            as: 'serviceProvider'
          }
        },
        {
          $unwind: '$serviceProvider'
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'address.delivery.city_id',
            foreignField: '_id',
            as: 'address.delivery.city'
          }
        },
        {
          $unwind: '$address.delivery.city'
        },
        {
          $lookup: {
            from: 'drivers',
            localField: 'driver_id',
            foreignField: '_id',
            as: 'driver'
          }
        },
        {
          $unwind: // "$driver"
          {
            path: '$driver',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $sort: sort
        },
        {
          $skip: ((pageNo - 1) * perPage)
        },

        {
          $limit: perPage
        }
      ]);
    }

    return ServiceOrder.aggregate([
      {
        $match: {
          service_order_id: new RegExp(search, 'i')
        }
      },
      {
        $lookup: {
          from: 'serviceproviders',
          foreignField: '_id',
          localField: 'service_provider_id',
          as: 'serviceProvider'
        }
      },
      {
        $unwind: '$serviceProvider'
      },
      {
        $lookup: {
          from: 'cities',
          localField: 'address.delivery.city_id',
          foreignField: '_id',
          as: 'address.delivery.city'
        }
      },
      {
        $unwind: '$address.delivery.city'
      },
      // {
      //   $lookup: {
      //     from: 'drivers',
      //     localField: 'driver_id',
      //     foreignField: '_id',
      //     as: 'driver'
      //   }
      // },
      // {
      //   $unwind: // "$driver"
      //   {
      //     path: '$driver',
      //     preserveNullAndEmptyArrays: true
      //   }
      // },
      {
        $skip: ((pageNo - 1) * perPage)
      },

      {
        $limit: perPage
      }
    ]);
  },

  getTotalOrdersCountForServiceOrderManagement(request, search) {
    const condition = {
      $and:
        [
          {
            $or: [
              {
                service_order_id: new RegExp(search, 'i')
              }
            ]
          },
          request
        ]
    };
    return ServiceOrder.countDocuments(condition);
  },

  getGraphSaleData(fromDate, toDate, serviceProviderId = null) {
    const condition = {
      $and: [{ created_at: { $gt: moment(fromDate).toDate(), $lt: moment(toDate).toDate() } }]
    };
    if (serviceProviderId) condition.service_provider_id = mongoose.Types.ObjectId(serviceProviderId);
    return ServiceOrder.aggregate([
      {
        $match: condition
      },
      {
        $group: {
          _id: { $substr: ['$created_at', 5, 2] },
          sale: { $sum: '$total_amount' }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          sale: '$sale'
        }
      }
    ]);
  },

  getGraphOrderDate(fromDate, toDate, serviceProviderId = null) {
    const condition = {
      $and: [{ created_at: { $gt: moment(fromDate).toDate(), $lt: moment(toDate).toDate() } }]
    };

    if (serviceProviderId) condition.service_provider_id = mongoose.Types.ObjectId(serviceProviderId);

    return ServiceOrder.aggregate([
      {
        $match: condition
      },
      {
        $group: {
          _id: '$status',
          sale: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          order: '$sale'
        }
      }
    ]);
  },

};

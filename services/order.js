/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Order = require('../models/order');
const ServiceOrder = require('../models/service_order');
const Store = require('../models/store');
const ProductService = require('./product');
const apiError = require('../common/api-errors');
const couponService = require('./coupon');

module.exports = {
  async addOrder(details) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const opts = { session };
    try {
      const order = await new Order(details).save(opts);
      if (!order) throw new apiError.InternalServerError();

      for (let i = 0; i < details.products.length; i++) {
        const newStockQuantity = Number(details.products[i].stock_quantity)
          - Number(details.products[i].count);

        const product = await ProductService.updateProduct(
          { _id: details.products[i].product_id },
          { stock_quantity: newStockQuantity },
          opts
        );
        if (!product) throw new apiError.InternalServerError();
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

      return order;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return e;
    }
  },

  async getOrders(request, sort = null, pageNo = null, perPage = null) {
    let sortObject = {};
    if (sort) sortObject = sort;
    else sortObject = { created_at: -1 };
    if (!pageNo) {
      return Order.aggregate([
          
        { $match: request },
        // {
        //   $lookup:{
        //     from:'drivers',
        //     foreignField:'_id',
        //     localField:'driver_id',
        //     as:'driverDetails'
        //   }
        // },
        // {
        //   $unwind:'$driverDetails'
        // }, 
        {
          $lookup: {
            from: 'stores',
            foreignField: '_id',
            localField: 'store_id',
            as: 'store'
          }
        },
        {
          $unwind: '$store'
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

    return Order.aggregate([

      { $match: request },
      // {
      //   $lookup:{
      //     from:'drivers',
      //     foreignField:'_id',
      //     localField:'driver_id',
      //     as:'driverDetails'
      //   }
      // },
      // {
      //   $unwind:'$driverDetails'
      // },
      {
        $lookup: {
          from: 'stores',
          foreignField: '_id',
          localField: 'store_id',
          as: 'store'
        }
      },
      {
        $unwind: '$store'
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

  async getOrderWithStoreDetails(request) {
    return Order.aggregate([
      { $match: request },
      {
        $lookup: {
          from: 'stores',
          foreignField: '_id',
          localField: 'store_id',
          as: 'store'
        }
      },
      {
        $unwind: '$store'
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
      }
    ]);
  },

  // getting orders for super-admin
  async getOrdersWithPagination(request, pageNo, perPage, search, sort = null,fromDate,toDate) {

    const condition = {
      $and: [{ deliver_start_time: { $gt: moment(fromDate, 'YYYY-MM-DD') } },
        { deliver_end_time: { $lt: moment(toDate, 'YYYY-MM-DD') } },
        {
          $or:
            [
              { order_id: new RegExp(search, 'i') }
              // { "store.name": new RegExp(search, 'i') },
            ]
        }, request
      ]
    };
    if (sort) {
      return Order.aggregate([
        {
          $match: condition
          // {
          //   $and:
          //     [
          //       {
          //         $or:
          //           [
          //             { order_id: new RegExp(search, 'i') }
          //             // { "store.name": new RegExp(search, 'i') },
          //           ]
          //       },
          //       request
          //     ]
          // }
        },
        {
          $lookup: {
            from: 'stores',
            foreignField: '_id',
            localField: 'store_id',
            as: 'store'
          }
        },
        {
          $unwind: '$store'
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
  },

  getTotalOrdersCountForOrderManagement(request, search) {
    const condition = {
      $and:
        [
          {
            $or: [
              {
                order_id: new RegExp(search, 'i')
              }
            ]
          },
          request
        ]
    };
    return Order.countDocuments(condition);
  },

  getOrder(request) {
    return Order.findOne(request);
  },

  getService(request) {
    return ServiceOrder.findOne(request);
  },

  getTotalOrdersCount(request) {
    return Order.countDocuments(request);
  },

  getTotalSale() {
    return Order.aggregate([
      { $group: { _id: null, amount: { $sum: '$total_amount' } } }
    ]);
  },

  getTotalDeliveredOrder(request) {
    return Order.countDocuments(request)
  },

  getStoreTotalSale(storeId) {
    return Order.aggregate([
      { $match: { store_id: mongoose.Types.ObjectId(storeId) } },
      { $group: { _id: null, amount: { $sum: '$total_amount' } } }
    ]);
  },

  getTodayOrderCountBasedOnStatus(request) {
    return Order.aggregate([
      {
        $match: request
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

  getGraphSaleData(fromDate, toDate, storeId = null) {
    const condition = {
      $and: [{ created_at: { $gt: moment(fromDate).toDate(), $lt: moment(toDate).toDate() } }]
    };
    if (storeId) condition.store_id = mongoose.Types.ObjectId(storeId);

    return Order.aggregate([
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

  getGraphOrderDate(fromDate, toDate, storeId = null) {
    const condition = {
      $and: [{ created_at: { $gt: moment(fromDate).toDate(), $lt: moment(toDate).toDate() } }]
    };

    if (storeId) condition.store_id = mongoose.Types.ObjectId(storeId);

    return Order.aggregate([
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

  // getUnassignedOrder(driverId, pageNo, perPage, sort = null) {
  //   // return Store.find({"drivers": driverId})

  //   return Store.aggregate([

  //     { $match: { drivers: mongoose.Types.ObjectId(driverId) } },

  //     {
  //       $lookup: {
  //         from: 'orders',
  //         localField: '_id',
  //         foreignField: 'store_id',
  //         as: 'orders'
  //       }
  //     },
  //     {
  //       $unwind: '$orders'
  //     },
  //     { $replaceRoot: { newRoot: '$orders' } },
  //     // { $match: { created_at: { "$gte": moment().startOf('day').toDate() } } },
  //     {
  //       $lookup: {
  //         from: 'customers',
  //         foreignField: '_id',
  //         localField: 'customer_id',
  //         as: 'customer'
  //       }
  //     },
  //     {
  //       $unwind: '$customer'
  //     },
  //     {
  //       $lookup: {
  //         from: 'stores',
  //         foreignField: '_id',
  //         localField: 'store_id',
  //         as: 'store'
  //       }
  //     },
  //     {
  //       $unwind: '$store'
  //     },
  //     { $match: { driver_assigned: false, status: 1 } },
  //     {
  //       $sort: sort
  //     },
  //     { $skip: (pageNo - 1) * perPage },
  //     { $limit: perPage }
  //   ]);
  // },

  getUnassignedOrder(driverId, pageNo, perPage, sort = null) {
    // return Store.find({"drivers": driverId})

    return Order.aggregate([

      { $match: { driver_assigned: false, status: 1 } },
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
        $lookup: {
          from: 'stores',
          foreignField: '_id',
          localField: 'store_id',
          as: 'store'
        }
      },
      {
        $unwind: '$store'
      },
      {
        $sort: sort
      },
      { $skip: (pageNo - 1) * perPage },
      { $limit: perPage }
    ]);
  },

  getUnassignedOrderCount(driverId, sort = null) {
    // return Store.find({"drivers": driverId})

    return Store.aggregate([

      { $match: { drivers: mongoose.Types.ObjectId(driverId) } },

      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'store_id',
          as: 'orders'
        }
      },
      {
        $unwind: '$orders'
      },
      { $replaceRoot: { newRoot: '$orders' } },
      // { $match: { created_at: { "$gte": moment().startOf('day').toDate() } } },
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
        $lookup: {
          from: 'stores',
          foreignField: '_id',
          localField: 'store_id',
          as: 'store'
        }
      },
      {
        $unwind: '$store'
      },
      { $match: { driver_assigned: false, status: 1 } },
      {
        $sort: sort
      }
      // { "$skip": (pageNo - 1) * perPage },
      // { "$limit": perPage }
    ]);
  },

  getStoreswithCustomer(userId) {
    return Order.aggregate([
      { $match: { customer_id: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$store_id'
        }
      },
      {
        $lookup: {
          from: 'stores',
          foreignField: '_id',
          localField: '_id',
          as: 'store'
        }
      },
      {
        $unwind: '$store'
      },
      {
        $replaceRoot: { newRoot: '$store' }
      }

    ]);
  },

  updateOrder(details, criteria) {
    return Order.findOneAndUpdate(criteria, details, { new: true, upsert: false });
  },

  updateServiceOrder(details, criteria) {
    return ServiceOrder.findOneAndUpdate(criteria, details, { new: true, upsert: false });
  },

  async markOrdersAsPaid(orders, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const opts = { session };
    try {
      let totalAmount = 0;
      for (let i = 0; i < orders.length; i++) {
        const newOrder = await Order.findOneAndUpdate(
          { _id: orders[i]._id },
          { store_paid: true },
          opts
        );
        totalAmount += newOrder.store_payout_amount;
        if (newOrder.is_delivered_by_store) totalAmount += newOrder.delivery_charges;

        if (!newOrder) throw new apiError.InternalServerError();
      }

      if (totalAmount !== amount) throw new apiError.ValidationError('amount_mismatch', 'Amount Mismatch');

      await session.commitTransaction();
      session.endSession();

      return {
        success: true
      };
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return {
        success: false,
        error: e
      };
    }
  },
  async getTodayOrdersWithPagination({ store_id, testStartDate, testEndDate, status = null }, pageNo, perPage, search, sort = null) {
    if (sort) {
      return Order.aggregate([
        {
          $match: {
            $and:
              [
                {
                  $or:
                    [
                      { order_id: new RegExp(search, 'i') }
                    ]
                },
                { store_id },
                { ...(status && { status }) }
              ]
          }
        },
        {
          $lookup: {
            from: 'slots',
            foreignField: '_id',
            localField: 'slot_id',
            as: 'slots'
          }
        },
        {
          $unwind: '$slots'
        },
        {
          $match: {
            $and: [{ 'slots.start_time': { $gte: testStartDate } },
            { 'slots.end_time': { $lte: testEndDate } }],
          },
        },
        {
          $lookup: {
            from: 'stores',
            foreignField: '_id',
            localField: 'store_id',
            as: 'store'
          }
        },
        {
          $unwind: '$store'
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
  },

  async getTodayServiceWithPagination({ service_provider_id, testStartDate, testEndDate, status = null }, pageNo, perPage, search, sort = null) {
    
      return ServiceOrder.aggregate([
        {
          $match: {
            $and:
              [
                {
                  $or:
                    [
                      { order_id: new RegExp(search, 'i') }
                    ]
                },
                { service_provider_id },
                { ...(status && { status }) }
              ]
          }
        },
        {
          $lookup: {
            from: 'slots',
            foreignField: '_id',
            localField: 'slot_id',
            as: 'slots'
          }
        },
        {
          $unwind: '$slots'
        },
        {
          $match: {
            $and: [{ 'slots.start_time': { $gte: testStartDate } },
            { 'slots.end_time': { $lte: testEndDate } }],
          },
        },
        {
          $lookup: {
            from: 'stores',
            foreignField: '_id',
            localField: 'service_provider_id',
            as: 'store'
          }
        },
        {
          $unwind: '$store'
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
        // {
        //   $sort: sort
        // },
        {
          $skip: ((pageNo - 1) * perPage)
        },

        {
          $limit: perPage
        }
      ]);
    
  },

  async getTodayOrdersCountForStore({ store_id, testStartDate, testEndDate, status = null }, pageNo, perPage, search, sort = null) {
    if (sort) {
      return Order.aggregate([
        {
          $match: {
            $and:
              [
                {
                  $or:
                    [
                      { order_id: new RegExp(search, 'i') }
                      // { "store.name": new RegExp(search, 'i') },
                    ]
                },
                { store_id },
                { ...(status && { status }) }
              ]
          }
        },
        {
          $lookup: {
            from: 'slots',
            foreignField: '_id',
            localField: 'slot_id',
            as: 'slots'
          }
        },
        {
          $unwind: '$slots'
        },
        {
          $match: {
            $and: [{ 'slots.start_time': { $gte: testStartDate } },
            { 'slots.end_time': { $lte: testEndDate } }],
          },
        },
        // {
        //   $lookup: {
        //     from: 'stores',
        //     foreignField: '_id',
        //     localField: 'store_id',
        //     as: 'store'
        //   }
        // },
        // {
        //   $unwind: '$store'
        // },
        // {
        //   $lookup: {
        //     from: 'cities',
        //     localField: 'address.delivery.city_id',
        //     foreignField: '_id',
        //     as: 'address.delivery.city'
        //   }
        // },
        // {
        //   $unwind: '$address.delivery.city'
        // },
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
  },
  orderVerified(request) {
    return Order.aggregate([
      { 
        request 
      },
      // {
      //   $lookup: {
      //     from : 'drivers',
      //     foreignField: '_id',
      //     localField: 'driver_id',
      //     as: 'driver'
      //   }
      // }
    ]);
  },
};

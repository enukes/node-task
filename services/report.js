const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Customer = require('../models/customer');
const Store = require('../models/store');
const Order = require('../models/order');

module.exports = {
  getCustomersReportWithPagination(request, pageNo, perPage) {
    return Customer.aggregate([
      {
        $match: {
          $or: [
            { full_name: new RegExp(request, 'i') },
            { email: new RegExp(request, 'i') },
            { contact_number: new RegExp(request, 'i') }
          ]
        }
      },
      {
        $lookup: {
          from: 'orders',
          foreignField: 'customer_id',
          localField: '_id',
          as: 'order'
        }
      },
      {
        $unwind: {
          path: '$order',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          picture: { $first: '$picture' },
          email: { $first: '$email' },
          full_name: { $first: '$full_name' },
          contact_number: { $first: '$contact_number' },
          sale: { $sum: 1 },
          toatalAmount: { $sum: { $subtract: [{ $add: ['$order.total_amount_after_tax', '$order.delivery_charges'] }, '$order.discount'] } } // order.total_amount_after_tax + order.delivery_charges -(order.discount || 0)
        }
      },
      {
        $project: {
          picture: 1,
          email: 1,
          full_name: 1,
          contact_number: 1,
          order: '$sale',
          total_amount: '$toatalAmount'
        }
      },
      {
        $sort: { total_amount: -1 }
      },
      {
        $skip: ((pageNo - 1) * perPage)
      },

      {
        $limit: perPage
      }
    ]);
  },


  getTotalCustomerCount(request) {
    return Customer.aggregate([
      {
        $match: {
          $or: [
            { full_name: new RegExp(request, 'i') },
            { email: new RegExp(request, 'i') },
            { contact_number: new RegExp(request, 'i') }
          ]
        }
      },
      {
        $lookup: {
          from: 'orders',
          foreignField: 'customer_id',
          localField: '_id',
          as: 'order'
        }
      },
      {
        $unwind: {
          path: '$order',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          picture: { $first: '$picture' },
          email: { $first: '$email' },
          full_name: { $first: '$full_name' },
          contact_number: { $first: '$contact_number' },
          sale: { $sum: 1 },
          toatalAmount: { $sum: '$order.total_amount_after_tax' }
        }
      },
      {
        $project: {
          picture: 1,
          email: 1,
          full_name: 1,
          contact_number: 1,
          order: '$sale',
          total_amount: '$toatalAmount'
        }
      }
    ]);
  },

  getTotalPaymentCount(from_date, to_date) {
    return Store.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'store_id',
          as: 'orders'
        }
      },
      {
        $unwind: {
          path: '$orders',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          // totalOrders: { $count: "$orders._id"},
          totalOrders: {
            $sum: {
              $cond: [
                { $gt: ['$orders.total_amount_after_tax', 0] },
                1,
                0
              ]
            }
          },

          toatalAmount: { $sum: '$orders.total_amount_after_tax' },
          toatalCommission: { $sum: '$orders.admin_commission_amount' },
          paymentDone: {
            $sum: {
              $cond: [
                { $ne: ['$orders.store_paid', false] },
                '$orders.store_payout_amount',
                0
              ]
            }
          }
        }
      }
    ]);
  },

  getStorePaymentReportWithPagination({
    pageNo = null,
    perPage = null,
    fromDate = null,
    toDate = null,
    criteria = {}
  }) {
    const aggregateArray = [
      {
        $match: criteria
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'store_id',
          as: 'orders'
        }
      },
      {
        $unwind: {
          path: '$orders',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          ...((fromDate || toDate) && {
            'orders.created_at': {
              ...(!!fromDate && { $gte: moment(fromDate).toDate() }),
              ...(!!toDate && { $lte: moment(toDate).toDate() })
            }
          })
        }
      },
      {
        $addFields: {
          'orders.finalPrice': { $subtract: [{ $add: ['$orders.total_amount_after_tax', '$orders.delivery_charges'] }, '$orders.discount'] },
          'order.totalPriceBeforeDelivery': { $subtract: ['$orders.total_amount_after_tax', '$orders.discount'] },
          'orders.store_delivery_commission': {
            $cond: [
              { $ne: ['$orders.is_delivered_by_store', false] },
              '$orders.delivery_charges',
              0
            ]
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          totalOrders: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ['$orders.total_amount_after_tax', 0] },
                    { ...(!!fromDate && { $gte: ['$orders.deliver_start_time', moment(fromDate).toDate()] }) },
                    { ...(!!toDate && { $lte: ['$orders.deliver_start_time', moment(toDate).toDate()] }) },
                    { $eq: ['$orders.status', 3] }
                  ]
                },
                1,
                0
              ]
            }
          },
          totalAmount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { ...(!!fromDate && { $gte: ['$orders.deliver_start_time', moment(fromDate).toDate()] }) },
                    { ...(!!toDate && { $lte: ['$orders.deliver_start_time', moment(toDate).toDate()] }) },
                    { $eq: ['$orders.status', 3] }
                  ]
                },
                { $trunc: ['$orders.total_amount', 2] },
                0
              ]
            }
          },
          totalCommission: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { ...(!!fromDate && { $gte: ['$orders.deliver_start_time', moment(fromDate).toDate()] }) },
                    { ...(!!toDate && { $lte: ['$orders.deliver_start_time', moment(toDate).toDate()] }) },
                    { $eq: ['$orders.status', 3] }
                  ]
                },
                { $trunc: ['$orders.admin_commission_amount', 2] },
                0
              ]
            }
          },
          taxAmount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { ...(!!fromDate && { $gte: ['$orders.deliver_start_time', moment(fromDate).toDate()] }) },
                    { ...(!!toDate && { $lte: ['$orders.deliver_start_time', moment(toDate).toDate()] }) },
                    { $ne: ['$orders.store_paid', false] },
                    { $eq: ['$orders.status', 3] }
                  ]
                },
                { $trunc: [{ $subtract: ['$orders.total_amount_after_tax', '$orders.total_amount'] }, 2] },
                0
              ]
            }
          },
          deliveryCharges: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { ...(!!fromDate && { $gte: ['$orders.deliver_start_time', moment(fromDate).toDate()] }) },
                    { ...(!!toDate && { $lte: ['$orders.deliver_start_time', moment(toDate).toDate()] }) },
                    { $eq: ['$orders.status', 3] }
                  ]
                },
                { $trunc: ['$orders.delivery_charges', 2] },
                0
              ]
            }
          }
        }
      },
      {
        $sort: { name: 1 }
      }
    ];

    if (pageNo && perPage) {
      aggregateArray.push(
        { $skip: ((pageNo - 1) * perPage) },
        { $limit: perPage }
      );
    }
    return Store.aggregate(aggregateArray);
  },

  getStoreSalesReportWithPagination(pageNo, perPage, from_date, to_date, search) {
    return Store.aggregate([
      {
        $match: {
          name: new RegExp(search, 'i')
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'store_id',
          as: 'orders'
        }
      },
      {
        $project: {
          name: 1,
          _id: 1,
          contact_number: '$owner.contact_number',
          orders: {
            $filter: {
              input: '$orders',
              as: 'item',
              cond: {
                $and: [
                  { $gte: ['$$item.created_at', moment(from_date).toDate()] },
                  { $lt: ['$$item.created_at', moment(to_date).toDate()] }
                ]
              }
            }
          }
        }
      },
      {
        $unwind: {
          path: '$orders',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          contact_number: { $first: '$contact_number' },
          total: {
            $sum: {
              $cond: [
                { $gt: ['$orders.total_amount_after_tax', 0] },
                1,
                0
              ]
            }
          },
          pending: {
            $sum: {
              $cond: [
                { $eq: ['$orders.status', 1] },
                1,
                0
              ]
            }
          },
          openForDriver: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$orders.is_delivered_by_store', false] },
                    { $eq: ['$orders.status', 1] },
                    { $eq: ['$orders.driver_assigned', false] }
                  ]
                },
                1,
                0
              ]
            }
          },
          acceptedByDrivers: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$orders.is_delivered_by_store', false] },
                    { $eq: ['$orders.status', 1] },
                    { $eq: ['$orders.driver_assigned', true] }
                  ]
                },
                1,
                0
              ]
            }
          },
          dispatched: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$orders.status', 2] },
                    { $eq: ['$orders.status', 6] }
                  ]
                },
                1,
                0
              ]
            }
          },
          delivered: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$orders.status', 3] }
                  ]
                },
                1,
                0
              ]
            }
          },
          cancelled: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$orders.status', 5] }
                  ]
                },
                1,
                0
              ]
            }
          },
          undelivered: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$orders.status', 4] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $skip: ((pageNo - 1) * perPage)
      },

      {
        $limit: perPage
      }
    ]);
  },

  getStoreReportWithPagination({
    storeId,
    pageNo = null,
    perPage = null,
    fromDate = null,
    toDate = null,
    search = ''
  }) {
    const aggregateArray = [
      {
        $match: {
          ...(!!storeId && { _id: mongoose.Types.ObjectId(storeId) }),
          ...(!!search && { name: { $regex: search, $options: 'i' } })
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'store_id',
          as: 'orders'
        }
      },
      {
        $unwind: {
          path: '$orders',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          'orders.status': 3,
          ...((fromDate || toDate) && {
            'orders.created_at': {
              ...(fromDate && { $gte: moment(fromDate).toDate() }),
              ...(toDate && { $lte: moment(toDate).toDate() })
            }
          })
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          ownerName: { $first: '$owner.full_name' },
          items: {
            $sum: {
              $reduce: {
                input: { $ifNull: ['$orders.products', []] },
                initialValue: 0,
                in: { $sum: ['$$value', '$$this.count'] }
              }
            }
          },
          soldQty: { $sum: 1 },
          sales: { $sum: { $trunc: ['$orders.total_amount', 2] } },
          totalCommission: { $sum: { $trunc: ['$orders.admin_commission_amount', 2] } }
        }
      },
      {
        $sort: {
          name: 1
        }
      }
    ];

    if (pageNo && perPage) {
      aggregateArray.push(
        { $skip: ((pageNo - 1) * perPage) },
        { $limit: perPage }
      );
    }

    return Store.aggregate(aggregateArray);
  },

  getCommissionPerStoreReportWithPagination({
    storeId,
    pageNo = null,
    perPage = null,
    fromDate = null,
    toDate = null,
    search = ''
  }) {
    const aggregateArray = [
      {
        $match: {
          ...(!!storeId && { _id: mongoose.Types.ObjectId(storeId) }),
          ...(!!search && { name: { $regex: search } })
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'store_id',
          as: 'orders'
        }
      },
      {
        $unwind: {
          path: '$orders',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          'orders.status': 3,
          ...((fromDate || toDate) && {
            'orders.created_at': {
              ...(fromDate && { $gte: moment(fromDate).toDate() }),
              ...(toDate && { $lte: moment(toDate).toDate() })
            }
          })
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          ownerName: { $first: '$owner.full_name' },
          sales: { $sum: '$orders.total_amount' },
          totalCommission: { $sum: { $trunc: ['$orders.admin_commission_amount', 2] } }
        }
      },
      {
        $sort: {
          name: 1
        }
      }
    ];
    if (pageNo && perPage) {
      aggregateArray.push(
        { $skip: ((pageNo - 1) * perPage) },
        { $limit: perPage }
      );
    }
    return Store.aggregate(aggregateArray);
  },

  getCouponsReportWithPagination({
    storeId,
    pageNo,
    perPage,
    fromDate = null,
    toDate = null
  }) {
    const aggregateArray = [
      {
        $match: {
          coupon: { $ne: null },
          ...(!!storeId && { store_id: mongoose.Types.ObjectId(storeId) }),
          ...((fromDate || toDate) && {
            created_at: {
              ...(fromDate && { $gte: moment(fromDate).toDate() }),
              ...(toDate && { $lte: moment(toDate).toDate() })
            }
          })
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $unwind: '$customer'
      },
      {
        $project: {
          _id: '$coupon._id',
          couponCode: '$coupon.code',
          orderId: '$order_id',
          customer: '$customer.full_name',
          couponAmount: '$discount',
          usedDate: '$created_at'
        }
      },
      {
        $sort: {
          couponAmount: -1
        }
      },
      {
        $skip: ((pageNo - 1) * perPage)
      }
    ];
    if (pageNo && perPage) {
      aggregateArray.push(
        { $skip: ((pageNo - 1) * perPage) },
        { $limit: perPage }
      );
    }
    return Order.aggregate(aggregateArray);
  },

  getDriverCommissionReport({
    pageNo, perPage, fromDate, toDate, driverId = null, orderId = null
  }) {
    const dataFiltering = [];
    if (pageNo && perPage) {
      dataFiltering.push(
        { $skip: ((pageNo - 1) * perPage) },
        { $limit: perPage }
      );
    }

    return Order.aggregate([
      {
        $match: {
          status: 3,
          ...(driverId && { driver_id: mongoose.Types.ObjectId(driverId) }),
          ...(orderId && { order_id: orderId }),
          ...((fromDate || toDate) && {
            created_at: {
              ...(fromDate && { $gte: moment(fromDate).toDate() }),
              ...(toDate && { $lte: moment(toDate).toDate() })
            }
          })
        }
      },
      {
        $sort: { created_at: -1 }
      },
      {
        $facet: {
          pagination: [{ $count: 'totalItems' }, { $addFields: { pageNo, perPage } }],
          data: [
            {
              $project: {
                orderId: '$order_id',
                totalAmount: { $trunc: ['$total_amount', 2] },
                totalAdminCommission: { $trunc: ['$admin_commission_amount', 2] },
                totalDriverCommission: {
                  $ifNull: ['$driver_commission', 0]
                }
              }
            },
            ...dataFiltering
          ]
        }
      }
    ]);
  },


  getDriverOrdersByDriverId({
    pageNo, perPage, fromDate, toDate, driverId
  }) {
    return Order.aggregate([
      {
        $match: {
          driver_id: mongoose.Types.ObjectId(driverId),
          ...((fromDate || toDate) && {
            created_at: {
              ...(fromDate && { $gte: moment(fromDate).toDate() }),
              ...(toDate && { $lte: moment(toDate).toDate() })
            }
          })
        }
      },
      {
        $project: {
          orderId: '$order_id',
          totalAmount: '$total_amount',
          totalAdminCommission: {
            $sum: '$admin_commission_amount'
          },
          totalDriverCommission: {
            $sum: '$driver_commission'
          }
        }
      },
      {
        $sort: { totalAmount: -1 }
      },
      {
        $skip: ((pageNo - 1) * perPage)
      },
      {
        $limit: perPage
      }
    ]);
  }
};

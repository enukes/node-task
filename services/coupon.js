const mongoose = require('mongoose');
const Coupon = require('../models/coupon');

class CouponService {
  getCouponsWithPagination(request, pageNo, perPage, search, sort) {
    if (request.store_id) request = { 'store._id': request.store_id };
    const condition = {
      $and:
                [
                  {
                    $or:
                            [
                              { code: new RegExp(search, 'i') },
                              { 'store.name': new RegExp(search, 'i') }
                            ]
                  },
                  request
                ]
    };
    return Coupon.find(condition).skip((pageNo - 1) * perPage).limit(perPage).sort(sort);
  }

  getTotalCouponsCount(request, search) {
    if (request.store_id) request = { 'store._id': request.store_id };
    const condition = {
      $and:
                [
                  {
                    $or:
                            [
                              { code: new RegExp(search, 'i') },
                              { 'store.name': new RegExp(search, 'i') }
                            ]
                  },
                  request
                ]
    };
    return Coupon.countDocuments(condition);
  }

  getCoupon(request) {
    return Coupon.findOne(request);
  }

  addCoupon(details) {
    return new Coupon(details).save();
  }

  updateCoupon(criteria, details) {
    return Coupon.findOneAndUpdate(criteria, details, { new: true });
  }

  deleteCoupon(request) {
    return Coupon.deleteOne(request);
  }
}

module.exports = new CouponService();

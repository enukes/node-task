const Views = require('../models/views');

module.exports = {
 
  addViews(request) {
    return new Views(request).save();
  },

  getViews(criteria) {
    const condition = {
      $and:[{ viewDate: { $gt: criteria.fromDate, $lt: criteria.toDate } },{productId:criteria.product}]
    };
    return Views.distinct("userId",condition);
  },

  getCount(criteria) {
    const condition = {
      $and:[{ viewDate: { $gt: criteria.fromDate, $lt: criteria.toDate } },{productId:criteria.product}]
    };
    return Views.find(condition);
  },


};

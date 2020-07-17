const mongoose = require('mongoose');
const Offer = require('../models/offer');

module.exports = {

  /**
   * Add new offer
   */
  addOffer(offerDetails) {
    return new Offer(offerDetails).save();
  },

  /**
   * Updated an offer
   */
  updatedOffer(criteria, offerDetails) {
    return Offer.findOneAndUpdate(criteria, offerDetails, { new: true });
  },

  /**
   * Get offers
   */
  getOffers(criteria, perPage = null) {
    const aggregateExp = [
      {
        $match: criteria
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categoryDetails'
        }
      },
      {
        $unwind: '$categoryDetails'
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'subCategoryId',
          foreignField: '_id',
          as: 'subCategoryDetails'
        }
      },
      {
        $unwind: '$subCategoryDetails'
      },
      {
        $sort: {
          created_at: -1
        }
      }
    ];
    if (perPage) {
      aggregateExp.push({
        $limit: perPage
      });
    }
    return Offer.aggregate(aggregateExp);
  },

  deleteOffer(criteria) {
    return Offer.remove(criteria);
  }

};

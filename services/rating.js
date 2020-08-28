const Rating = require('../models/ratings');

module.exports = {
  acceptRating(details) {
    return new Rating(details).save();
  }
}

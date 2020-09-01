const mongoose = require('mongoose');

module.exports = {
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  },

  isValidMongoId(str) {
    return mongoose.Types.ObjectId.isValid(str);
  },

  getInvoiceFromOrder(orderId) {
    let result = '';

    for (let i = 0; i < orderId.length; i++) {
      const temp = orderId.charCodeAt(i);
      result = result.concat(temp);
    }

    return result;
  },

    /**
   * Get distance between 2 lat & long in KM
   */
  getDistanceInKM: (reqBody) => {
    const unit = 'K';
    const lat1 = reqBody.pickupLat;
    const lon1 = reqBody.pickupLong;
    const lat2 = reqBody.dropOffLat;
    const lon2 = reqBody.dropOffLong;
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2)
      + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = (dist * 60) * 1.1515;
    if (unit === 'K') { dist *= 1.609344; }
    if (unit === 'N') { dist *= 0.8684; }
    return Math.ceil(dist);
  }

};

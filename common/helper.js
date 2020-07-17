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
  }

};

/* eslint-disable no-console */
const ResponseCodeService = require('./response-codes');

module.exports = {
  success(data = {}) {
    console.table([{ data }]);
    return {
      success: true,
      code: 200,
      data
    };
  },

  failure(e) {
    console.table([{ code: e.code, name: e.name, message: e.message }]);
    return {
      success: false,
      code: ResponseCodeService.getCode(e.code),
      singleStringMessage: e.message ? e.message.replace(/\s+$/g, '.') : e.message,
      error: e.error || e
    };
  }
};

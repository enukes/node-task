const ResponseService = require('../../common/response');
const StoreService = require('../../services/store');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

module.exports = {
  getStoreProfile: async (req, res) => {
    try {
      const storeId = req._userInfo._user_id;
      const store = await StoreService.getStore({ _id: storeId });
      if (!store) {
        throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID)
      }
      return res.status(200).json(ResponseService.success({ store }))

    }
    catch (error) {
      return res.status(error.code || 500).json(ResponseService.failure(error))
    }
  }
};

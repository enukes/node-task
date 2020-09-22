const ResponseService = require('../../common/response');
const ServiceService = require('../../services/service_provider');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

module.exports = {
  getServiceproviderProfile: async (req, res) => {
    try {
      const serviceproviderId = req._userInfo._user_id;
      const serviceprovider = await ServiceService.getServiceProviderProfile(serviceproviderId);
      if (!serviceprovider) {
        throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID)
      }
      return res.status(200).json(ResponseService.success({ serviceprovider }))

    }
    catch (error) {
      return res.status(error.code || 500).json(ResponseService.failure(error))
    }
  }
};

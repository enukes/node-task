const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const messages = require('../../common/messages');
const ServiceProviderCategoryService =  require('../../services/service_provider_category');

module.exports = {
  addServiceCategory: async(req, res) => {
    try{
      const serviceProviderCategoryToBeCreated = { ...req.body};
      if (!serviceProviderCategoryToBeCreated.name) {
        throw new apiError.ValidationError('serviceProviderCategoryDetails', messages.NAME_REQUIRED);
      }
      const createdServiceProviderCategory = await ServiceProviderCategoryService.addServiceProviderCategory(serviceProviderCategoryToBeCreated);
      return res.status(200).send(ResponseService.success({ createdServiceProviderCategory}));
    }
    catch(error) {
      return res.status(error.code || 500).json(ResponseService.failure(error))
    }
  }
}

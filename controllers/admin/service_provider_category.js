const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const messages = require('../../common/messages');
const ServiceProviderCategoryService =  require('../../services/service_provider_category');
const config = require('../../config/constants');

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
  },

  getServiceProviderCategories: async(req, res) => {
    try{
     const search = req.query.search || '';
     const status = Number(req.query.status);
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);

      const serviceProviderCategories = await ServiceProviderCategoryService.getAllServiceProviderCategories(
        search,
        pageNo,
        perPage,
        status
      );
      if (!serviceProviderCategories) throw new apiError.InternalServerError();

      const totalServiceProviderCategories = await ServiceProviderCategoryService.getServiceProviderCategoryCount(
        {}, search
      );
      return res.status(200).send(ResponseService.success({
        serviceProviderCategories,
        totalServiceProviderCategories
      }));
    }
    catch(error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  }
}

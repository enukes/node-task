const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const messages = require('../../common/messages');
const ServiceProviderCategoryService = require('../../services/service_provider_category');
const ServiceProviderService = require('../../services/service_provider');
const config = require('../../config/constants');

module.exports = {
  addServiceCategory: async (req, res) => {
    try {
      const serviceProviderCategoryToBeCreated = { ...req.body };
      if (!serviceProviderCategoryToBeCreated.name) {
        throw new apiError.ValidationError('serviceProviderCategoryDetails', messages.NAME_REQUIRED);
      }
      const createdServiceProviderCategory = await ServiceProviderCategoryService.addServiceProviderCategory(serviceProviderCategoryToBeCreated);
      return res.status(200).send(ResponseService.success({ createdServiceProviderCategory }));
    }
    catch (error) {
      return res.status(error.code || 500).json(ResponseService.failure(error))
    }
  },

  getServiceProviderCategories: async (req, res) => {
    try {
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
    catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  },

  updateServiceProviderCategory: async (req, res) => {
    try {
      const serviceProviderCategoryId = req.params.id;
      const categoryToBeUpdated = { ...req.body };
      delete categoryToBeUpdated._id;

      let foundCategory = await ServiceProviderCategoryService.getServiceProviderCategoryById(serviceProviderCategoryId);
      if (!foundCategory) {
        throw new apiError.InternalServerError();
      }
      foundCategory = await ServiceProviderCategoryService.updateServiceProviderCategory(
        categoryToBeUpdated,
        { _id: serviceProviderCategoryId },
      );
      return res.status(200).send(ResponseService.success());
    }
    catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  },

  deleteServiceProviderCategory: async (req, res) => {
    try {
      const serviceProviderCategoryId = req.params.id;
      const foundCategory = await ServiceProviderCategoryService.getServiceProviderCategoryById(serviceProviderCategoryId);
      if (!foundCategory) {
        throw new apiError.ValidationError('serviceProviderCategoryDetails', messages.SERVICE_PROVIDER_CATEGORY_ID_INVALID);
      }

      const associatedService = await ServiceProviderService.getServiceProvidersByCategoryId(serviceProviderCategoryId);
      if (associatedService) {
        throw new apiError.ValidationError('Service Provider Category Id', messages.SERVICE_PROVIDER_CATEGORY_ID_ASSOCIATED);
      }
      const deleteServiceProviderCategory = await ServiceProviderCategoryService.deleteServiceProviderCategory(serviceProviderCategoryId);
      return res.status(200).send(ResponseService.success({ serviceProviderCategory: deleteServiceProviderCategory }));

    } catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }
  }
}

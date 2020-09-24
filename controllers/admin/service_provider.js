const bcrypt = require('bcrypt');
const sh = require('shorthash');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const ServiceProviderService = require('../../services/service_provider');
const AreaService = require('../../services/area');
const config = require('../../config/constants');
const ServiceOrderService = require('../../services/service_order');

module.exports = {

  /**
   * Add a Service Provider
   */
  addAServiceProvider: async (req, res) => {
    try {
      const request = { ...req.body };
      if (!request.owner) {
        throw new apiError.ValidationError('owner_details', messages.OWNER_DETAILS_REQUIRED);
      }
      if (!request.address) {
        throw new apiError.ValidationError('owner_details', messages.ADDRESS_REQUIRED);
      }
      if (!request.timings) {
        throw new apiError.ValidationError('owner_details', messages.TIMINGS_REQUIRED);
      }

      const serviceProviderCategoryId = request.serviceCategory;
      if (!serviceProviderCategoryId || !HelperService.isValidMongoId(serviceProviderCategoryId)) {
        throw new apiError.ValidationError('serviceProviderCategoryId', messages.ID_INVALID);
      }

      request.owner = JSON.parse(request.owner);
      request.address = JSON.parse(request.address);
      request.timings = JSON.parse(request.timings);

      if (!request.owner.email) {
        throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);
      }
      if (!request.owner.contact_number) {
        throw new apiError.ValidationError('email', messages.CONTACT_REQUIRED);
      }

      let service_provider = await ServiceProviderService.getServiceProvider({ 'owner.email': request.owner.email });
      if (service_provider) {
        throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);
      }

      service_provider = await ServiceProviderService.getServiceProvider({ 'owner.contact_number': request.owner.contact_number });
      if (service_provider) {
        throw new apiError.ValidationError('contact_number', messages.CONTACT_ALREADY_EXIST);
      }

      if (!request.owner && !request.owner.password) {
        throw new apiError.ValidationError('owner_password', messages.PASSWORD_REQUIRED);
      }
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(request.owner.password, salt);

      if (!hash) {
        throw apiError.InternalServerError();
      }

      request.owner.password = hash;
      if (!req.file) {
        throw new apiError.ValidationError('picture', messages.STORE_PICTURE_REQUIRED);
      }
      if (req.file) {
        request.picture = req.file.filename;
      }

      const element = request.address;
      if (element.unique_link) {
        const city = await AreaService.getCity({ _id: element.city_id });
        const area = await AreaService.getArea({ _id: element.area_id });
        element.unique_link = sh.unique(request.name + city.name + area.name);
      }
      const data = await ServiceProviderService.createServiceProvider(request);
      if (!data.success) {
        throw new apiError.InternalServerError();
      }
      return res.status(200).send(ResponseService.success({ service_provider: data.service_provider }));
    } catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  },

  /**
   * Update a Service Provider
   */

  updateAServiceProvider: async (req, res) => {
    try {
      const request = { ...req.body };
      const type = req.baseUrl.split('/')[2];
      if (!request.owner) {
        throw new apiError.ValidationError('owner_details', messages.OWNER_DETAILS_REQUIRED);
      }
      if (!request.address) {
        throw new apiError.ValidationError('owner_details', messages.ADDRESS_REQUIRED);
      }
      if (!request.timings) {
        throw new apiError.ValidationError('owner_details', messages.TIMINGS_REQUIRED);
      }
      if (request.serviceProviderApproval === 'Pending' && request.status === '1') {
        throw new apiError.ValidationError('serviceProviderApproval', messages.SERVICE_PROVIDER_PERMISSION)
      }

      // const serviceProviderCategoryId = request.serviceCategory;
      // if (!serviceProviderCategoryId || !HelperService.isValidMongoId(serviceProviderCategoryId)) {
      //   throw new apiError.ValidationError('serviceProviderCategoryId', messages.ID_INVALID);
      // }

      if (!(request.categories && request.categories.length > 0)) {
        throw new apiError.ValidationError('category', messages.CATEGORY_ID_REQUIRED);
      }
      

      request.owner = JSON.parse(request.owner);
      request.address = JSON.parse(request.address);
      request.timings = JSON.parse(request.timings);
      request.categories = JSON.parse(request.categories);

      request.categories.forEach((element) => {
        if (!element || !HelperService.isValidMongoId(element)) {
          throw new apiError.ValidationError('categoryId', messages.ID_INVALID);
        }
      });

      if (request.address.length === 0) {
        throw new apiError.ValidationError('address', messages.ADDRESS_REQUIRED);
      }

      const { id } = req.params;
      if (!HelperService.isValidMongoId(id)) {
        throw new apiError.ValidationError('serviceProviderCategoryId', messages.ID_INVALID);
      }

      const service_provider = await ServiceProviderService.getServiceProvider({ _id: id });
      if (!service_provider) {
        throw new apiError.ValidationError('service_provider_id', messages.ID_INVALID);
      }
      if (service_provider.serviceProviderApproval === 'Approved' && type=="serviceprovider") {
        throw new apiError.ValidationError('serviceProviderApproval', messages.SERVICE_PROVIDER_PROFILE_NOT_UPDATE);
      }

      delete request._id;
      delete request.password;

      if (req.file) {
        request.picture = req.file.filename;
      } else {
        request.picture = service_provider.picture;
      }

      for (let i = 0; i < request.address.length; i++) {
        const element = request.address[i];
        if (element.unique_link) continue;
        const city = await AreaService.getCity({ _id: element.city_id });
        const area = await AreaService.getArea({ _id: element.area_id });
        element.unique_link = sh.unique(request.name + city.name + area.name);
      }
      const updatedServiceProvider = await ServiceProviderService.updateServiceProvider(request, { _id: id });
      return res.send(ResponseService.success({ serviceProvider: updatedServiceProvider }));
    } catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  },

  /**
   * Get Service Provider List
   */

  getServiceProviderList: async (req, res) => {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const search = req.query.search || '';
      const sort = { [req.query.name]: Number(req.query.sortType) };

      const serviceProviders = await ServiceProviderService.getServiceProvidersWithPagination({}, pageNo, perPage, search, sort);

      const paginationVariables = {
        pageNo,
        perPage
      };

      paginationVariables.totalItems = await ServiceProviderService.getTotalServiceProviderCount({}, search);
      return res.status(200).send(ResponseService.success({ serviceProviders, paginationVariables }));
    } catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  },

  /**
   * Delete Service Provider
   */

  deleteServiceProvider: async (req, res) => {
    try {
      const serviceProviderId = req.params.id;
      if (!HelperService.isValidMongoId(serviceProviderId)) {
        throw new apiError.ValidationError('id', messages.ID_INVALID);
      }

      const serviceProvider = await ServiceProviderService.getServiceProvider({ _id: serviceProviderId });
      if (!serviceProvider) {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_PROVIDER_ID_INVALID);
      }

      const serviceOrder = await ServiceOrderService.getServiceOrder({ service_provider_id: serviceProviderId });
      if (serviceOrder) {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_PROVIDER_ORDER_EXISTS_CANNOT_BE_DELETED);
      }

      const deletedServiceProvider = await ServiceProviderService.deleteServiceProvider(serviceProviderId);
      if (!deletedServiceProvider) {
        throw new apiError.InternalServerError();
      }

      return res.status(200).send(ResponseService.success({ service_provider: deletedServiceProvider }));
    } catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  }
};

const mongoose = require('mongoose');
const ServicesService = require('../../services/service');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');
const ServiceProviderService = require('../../services/service_provider');

module.exports = {
 
 async addService(req, res) {
    try {
      const request = { ...req.body };
      const userType = req._userInfo._user_type;

      request.pictures = (req.files && (req.files.length>1))
        ? req.files.map((file) => file.filename)
        : req.files[0].filename;

      if (!request.service_provider_id && `${userType}` !== '5') throw new apiError.ValidationError('service_provider_id', messages.SERVICE_ID_REQUIRED);

      if (`${userType}` === '5') {
      request.service_provider_id = req._userInfo._user_id; 
      const service = await ServiceProviderService.getServiceProvider({ _id: request.service_provider_id });
      if (!(service.serviceProviderApproval === 'Approved')) {
        throw new apiError.ValidationError('serviceApproval', messages.SERVICE_PROVIDER_PERMISSION);
      }
      }

      const service = await ServicesService.addAServiceToServiceProvider(request);
      return res.status(200).send(ResponseService.success(service));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },
  
  async getService(req, res) {
    try {
      const criteria = {};
      const type = req._userInfo._user_type;
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      criteria.search = req.query.search || '';
      const sort = { [req.query.name]: Number(req.query.sortType) };
      const request = { ...req.query };
      
      if (!request.service_provider_id && type !== 5) {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_ID_REQUIRED);
      }

      if (type === 5) {
        criteria.service_provider_id = req._userInfo._user_id;
        const service = await ServiceProviderService.getServiceProvider({ _id: criteria.service_provider_id });
        if (!(service.serviceProviderApproval === 'Approved')) {
          throw new apiError.ValidationError('serviceApproval', messages.SERVICE_PROVIDER_PERMISSION);
        }
        }
      else criteria.service_provider_id = request.service_provider_id;

      const paginationVariables = { pageNo, perPage };
      const services = await ServicesService.getServicesWithPagination(
        {},
        pageNo,
        perPage,
        criteria,
        sort
      );

      paginationVariables.totalItems = await ServicesService.getTotalServicesCount({}, criteria);
      return res.status(200).send(ResponseService.success({ services, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async deleteService(req, res) {
    try {
      const { id } = req.params;
      if (!HelperService.isValidMongoId(id)) throw new apiError.ValidationError('service_provider_id', messages.ID_INVALID);

      const type = req._userInfo._user_type;

      const condition = {
        _id: id
      };

      if (`${type}` === '5') condition.service_provider_id = req._userInfo._user_id;

      const service = await ServicesService.getService(condition);
      if (!service) throw new apiError.ValidationError('service_id', messages.ID_INVALID);

      const deletedService = await ServicesService.deleteService({ _id: id });

      return res.status(200).send(ResponseService.success({ service: deletedService }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async getServiceOrderHistory(req, res) {
    try {
      const criteria = {};
      const type = req._userInfo._user_type;
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      criteria.search = req.query.search || '';
      const sort = { [req.query.name]: Number(req.query.sortType) };
      const request = { ...req.query };
      
      if (!request.service_provider_id && type !== 5) {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_ID_REQUIRED);
      }

      if (type === 5) 
      {
        criteria.service_provider_id = req._userInfo._user_id;
        const service = await ServiceProviderService.getServiceProvider({ _id: criteria.service_provider_id });
        if (!(service.serviceProviderApproval === 'Approved')) {
          throw new apiError.ValidationError('serviceApproval', messages.SERVICE_PROVIDER_PERMISSION);
        }
        }
              else criteria.service_provider_id = request.service_provider_id;

      const paginationVariables = { pageNo, perPage };
      const subcategories = await ServicesService.getServiceOrderWithPagination(
        {},
        pageNo,
        perPage,
        criteria,
        sort
      );

      paginationVariables.totalItems = await ServicesService.getTotalServiceOrderCount({}, criteria);
      return res.status(200).send(ResponseService.success({ subcategories, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  updateAService: async (req, res) => {
    try {
      const request = { ...req.body };
      const { id } = req.params;

      delete request.created_at;
      delete request.updated_at;
      delete request._id;
      delete request.__v;
      delete request.service_provider_id;

      if (!request.name) {
        throw new apiError.ValidationError('service_name', messages.NAME_REQUIRED);
      }
      if (!HelperService.isValidMongoId(id)) {
        throw new apiError.ValidationError('service_id', messages.ID_INVALID);
      }

      const foundService = await ServicesService.getService({
        _id: mongoose.Types.ObjectId(id)
      });
      if (!foundService) {
        throw new apiError.ValidationError('service_id', messages.ID_INVALID);
      }

      request.pictures = foundService.pictures ? foundService.pictures : {};
      if (req.file) {
        request.pictures = req.file.filename;
      }
      request.price = JSON.parse(request.price);

      const updatedService = await ServicesService.updateService({ _id: id }, request);
      if (!updatedService) {
        throw new apiError.InternalServerError();
      }
      return res.status(200).send(ResponseService.success({ service: updatedService }));
    } catch (error) {
      return res.status(error.code || 500).json(ResponseService, failure(error));
    }
  }

};

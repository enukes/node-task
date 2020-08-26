const mongoose = require('mongoose');
const apiError = require('../../common/api-errors');
const ResponseService = require('../../common/response');
const config = require('../../config/constants');
const ServicesService = require('../../services/service');
const messages = require('../../common/messages');
const HelperService = require('../../common/helper');

module.exports = {
  getServices: async (req, res) => {
    try {
      const criteria = {};
      const type = req._userInfo._user_type;
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const request = { ...req.query };

      if (!request.service_provider_id && type !== 2) {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_ID_REQUIRED);
      }

      criteria.search = request.search ? request.search : '';
      if (type === 2) {
        criteria.service_provider_id = req._userInfo._user_id;
      } else {
        criteria.service_provider_id = request.service_provider_id;
      }

      const sort = { [req.query.name]: Number(req.query.sortType) };
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
    } catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  },

  addAService: async (req, res) => {
    try {
      const request = { ...req.body };
      const userType = req._userInfo._user_type;
      if (req.file) {
        request.pictures = req.file.filename;
      }

      if (!request.service_provider_id && `${userType}` !== '2') {
        throw new apiError.ValidationError('service_provider_id', messages.SERVICE_ID_REQUIRED);
      }

      if (`${userType}` === '2') {
        request.service_provider_id = req._userInfo._user_id;
      }

      request.order_max = Number(request.order_max);
      request.price = JSON.parse(request.price);

      const service = await ServicesService.addAServiceToServiceProvider(request);
      return res.status(200).send(ResponseService.success(service));
    } catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
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
  },

  deleteAService: async (req, res) => {
    try {
      const serviceId = req.params.id;
      if (!HelperService.isValidMongoId(serviceId)) {
        throw new apiError.ValidationError('id', messages.ID_INVALID);
      }

      const service = await ServicesService.getService({ _id: serviceId });
      if (!service) {
        throw new apiError.ValidationError('service_id', messages.SERVICE_ID_INVALID);
      }
      const deletedService = await ServicesService.deleteService({ _id: serviceId });
      return res.status(200).send(ResponseService.success({ service: deletedService }));
    } catch (error) {
      return res.status(error.code || 500).json(ResponseService.failure(error));
    }
  }
};

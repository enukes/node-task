const AreaService = require('../../services/area');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');

class AreaController {
  async getCitiesList(req, res) {
    try {
      const search = req.query.search || '';

      const pageNo = parseInt(req.query.pageNo || config.pagination.pageNo);
      const perPage = parseInt(req.query.perPage || config.pagination.perPage);

      const cities = await AreaService.getOnlyCitiesWithPagination(search, pageNo, perPage);

      const totalCityCount = await AreaService.getCityCount({}, search);

      if (!cities) throw apiError.InternalServerError();

      return res.status(200).send(ResponseService.success({ cities, totalCityCount }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async getAreasList(req, res) {
    try {
      const { city_id } = req.query;

      const pageNo = parseInt(req.query.pageNo || config.pagination.pageNo);
      const perPage = parseInt(req.query.perPage || 2);
      const search = req.query.search || '';

      if (!city_id) throw new apiError.ValidationError('city_id', messages.CITY_ID_REQUIRED);

      const city = await AreaService.getAreasWithPagination(city_id, search, pageNo, perPage);

      const totalAreaCount = await AreaService.getAreaCount(city_id, search);

      return res.status(200).send(ResponseService.success({ city, totalAreaCount }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async addArea(req, res) {
    try {
      const request = { ...req.body };
      if (!request.name) throw new apiError.ValidationError('area_details', messages.NAME_REQUIRED);
      if (!request.status) throw new apiError.ValidationError('area_details', messages.STATUS_REQUIRED);
      if (!request.city_id) throw new apiError.ValidationError('area_details', messages.CITY_ID_REQUIRED);

      const area = await AreaService.addArea(request);

      return res.status(200).send(ResponseService.success({ area }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async updateArea(req, res) {
    try {
      const request = { ...req.body };
      const area_id = req.params.id;

      let area = await AreaService.getArea({ _id: area_id });
      if (!area) throw new apiError.InternalServerError();

      area = await AreaService.updateArea({ _id: area_id }, request);

      return res.status(200).send(ResponseService.success({ area }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async deleteArea(req, res) {
    try {
      const area_id = req.params.id;

      const area = await AreaService.getArea({ _id: area_id });
      if (!area) throw new apiError.ValidationError('area_id', messages.AREA_ID_INVALID);

      const deletedArea = await AreaService.deleteArea(area_id);
      console.log('deletedArea', deletedArea);
      return res.status(200).send(ResponseService.success({ area: deletedArea }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new AreaController();

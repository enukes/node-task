const CityService = require('../../services/city');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

class CityController {
  async addCity(req, res) {
    try {
      const request = { ...req.body };

      if (!request.name) throw new apiError.ValidationError('city_details', messages.NAME_REQUIRED);
      const city = await CityService.addCity(request);

      return res.status(200).send(ResponseService.success({ city }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async updateCity(req, res) {
    try {
      const city_id = req.params.id;

      const request = { ...req.body };

      delete request._id;

      let city = await CityService.getCity(city_id);

      if (!city) throw new apiError.InternalServerError();
      city = await CityService.updateCity({ _id: city_id }, { name: request.name, status: request.status });

      return res.status(200).send(ResponseService.success({ city }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async deleteCity(req, res) {
    try {
      const city_id = req.params.id;

      const city = await CityService.getCity(city_id);
      if (!city) throw new apiError.ValidationError('city_id', messages.CITY_ID_INVALID);

      const deletedCity = await CityService.deleteCity(city_id);
      return res.status(200).send(ResponseService.success({ area: deletedCity }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new CityController();

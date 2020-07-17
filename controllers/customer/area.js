const AreaService = require('../../services/area');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

module.exports = {
  async getCitiesList(req, res) {
    try {
      const cities = await AreaService.getOnlyActiveCities();
      if (!cities) throw apiError.InternalServerError();

      return res.status(200).send(ResponseService.success({ cities }));
    } catch (e) {
      return res.status(e.code).send(ResponseService.failure(e));
    }
  },

  async getAreasList(req, res) {
    try {
      const request = { ...req.query };

      if (!request.city_id) throw new apiError.ValidationError('city_id', messages.CITY_ID_REQUIRED);

      const city = await AreaService.getActiveCityAreas(request.city_id);

      return res.status(200).send(ResponseService.success({ city }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
};

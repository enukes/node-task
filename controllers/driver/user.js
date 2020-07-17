const DriverService = require('../../services/driver');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

class UserController {
  async getProfile(req, res) {
    try {
      const user_id = req._userInfo._user_id;

      const driver = await DriverService.getDriver({ _id: user_id });
      if (!driver) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      return res.send(ResponseService.success({ driver }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async updateProfile(req, res) {
    try {
      console.log(req.files);

      const user_id = req._userInfo._user_id;
      const request = { ...req.body };

      const driver = await DriverService.getDriver({ _id: user_id });
      if (!driver) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const { id } = req.params;
      if (id != user_id) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      if (request.is_online) request.is_online = JSON.parse(request.is_online);

      if (req.files && req.files.length > 0) {
        const picture = req.files.filter((ele) => ele.fieldname === 'picture');
        if (picture.length > 0) request.picture = picture[0].filename;

        const driving_picture = req.files.filter((ele) => ele.fieldname === 'driving_license_picture');
        if (driving_picture.length > 0) request.driving_license_picture = driving_picture[0].filename;
      }

      delete request.contact_number;
      delete request.email;
      delete request._id;
      delete request.password;
      delete request.verification_token;

      const updatedDriver = await DriverService.updateDriver(request, { _id: user_id });
      return res.send(ResponseService.success({ driver: updatedDriver }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async driverOnlineOffline(req, res) {
    try {
      const user_id = req._userInfo._user_id;

      if (!req.query.is_online) throw new apiError.ValidationError('online_status', messages.IS_ONLINE_REQUIRED);

      const is_online = req.query.is_online == 'true';

      const driver = await DriverService.getDriver({ _id: user_id });
      if (!driver) throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);

      const updatedDriver = await DriverService.updateDriver({ is_online }, { _id: user_id });
      return res.send(ResponseService.success({ driver: updatedDriver }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new UserController();

const bcrypt = require('bcrypt');
const DriverService = require('../../services/driver');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');

module.exports = {

  async addDriver(req, res) {
    try {
      const request = { ...req.body };

      if (!request.email) throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);
      if (!request.contact_number) throw new apiError.ValidationError('contact_number', messages.CONTACT_REQUIRED);

      let driver = await DriverService.getDriver({ email: request.email });
      if (driver) throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);

      driver = await DriverService.getDriver({ contact_number: request.contact_number });
      if (driver) throw new apiError.ValidationError('contact_number', messages.CONTACT_ALREADY_EXIST);

      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(request.password, salt);

      if (!hash) throw errorHandler.InternalServerError();

      request.password = hash;

      if (req.files && req.files.length > 0) {
        const drivingLicensePicture = req.files.filter((ele) => ele.fieldname === 'driving_license_picture');
        if (drivingLicensePicture.length > 0) {
          request.driving_license_picture = drivingLicensePicture[0].filename;
        }
        const picture = req.files.filter((ele) => ele.fieldname === 'picture');
        if (picture.length > 0) request.picture = picture[0].filename;
      }

      driver = await DriverService.createDriver(request);

      return res.status(200).send(ResponseService.success({ driver }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getAllDrivers(req, res) {
    try {
      const drivers = await DriverService.getDrivers({ status: 1 });
      return res.send(ResponseService.success({ drivers }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getDrivers(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const search = req.query.search || '';
      const sort = { [req.query.name]: Number(req.query.sortType) };

      const drivers = await DriverService.getDriversWithPagination(
        {},
        pageNo,
        perPage,
        search,
        sort
      );

      const totalCount = await DriverService.getTotalDriverCount({}, search);

      return res.status(200).send(ResponseService.success({ drivers, totalCount }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async updateDriver(req, res) {
    try {
      const data = req.body;
      const id = data._id;
      delete data._id;
      delete data.password;
      delete data.verification_token;
      delete data.created_at;
      delete data.updated_at;

      if (req.files && req.files.length > 0) {
        const drivingLicensePicture = req.files.filter((ele) => ele.fieldname === 'driving_license_picture');
        if (drivingLicensePicture.length > 0) {
          data.driving_license_picture = drivingLicensePicture[0].filename;
        }

        const picture = req.files.filter((ele) => ele.fieldname === 'picture');
        if (picture.length > 0) data.picture = picture[0].filename;
      }

      const driver = await DriverService.updateDriver(data, { _id: id });

      return res.status(200).send(ResponseService.success({ driver }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async deleteDriver(req, res) {
    try {
      const { id: driverId } = req.params;
      const canNotBeDelete = await DriverService.checkIfDriverIsAssigned(driverId);

      if (canNotBeDelete) {
        throw new apiError.ValidationError('driver_already_exists', messages.DRIVER_IS_ASSOCIATED);
      }

      const driver = await DriverService.deleteDriver({ _id: driverId });
      return res.status(200).send(ResponseService.success({ driver }));
    } catch (e) {
      return res.status(e.code).send(ResponseService.failure(e));
    }
  },

  async changeDriverPassword(req, res) {
    try {
      const request = { ...req.body };
      const { id } = req.params;

      if (!request.password) throw new apiError.ValidationError('password', messages.PASSWORD_REQUIRED);

      const driver = await DriverService.getDriver({ _id: id });
      if (!driver) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(request.password, salt);

      if (!hash) throw errorHandler.InternalServerError();

      const data = {
        password: hash
      };

      const updatedDriver = await DriverService.updateDriver(data, { _id: id });
      if (!updatedDriver) throw apiError.InternalServerError();

      return res.send(ResponseService.success({ driver: updatedDriver }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
};

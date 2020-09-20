const bcrypt = require('bcrypt');
const sh = require('shorthash');
const StoreService = require('../../services/store');
const OrderService = require('../../services/order');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const HelperService = require('../../common/helper');
const AreaService = require('../../services/area');
const { CategoryHelper, StoreHelper } = require('../../helper');
const ServiceProviderService = require('../../services/service_provider');
const DriverService = require('../../services/driver');


module.exports = {

  /**
   * Add a Service Provider
   */
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
  * Verify order during pickup and delivery
  */
  verifyOrder: async (req, res) => {
    try {
      const reqBody = req.body;
      const scannedById = req._userInfo._user_id;
      // if (!reqBody.scannedBy) {
      //   throw new apiError.ValidationError('scannedBy', messages.SCANNED_BY_REQUIRED)
      // }
      if (!reqBody.codeType) {
        throw new apiError.ValidationError('codeType', messages.CODE_TYPE_REQUIRED)
      }
      if (!reqBody.code) {
        throw new apiError.ValidationError('code', messages.CODE_REQUIRED)
      }
      if (!(reqBody.codeType === 'pickup' || reqBody.codeType === 'delivery')) {
        throw new apiError.ValidationError('codeType', messages.CODE_TYPE_INVALID)
      }
      let order = null;
      if (reqBody.codeType === 'pickup') {
        request = {
          store_id: scannedById,
          pickup_code: reqBody.code
        }
        const store = await StoreService.getStore({_id: store_id});
        if (!(store.storeApproval === 'Accepted')) {
          throw new apiError.ValidationError('storeApproval', messages.STORE_PERMISSION);
        }
        order = await OrderService.getOrder(request);
      } else {
        request = {
          driver_id: scannedById,
          delivery_code: reqBody.code
        }
        order = await OrderService.getOrder(request);
      }
      if(!order) {
        return res.status(500).send(ResponseService.success({ message: messages.PICKUP_CODE_INVALID }));
      }
      if (!order.driver_id) {
        return res.status(500).send(ResponseService.success({ message: messages.DRIVER_ORDER_NOT_ACCEPTED }));
      }
      const driver = await DriverService.getDriver({ _id: order.driver_id});

        if (order && driver) {
          return res.status(200).send(ResponseService.success({ order, driver, message: messages.ORDER_VERIFIED}, ));
      }
      return res.status(500).send(ResponseService.failure({ message: messages.ORDER_UNVERIFIED }));
    }
    catch (error) {
      if (error.name == 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Auth Token is Invalid.' });
      }
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }
  },
  /**
   * Store Register
   */
  createStore: async (req, res) => {
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
      request.owner = JSON.parse(request.owner);
      request.address = JSON.parse(request.address);
      request.timings = JSON.parse(request.timings);
      request.categories = JSON.parse(request.categories);

      if (request.address.length === 0 && request.address.length > 1) {
        throw new apiError.ValidationError('address', messages.ADDRESS_REQUIRED);
      }
      if (!request.owner.email) {
        throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);
      }
      if (!request.owner.contact_number) {
        throw new apiError.ValidationError('email', messages.CONTACT_REQUIRED);
      }
      if (!(request.categories && request.categories.length > 0)) {
        throw new apiError.ValidationError('category', messages.CATEGORY_ID_REQUIRED);
      }
      request.categories.forEach((element) => {
        if (!element._id || !HelperService.isValidMongoId(element._id)) {
          throw new apiError.ValidationError('categoryId', messages.ID_INVALID);
        }
      });
      request.status = 2;

      let store = await StoreService.getStore({ 'owner.email': request.owner.email });
      if (store) {
        throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);
      }

      store = await StoreService.getStore({ 'owner.contact_number': request.owner.contact_number });
      if (store) {
        throw new apiError.ValidationError('contact_number', messages.CONTACT_ALREADY_EXIST);
      }

      if (request.drivers && request.drivers.length > 0) {
        request.drivers = JSON.parse(request.drivers);
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
      if (req.files.length === 0) {
        throw new apiError.ValidationError('picture', messages.STORE_PICTURE_REQUIRED);
      }

      const storePicture = req.files.filter((ele) => ele.fieldname === 'store_picture');
      request.picture = storePicture[0].filename;
      request.commission = 10;

      for (let i = 0; i < request.address.length; i++) {
        const element = request.address[i];
        if (element.unique_link) continue;
        const city = await AreaService.getCity({ _id: element.city_id });
        const area = await AreaService.getArea({ _id: element.area_id });
        element.unique_link = sh.unique(request.name + city.name + area.name);
      }
      const data = await StoreService.createStore(request);
      if (!data.success) throw new apiError.InternalServerError();
      return res.status(200).send(ResponseService.success({ store: data.store }));
    }
    catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error));
    }
  },

  /**
   * Get All Categories
   */
  getAllCategoriesForStoreRegister: async (req, res) => {
    try {
      const result = await CategoryHelper.getAllCategories(req);
      if (result && result.success) {
        return res.status(200).json(result.data);
      }
      return res.status(500).json(result.error);
    }
    catch (error) {
      return res.status(500).send(ResponseService.failure(error));
    }
  },
  /**
  * Get All Categories
  */
  getAllStoreBySubCategory: async (req, res) => {
    try {
      const request = { ...req.query };
     
      if (!request.subCategory) {
        throw new apiError.ValidationError('subCategory', messages.SUBCATEGORY_REQUIRED);
      }
      if (!request.lat) {
        throw new apiError.ValidationError('lat', messages.LATITUDE_REQUIRED);
      }
      if (!request.long) {
        throw new apiError.ValidationError('long', messages.LONGITUDE_REQUIRED);
      }
      const result = await StoreHelper.getAllStoreByCategory(req);
    
      if (result && result.success) {
        return res.status(200).json(result.data);
      }
      return res.status(500).json(result.error);
    }
    catch (error) {
      return res.status(500).send(ResponseService.failure(error));
    }
  }

}

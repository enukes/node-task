const bcrypt = require('bcrypt');
const sh = require('shorthash');
const StoreService = require('../../services/store');
const OrderService = require('../../services/order');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const HelperService = require('../../common/helper');
const AreaService = require('../../services/area');
const { CategoryHelper } = require('../../helper');

module.exports = {
  /**
  * Verify order during pickup and delivery
  */
  verifyOrder: async (req, res) => {
    try {
      const reqBody = req.body;
      if (!reqBody.scannedBy) {
        throw new apiError.ValidationError('scannedBy', messages.SCANNED_BY_REQUIRED)
      }
      if (!reqBody.codeType) {
        throw new apiError.ValidationError('codeType', messages.CODE_TYPE_REQUIRED)
      }
      if (!reqBody.code) {
        throw new apiError.ValidationError('code', messages.CODE_REQUIRED)
      }
      if (!(reqBody.codeType === 'pickup' || reqBody.codeType === 'delivery')) {
        throw new apiError.ValidationError('codeType', messages.CODE_TYPE_INVALID)
      }
      let request = {
        pickup_code: reqBody.code,
      }
      let order = null;
      if (reqBody.codeType === 'pickup') {
        request = {
          store_id: reqBody.scannedBy
        }
        order = await OrderService.getOrder(request)
      } else {
        request = {
          driver_id: reqBody.scannedBy
        }
        order = await OrderService.getOrder(request);
      }
      if (order) {
        return res.status(200).send(ResponseService.success({ message: messages.ORDER_VERIFIED }));
      }
      return res.status(401).send(ResponseService.failure({ message: messages.ORDER_UNVERIFIED }));
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

      if (request.address.length === 0) {
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
      return res.status(500).send(ResponseService.failure(e));
    }
  }
}

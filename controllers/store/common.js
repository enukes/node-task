const ResponseService = require('../../common/response');
const StoreService = require('../../services/store');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

module.exports = {
  getStoreProfile: async (req, res) => {
    try {
      const storeId = req._userInfo._user_id;
      const store = await StoreService.getStoreProfile(storeId);
      if (!store) {
        throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID)
      }
      return res.status(200).json(ResponseService.success({ store }))

    }
    catch (error) {
      return res.status(error.code || 500).json(ResponseService.failure(error))
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
  updateDeviceToken: async (req, res) => {
    try {
      const request = { ...req.body };
      const storeId = req._userInfo._user_id;
      if (!request.device_token) {
        throw new apiError.ValidationError('device_token', messages.DEVICE_TOKEN_REQUIRED);
      }
      const store = await StoreService.getStore({ _id: storeId });
      if (!store) {
        throw new apiError.NotFoundError('store_id', messages.ID_INVALID);
      }
      if (store._id != req._userInfo._user_id) {
        throw new apiError.UnauthorizedError('device_token', messages.DEVICE_TOKEN_PERMISSION);
      }
      const updateOrder = await StoreService.updateStore(request, { _id: storeId });
      return res.status(200).send(ResponseService.success({ updateOrder }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  updateStoreProfile: async(req, res) => {
    try{
      const request = { ...req.body };
      const storeId = req._userInfo._user_id;
     
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
      const store = await StoreService.getStoreProfile(storeId);
      if (!store) {
        throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID)
      }
      if (store.storeApproval === 'Approved') {
        throw new apiError.ValidationError('storeApproval', messages.STORE_PROFILE_NOT_UPDATE);
      }
      let foundStore = await StoreService.getStore({ 'owner.email': request.owner.email });
      if (foundStore) {
        throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);
      }

      foundStore = await StoreService.getStore({ 'owner.contact_number': request.owner.contact_number });
      if (store) {
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
      const data = await StoreService.updateStore(request, { _id: storeId });
      if (!data.success) throw new apiError.InternalServerError();
      return res.status(200).send(ResponseService.success({ store: data.store }));
    }
    
    catch(error) {
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }
  }
};

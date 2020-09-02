/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const sh = require('shorthash');
const jwt = require('jsonwebtoken');
const StoreService = require('../../services/store');
const SlotService = require('../../services/slot');
const OrderService = require('../../services/order');
const AreaService = require('../../services/area');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');
const HelperService = require('../../common/helper');

module.exports = {
  async addStore(req, res) {
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

      // const storeCategoryId = request.storeCategory;
      // if (!storeCategoryId || !HelperService.isValidMongoId(storeCategoryId)) throw new apiError.ValidationError('storeCategoryId', messages.ID_INVALID);

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

      if (!hash) throw apiError.InternalServerError();

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
      // request.delivery_charges = JSON.parse(request.delivery_charges);
      const data = await StoreService.createStore(request);
      if (!data.success) throw new apiError.InternalServerError();
      return res.status(200).send(ResponseService.success({ store: data.store }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async updateStore(req, res) {
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
      if (request.storeApproval === 'Pending' && request.status === '1') {
        throw new apiError.ValidationError('storeApproval', messages.STORE_PERMISSION)
      }

      request.owner = JSON.parse(request.owner);
      request.address = JSON.parse(request.address);
      request.timings = JSON.parse(request.timings);
      request.categories = JSON.parse(request.categories);
      if (!(request.categories && request.categories.length > 0)) {
        throw new apiError.ValidationError('category', messages.CATEGORY_ID_REQUIRED);
      }
      request.categories.forEach((element) => {
        if (!element || !HelperService.isValidMongoId(element)) {
          throw new apiError.ValidationError('categoryId', messages.ID_INVALID);
        }
      });

      if (request.address.length === 0) {
        throw new apiError.ValidationError('address', messages.ADDRESS_REQUIRED);
      }
      if (request.drivers && request.drivers.length > 0) {
        request.drivers = JSON.parse(request.drivers);
      }

      if (req.files.length > 0) {
        const storePicture = req.files.filter((ele) => ele.fieldname === 'store_picture');
        request.picture = storePicture[0].filename;
      }
      const { id } = req.params;
      if (!HelperService.isValidMongoId(id)) {
        throw new apiError.ValidationError('store_id', messages.ID_INVALID);
      }

      const store = await StoreService.getStore({ _id: id });
      if (!store) {
        throw new apiError.ValidationError('store_id', messages.ID_INVALID);
      }

      delete request._id;
      delete request.password;
      // request.delivery_charges = JSON.parse(request.delivery_charges);

      for (let i = 0; i < request.address.length; i++) {
        const element = request.address[i];
        const city = await AreaService.getCity({ _id: element.city_id });
        const area = await AreaService.getArea({ _id: element.area_id });
        element.unique_link = sh.unique(request.name + city.name + area.name);
      }
      const updatedStore = await StoreService.updateStore(request, { _id: id });
      return res.send(ResponseService.success({ store: updatedStore }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getStores(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const search = req.query.search || '';
      const sort = { [req.query.name]: Number(req.query.sortType) };
      const stores = await StoreService.getStoresWithPagination({}, pageNo, perPage, search, sort);
      const paginationVariables = {
        pageNo,
        perPage
      };
      paginationVariables.totalItems = await StoreService.getTotalStoreCount({}, search);
      return res.status(200).send(ResponseService.success({ stores, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getActiveStoreDrivers(req, res) {
    try {
      const storeId = req.params.id;
      if (!storeId) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      }

      let store = await StoreService.getStore({ _id: storeId });
      if (!store) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);
      }
      store = await StoreService.getStoreDriverDetails({ _id: storeId });
      return res.status(200).send(ResponseService.success({ drivers: store.drivers }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getStoresForCategoryManagement(req, res) {
    try {
      const stores = await StoreService.getStoresList({});

      return res.status(200).send(ResponseService.success({ stores }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getDaySlot(req, res) {
    try {
      const storeId = req.params.id;
      let { date } = req.query;

      if (!date) {
        date = moment();
      } else {
        date = moment(date);
      }

      if (!HelperService.isValidMongoId(storeId)) {
        throw new apiError.ValidationError('id', messages.ID_INVALID);
      }

      const store = await StoreService.getStore({ _id: storeId });
      if (!store) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);
      }
      const slots = await SlotService.getDateSlots(storeId, date);
      return res.status(200).send(ResponseService.success({ slots, store }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async deleteStore(req, res) {
    try {
      const storeId = req.params.id;

      if (!HelperService.isValidMongoId(storeId)) {
        throw new apiError.ValidationError('id', messages.ID_INVALID);
      }

      const store = await StoreService.getStore({ _id: storeId });
      if (!store) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);
      }

      const order = await OrderService.getOrder({ store_id: storeId });
      if (order) {
        throw new apiError.ValidationError('store_id', messages.STORE_ORDER_EXISTS_CANNOT_BE_DELETED);
      }

      const deletedStore = await StoreService.deleteStore(storeId);
      if (!deletedStore) {
        throw new apiError.InternalServerError();
      }
      return res.status(200).send(ResponseService.success({ store: deletedStore }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  async changeStorePassword(req, res) {
    try {
      const request = { ...req.body };
      const { id } = req.params;

      if (!request.password) {
        throw new apiError.ValidationError('password', messages.PASSWORD_REQUIRED);
      }

      const store = await StoreService.getStore({ _id: id });
      if (!store) {
        throw new apiError.ValidationError('id', messages.ID_INVALID);
      }
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(request.password, salt);
      if (!hash) {
        throw apiError.InternalServerError();
      }

      const updatedStore = await StoreService.updateStore({ 'owner.password': hash }, { _id: id });
      if (!updatedStore) {
        throw apiError.InternalServerError();
      }
      return res.send(ResponseService.success({ store: updatedStore }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async generateAllStoreLink(req, res) {
    // try {
    const stores = await StoreService.getStoresList({});

    for (let i = 0; i < stores.length; i++) {
      const store = stores[i];

      for (let j = 0; j < store.address.length; j++) {
        const address = store.address[j];

        if (address.unique_link) continue;

        const city = await AreaService.getCity({ _id: address.city_id });
        const area = await AreaService.getArea({ _id: address.area_id });

        if (!city || !area) continue;

        address.unique_link = sh.unique(store.name + city.name + area.name);
      }

      await StoreService.updateStore(store, { _id: store._id });
    }

    res.send(ResponseService.success({ message: 'All Links have been generated Successfully.' }));
  }
};

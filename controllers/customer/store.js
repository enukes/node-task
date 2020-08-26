const mongoose = require('mongoose');
const StoreService = require('../../services/store');
const SlotService = require('../../services/slot');
const AreaService = require('../../services/area');
const ProductService = require('../../services/product');
const CategoryService = require('../../services/category');
const ConfigService = require('../../services/config');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');

class StoreController {
  async getStoreBasedOnArea(req, res) {
    try {
      // await SlotService.cancelScheduler();

      const request = { ...req.query };

      if (!request.area_id) throw new apiError.ValidationError('area_id', messages.AREA_ID_REQUIRED);
      if (!HelperService.isValidMongoId(request.area_id)) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const categories = await StoreService.getStoresGroupedByCategories({ 'address.area_id': mongoose.Types.ObjectId(request.area_id), status: 1, storeCategory: { $ne: null } });
      // await StoreService.getStoresList({ 'address.area_id': mongoose.Types.ObjectId(request.area_id), status: 1});
      const area = await AreaService.getArea({ _id: request.area_id });
      const city = await AreaService.getCity({ areas: request.area_id });

      return res.status(200).send(ResponseService.success({ categories, area, city }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async storeHomePage(req, res) {
    try {
      const store_id = req.params.id;

      // await SlotService.slotScheduler();

      if (!HelperService.isValidMongoId(store_id)) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const store = await StoreService.getStore({ _id: store_id });
      if (!store) throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);

      if (store.status != 1) throw new apiError.UnauthorizedError(messages.STORE_INACTIVE);

      const featured_products_data = await ProductService.getStoreFeaturedProducts(store_id);
      const featured_products = featured_products_data.length > 0 ? featured_products_data[0].products : [];

      const best_selling_products_data = await ProductService.getBestSellingProducts(store_id);
      const best_selling_products = best_selling_products_data.length > 0 ? best_selling_products_data[0].products : [];

      const categories = await CategoryService.getCategories(store_id);

      const adminConfig = await ConfigService.getConfig();

      const { taxes } = adminConfig;

      const { delivery_charges } = store;

      return res.status(200).send(ResponseService.success({
        featured_products,
        best_selling_products,
        categories,
        store,
        taxes,
        delivery_charges
      }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async getStoreTimingSlots(req, res) {
    console.log('store timings');

    // let store_id = req.params.id;

    // if (!HelperService.isValidMongoId(store_id)) throw new apiError.ValidationError('id', messages.ID_INVALID)

    // let store = await StoreService.getStore({ _id: store_id });
    // if(!store) throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID)

    // let startTime = store.timings.open_time;
    // let endTime = store.timings.close_time;

    // let interval = config.slots.eachSlotTime;

    // let days = config.slots.days;

    // let currentTime = new Date().getHours()

    try {
      const store_id = req.params.id;

      if (!HelperService.isValidMongoId(store_id)) throw new apiError.ValidationError('id', messages.ID_INVALID);

      const store = await StoreService.getStore({ _id: store_id });
      if (!store) throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);

      const slots = await SlotService.getSlots(store_id);

      return res.status(200).send(ResponseService.success({ slots, store }));
    } catch (e) {
      console.log(e);
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }

  async getStoreDetailsFromLink(req, res) {
    try {
      const { addressLink } = req.query;

      const store = await StoreService.getStore({ 'address.unique_link': addressLink });
      if (!store) throw new apiError.ValidationError('id', messages.LINK_INVALID);

      let selectedAddress;
      for (let i = 0; i < store.address.length; i++) {
        const element = store.address[i];
        if (element.unique_link == addressLink) {
          selectedAddress = element;
          break;
        }
      }

      const { area_id } = selectedAddress;
      res.send(ResponseService.success({ store, area_id }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }

  async getStoreFromArea(req, res) {
    try {
      const { lat, long, storeId } = req.query;
      const filters = { limit: 10 };
      let store = null;
      if (storeId) {
        store = await StoreService.getStore({
          _id: mongoose.Types.ObjectId(storeId)
        });
      } else if (lat && long) {
        store = await StoreService.getStoreByArea({ lat: parseInt(lat), long: parseInt(long) });
      } else {
        store = await StoreService.getStore({
          _id: mongoose.Types.ObjectId('5e2eca2ad21fe166d8c93159')
        });
      }
      if (!store) {
        throw new apiError.ValidationError('store', 'Store not found');
      }
      return res.status(200).send(ResponseService.success({
        store
      }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }

  async aStoreHomePage(req, res) {
    try {
      const storeId = req.params.id;
      if (!HelperService.isValidMongoId(storeId)) {
        throw new apiError.ValidationError('id', messages.ID_INVALID);
      }
      const store = await StoreService.getStore({ _id: storeId });
      if (!store) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);
      }
      if (store.status != 1) {
        throw new apiError.UnauthorizedError(messages.STORE_INACTIVE);
      }
      const featuredProductsData = await ProductService.getStoreFeaturedProducts(storeId);
      const featuredProducts = featuredProductsData.length > 0 ? featuredProductsData[0].products : [];
      const bestSellingProductsData = await ProductService.getBestSellingProducts(storeId);
      const bestSellingProducts = bestSellingProductsData.length > 0 ? bestSellingProductsData[0].products : [];
      const categories = await CategoryService.getCategories(storeId);
      const adminConfig = await ConfigService.getConfig();
      const { taxes } = adminConfig;
      const { delivery_charges } = store;

      return res.status(200).send(ResponseService.success({
        featuredProducts,
        bestSellingProducts,
        categories,
        store,
        taxes,
        delivery_charges
      }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new StoreController();

const mongoose = require('mongoose');
const ResponseService = require('../../common/response');
const ProductService = require('../../services/product');
const OfferService = require('../../services/offer');
const StoreService = require('../../services/store');
const ConfigService = require('../../services/config');
const HomeConfigService = require('../../services/home_config');
const CategoryService = require('../../services/category');
const apiError = require('../../common/api-errors');
const Constants = require('../../config/constants');


module.exports = {
  homeContent: async (req, res) => {
    try {
      const { lat, long, storeId } = req.query;
      const filters = { limit: 10 };

      let store = null;
      if (storeId) {
        store = await StoreService.getStore({
          _id: mongoose.Types.ObjectId(storeId)
        });
      } else if (lat && long) {
        store = await StoreService.getStore({
          'address.geoPoint': {
            $near: {
              $geometry: { type: 'Point', coordinates: [lat, long] },
              $maxDistance: 5000
            }
          }
        });
      } else {
        // TODO: Remove it when implemented on frontend
        store = await StoreService.getStore({
          _id: mongoose.Types.ObjectId('5e2eca2ad21fe166d8c93159')
        });
      }

      if (!store) {
        throw new apiError.ValidationError('store', 'Store not found');
      }

      const homeConfigs = await HomeConfigService.getHomeConfig({
        storeId: mongoose.Types.ObjectId(store._id)
      });

      const sections = await Promise.all(
        homeConfigs.map((homeConfig) => {
          if (homeConfig.itemType === Constants.homeConfigWidgets.FEATURED_PRODUCTS) {
            return ProductService.getProducts({
              search: '',
              store_id: store._id,
              category_id: mongoose.Types.ObjectId(homeConfig.categoryId),
              perPage: filters.limit,
              pageNo: 1,
              getLatest: true
            }).then((products) => ({
              data: products,
              ...homeConfig.toObject()
            }));
          }
          if (homeConfig.itemType === Constants.homeConfigWidgets.OFFERS) {
            return OfferService.getOffers({
              storeId: store._id,
              type: 2
            }, filters.limit).then((offers) => ({
              data: offers,
              ...homeConfig.toObject()
            }));
          }
          if (homeConfig.itemType === Constants.homeConfigWidgets.BANNERS) {
            return OfferService.getOffers({
              storeId: store._id,
              type: 1
            }, filters.limit).then((offers) => ({
              data: offers,
              ...homeConfig.toObject()
            }));
          }
          if (homeConfig.itemType === Constants.homeConfigWidgets.CATEGORIES) {
            return CategoryService.getAllCategoriesWithSubCategories((store._id || '').toString()).then((categories) => ({
              data: categories.map((category) => {
                const innerCategory = category;
                return {
                  ...innerCategory,
                  maxOff: 20,
                  subcategories: innerCategory.subcategories.map((subCategory) => ({
                    ...subCategory,
                    maxOff: 10
                  }))
                };
              }),
              ...homeConfig.toObject()
            }));
          }
          if (homeConfig.itemType === Constants.homeConfigWidgets.FAVORITE_PRODUCTS) {
            return ProductService.getProducts({
              search: '',
              store_id: store._id,
              subcategory_id: mongoose.Types.ObjectId(homeConfig.categoryId),
              perPage: filters.limit,
              pageNo: 1,
              getLatest: true
            }).then((products) => ({
              data: products,
              ...homeConfig.toObject()
            }));
          }
          return Promise.resolve();
        })
      );

      const config = await ConfigService.getConfig();
      return res.status(200).send(ResponseService.success({
        store,
        config,
        sections,
        categoryId: homeConfigs[0].categoryId,
        subCategoryId: homeConfigs[0].subCategoryId
      }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  /**
   * Add new section in the home configuration
   */
  addHomeConfig: async (req, res) => {
    try {
      const reqBody = req.body;
      const homeConfigToBeCreated = {
        storeId: reqBody.storeId,
        itemType: reqBody.itemType,
        title: reqBody.title,
        description: reqBody.description,
        categoryId: reqBody.categoryId,
        subCategoryId: reqBody.subCategoryId
      };
      homeConfigToBeCreated.position = await HomeConfigService.countHomeConfig() + 1;
      const createdHomeConfig = await HomeConfigService.addHomeConfig(homeConfigToBeCreated);
      return res.status(200).send(ResponseService.success(createdHomeConfig));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  /**
   * Reorder homeConfig
   */
  reorderHomeConfig: async (req, res) => {
    try {
      const homeConfigToBeUpdated = req.body;
      if (!Array.isArray(homeConfigToBeUpdated)) {
        throw new apiError.ValidationError('homeConfig', 'Not the proper request');
      }
      const reorderHomeConfig = async (index) => {
        if (index < 0) { return; }
        await HomeConfigService.updateConfig(
          { _id: mongoose.Types.ObjectId(homeConfigToBeUpdated[index]._id) },
          { position: index + 1 }
        );
        await reorderHomeConfig(index - 1);
      };
      await reorderHomeConfig(homeConfigToBeUpdated.length - 1);
      return res.status(200).send(ResponseService.success());
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  /**
   * Update a section in the home configuration
   */
  updatedHomeConfig: async (req, res) => {
    try {
      const { id: sectionId } = req.params;
      const reqBody = req.body;
      const homeConfigToBeUpdated = {
        storeId: reqBody.storeId,
        itemType: reqBody.itemType,
        title: reqBody.title,
        description: reqBody.description,
        categoryId: reqBody.categoryId,
        subCategoryId: reqBody.subCategoryId
      };
      const updatedHomeConfigSection = await HomeConfigService.updateConfig(
        { _id: mongoose.Types.ObjectId(sectionId) },
        homeConfigToBeUpdated
      );

      return res.status(200).send(ResponseService.success(updatedHomeConfigSection));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  },

  /**
   * Delete a section from the home configuration
   */
  deleteHomeConfig: async (req, res) => {
    try {
      const { id: sectionId } = req.params;
      if (!sectionId) {
        throw new apiError.ValidationError('sectionId', 'Home config id is required');
      }
      const foundHomeConfig = await HomeConfigService.getHomeConfigById(sectionId);
      if (foundHomeConfig && foundHomeConfig.storeId) {
        if (
          foundHomeConfig.itemType === Constants.homeConfigWidgets.OFFERS
          || foundHomeConfig.itemType === Constants.homeConfigWidgets.BANNERS
        ) {
          const offers = await OfferService.getOffers({
            storeId: mongoose.Types.ObjectId(foundHomeConfig.storeId)
          });
          if (offers) {
            const removeOffer = async (length) => {
              if (length < 0) { return; }
              await OfferService.deleteOffer({
                _id: mongoose.Types.ObjectId(offers[length]._id),
                type: foundHomeConfig.itemType === Constants.homeConfigWidgets.OFFERS ? 2 : 1
              });
              removeOffer(length - 1);
            };
            await removeOffer(offers.length - 1);
          }
        }
        await HomeConfigService.deleteConfig({
          _id: mongoose.Types.ObjectId(sectionId)
        });
        return res.status(200).send(ResponseService.success());
      }
      throw new apiError.ValidationError('sectionId', 'Home config not found');
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
};

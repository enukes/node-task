const mongoose = require('mongoose');
const OfferService = require('../../services/offer');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

module.exports = {
  async addOffer(req, res) {
    try {
      const reqBody = req.body;
      const { _user_type: type } = req._userInfo;

      const offerToBeCreated = {
        categoryId: reqBody.categoryId,
        type: reqBody.type,
        ...(reqBody.subCategoryId && { subCategoryId: reqBody.subCategoryId }),
        ...((type !== 2) && { storeId: reqBody.storeId }),
        ...((type !== 2 && reqBody.status) && { status: reqBody.status })
      };

      if (!offerToBeCreated.storeId && `${type}` !== '2') {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      }
      if (type === 2) {
        offerToBeCreated.storeId = req._userInfo._user_id;
      }
      if (req.file && req.file.filename) {
        offerToBeCreated.image = req.file.filename;
      }

      const createdOffer = await OfferService.addOffer(offerToBeCreated);
      return res.status(200).send(ResponseService.success({ offer: createdOffer }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  /**
   * Updated offer by id
   */
  updatedOffer: async (req, res) => {
    try {
      const { id: offerId } = req.params;
      const reqBody = req.body;
      const { _user_type: type } = req._userInfo;

      const offerToBeUpdated = {
        categoryId: reqBody.categoryId,
        ...(reqBody.subCategoryId && { subCategoryId: reqBody.subCategoryId }),
        ...((type !== 2) && { storeId: reqBody.storeId }),
        ...((type !== 2 && reqBody.status) && { status: reqBody.status })
      };

      if (!offerToBeUpdated.storeId && `${type}` !== '2') {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      }
      if (type === 2) {
        offerToBeUpdated.storeId = req._userInfo._user_id;
      }
      if (req.file && req.file.filename) {
        offerToBeUpdated.image = req.file.filename;
      }

      const updatedOffer = await OfferService.updatedOffer(
        { _id: mongoose.Types.ObjectId(offerId) },
        offerToBeUpdated
      );
      return res.status(200).send(ResponseService.success({ offer: updatedOffer }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async deleteOffer(req, res) {
    try {
      const { id: offerId } = req.params;
      await OfferService.deleteOffer({ _id: mongoose.Types.ObjectId(offerId) });
      return res.status(200).send(ResponseService.success());
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
};

const ResponseService = require('../../common/response');
const CustomerService = require('../../services/customer');
const StoreService = require('../../services/store');
const messages = require('../../common/messages');
const ConfigService = require('../../services/config');
const HelperService = require('../../common/helper');
const apiError = require('../../common/api-errors');

module.exports = {
  calculateDeliveryCharges: async (req, res) => {
    try {
      const request = { ...req.body };
      const userId = req._userInfo._user_id;
      const orderToBePlaced = {};
      let deliveryCharges = null;

      if (!request.address_id) {
        throw new apiError.ValidationError('address_id', messages.ADDRESS_ID_REQUIRED);
      }
      if (!request.store_id) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_REQUIRED);
      }
      const customer = await CustomerService.getCustomer({ _id: userId });
      if (!customer) {
        throw new apiError.ValidationError('token', messages.AUTHENTICATION_TOKEN_INVALID);
      }
      const store = await StoreService.getStore({ _id: request.store_id });
      if (!store) {
        throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);
      }

      const address = customer.address.find((customerAddress) => (
        customerAddress._id.toString() === request.address_id
      )) || {};
      if (!Object.keys(address).length) {
        throw new apiError.ValidationError('address_id', messages.ADDRESS_ID_INVALID);
      }
      orderToBePlaced.address = {};
      orderToBePlaced.address.delivery = JSON.parse(JSON.stringify(address));

      const isStoreAddressValid = store.address.some((storeAddress) => {
        if (storeAddress._id.toString() === request.store_address_id) {
          orderToBePlaced.address.pickup = JSON.parse(JSON.stringify(storeAddress));
          return true;
        }
        return false;
      });
      if (!isStoreAddressValid) {
        throw new apiError.ValidationError('store_address_id', messages.STORE_ADDRESS_ID_INVALID);
      }
      const config = await ConfigService.getDeliveryCharges();

      const distanceObject = {
        pickupLat: orderToBePlaced.address.pickup.geoPoint.coordinates[0],
        pickupLong: orderToBePlaced.address.pickup.geoPoint.coordinates[1],
        dropOffLat: orderToBePlaced.address.delivery.coordinates.latitude,
        dropOffLong: orderToBePlaced.address.delivery.coordinates.longitude
      }
      const distance = HelperService.getDistanceInKM(distanceObject);
      if (distance <= config.minimumDistance) {
        deliveryCharges = config.basePrice
      } else {
        deliveryCharges = config.basePrice + (distance - config.minimumDistance) * config.perKmPrice
      }

      return res.status(200).send(ResponseService.success(deliveryCharges));
    }
    catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }
  },


}

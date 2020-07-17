const ConfigService = require('../../services/config');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

module.exports = {
  async addConfig(req, res) {
    try {
      const request = { ...req.body };

      const details = await ConfigService.addConfig(request);
      return res.status(200).send(ResponseService.success({ details }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getConfig(req, res) {
    try {
      const config = await ConfigService.getConfig();

      const { taxes } = config;
      const { delivery_charges: deliveryCharges } = config;

      return res.status(200).send(ResponseService.success({
        taxes,
        delivery_charges: deliveryCharges
      }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async updateConfig(req, res) {
    try {
      const request = { ...req.body };

      if (request.delivery_charges) {
        let charges = 0;

        request.delivery_charges.forEach((element) => {
          if (!element.order_amount) throw new apiError.ValidationError('order_amount', messages.DELIVERY_ORDER_AMOUNT_REQUIRED);
          if (!element.charges) throw new apiError.ValidationError('charges', messages.DELIVERY_CHARGES_REQUIRED);

          if (element.order_amount <= 0) throw new apiError.ValidationError('order_amount', messages.DELIVERY_ORDER_AMOUNT_GREATER_THAN_0);
          if (element.charges <= 0) throw new apiError.ValidationError('charges', messages.DELIVERY_CHARGES_GREATER_THAN_0);

          if (element.order_amount <= charges) throw new apiError.ValidationError('order_amount', messages.DELIVERY_ORDER_AMOUNT_ASCENDING_ORDER);
          charges = element.order_amount;
        });
      }

      if (request.per_slot_order_limit) {
        request.per_slot_order_limit = Number(request.per_slot_order_limit);

        if (Number.isNaN(request.per_slot_order_limit)) request.per_slot_order_limit = 50;
      }

      const config = await ConfigService.updateConfig(request);

      const { taxes } = config;
      const { delivery_charges: deliveryCharges } = config;

      return res.status(200).send(ResponseService.success({
        taxes,
        delivery_charges: deliveryCharges
      }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
};

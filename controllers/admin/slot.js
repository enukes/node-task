const moment = require('moment-timezone');
const SlotService = require('../../services/slot');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');

module.exports = {
  async addSlots(req, res) {
    try {
      // TODO: Check for the slots before id they are already created
      const request = [...req.body];
      await SlotService.deleteSlotsByDateAndTime(
        request.reduce((acc, val) => (
          moment(acc.start_time).isBefore(moment(val.start_time)) ? acc : val
        )).start_time,
        request.reduce((acc, val) => (
          moment(acc.end_time).isAfter(moment(val.end_time)) ? acc : val
        )).end_time,
        request[0].store_id
      );
      const slots = request.map((slot) => {
        if (!slot.store_id) throw new apiError.ValidationError('store_id', 'Store id is required');
        if (!slot.start_time) throw new apiError.ValidationError('start_time', 'Start time is required');
        if (!slot.end_time) throw new apiError.ValidationError('end_time', 'End time is required');
        return { ...slot, ordersCount: 0 };
      });
      const createdSlots = await SlotService.addSlots(slots);
      return res.send(ResponseService.success({ slots: createdSlots }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getSlots(req, res) {
    try {
      const { storeId } = req.query;
      if (!storeId) throw new apiError.ValidationError('store_id', 'Store id is required');

      const slots = await SlotService.getSlots(storeId, true, true);
      return res.send(ResponseService.success({ slots }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
};

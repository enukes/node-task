/* eslint-disable no-await-in-loop */
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const mongoose = require('mongoose');
const Slot = require('../models/slot');
const StoreService = require('./store');
const config = require('../config/constants');
const ConfigService = require('./config');

let j;

const slotService = {};

slotService.addSlot = (details) => new Slot(details).save();
slotService.addSlots = (slots) => Slot.insertMany(slots);

slotService.deleteSlotsByDateAndTime = (startTime, endTime, storeId) => Slot.deleteMany({
  ordersCount: 0,
  start_time: { $gte: moment(startTime).toDate() },
  end_time: {
    $lte: moment.utc(endTime).set({
      hours: 23,
      minutes: 59,
      seconds: 59
    }).toDate()
  },
  store_id: mongoose.Types.ObjectId(storeId)
});

slotService.slotScheduler = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 1;

  j = schedule.scheduleJob(rule, async () => {
    await slotService.checkAndAddSlots();
  });
};

slotService.cancelScheduler = () => {
  j.cancel();
};

slotService.getSlot = (request) => Slot.findOne(request);

slotService.getSlots = async (storeId, ignoreOrderCount = false, ignoreDays = false) => {
  const adminConfig = await ConfigService.getConfig();
  const slots = await Slot.find({
    store_id: storeId,
    start_time: { $gte: moment().toISOString(), ...(!ignoreDays && { $lt: moment().add(7, 'd').startOf('day').toISOString() }) },
    ...(!ignoreOrderCount && { ordersCount: { $lt: Number(adminConfig.per_slot_order_limit) } })
  });


  const slotsObject = {};

  for (let i = 0; i < slots.length; i++) {
    const day = moment(slots[i].start_time).format('YYYY-MM-DD');
    if (!slotsObject[day]) slotsObject[day] = [];
    slotsObject[day].push(slots[i]);
  }

  const slotsArray = Object.keys(slotsObject).map((key) => ({
    slots: slotsObject[key],
    date: key
  }));

  slotsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
  return slotsArray;
};

slotService.updateSlot = (criteria, details) => Slot.findOneAndUpdate(
  criteria, details,
  { new: true }
);

slotService.getDateSlots = async (storeId, date) => Slot.find({
  store_id: storeId,
  start_time: { $gte: moment(date).toISOString(), $lt: moment(date).add(1, 'd').startOf('day').toISOString() }
});

slotService.checkAndAddSlots = async () => {
  const stores = await StoreService.getStoresList();
  const { days } = config.slots;

  for (let i = 0; i < stores.length; i++) {
    const startTime = stores[i].timings.open_time;
    const endTime = stores[i].timings.close_time;

    const interval = config.slots.eachSlotTime;

    for (let k = 0; k <= days; k++) {
      const slot = await Slot.findOne({
        start_time: { $gte: moment().add(k, 'd').startOf('day').toISOString(), $lt: moment().add(k + 1, 'd').startOf('day').toISOString() },
        store_id: stores[i]._id
      });
      if (slot) {
        // eslint-disable-next-line no-continue
        continue;
      } else {
        const start = moment(`${moment().format('YYYY-MM-DD')} ${startTime}`, 'YYYY-MM-DD HH:mm').add(k, 'd');
        const end = moment(`${moment().format('YYYY-MM-DD')} ${endTime}`, 'YYYY-MM-DD HH:mm').add(k, 'd');
        while (start.isBefore(end) && end.isSameOrAfter(moment(start).add(interval, 'hours'))) {
          const slotStart = moment(start);
          const slotEnd = moment(slotStart).add(interval, 'hours');
          start.add(interval, 'hours');
          const slotObject = {
            start_time: slotStart.toISOString(),
            end_time: slotEnd.toISOString(),
            store_id: stores[i]._id
          };

          await new Slot(slotObject).save();
        }
      }
    }
  }
};

module.exports = slotService;

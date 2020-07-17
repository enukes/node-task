const mongoose = require('mongoose');
const City = require('../models/cities');
const AreaService = require('./area');

module.exports = {
  addCity(details) {
    return new City(details).save();
  },

  getCity(id) {
    return City.findById(id);
  },

  updateCity(criteria, details) {
    return City.findOneAndUpdate(criteria, details, { new: true });
  },

  async deleteCity(cityId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const opts = { session };

    try {
      const city = await City.findById(cityId);

      for (let i = 0; i < city.areas.length; i++) {
        const element = city.areas[i];
        // eslint-disable-next-line no-await-in-loop
        await AreaService.deleteArea(element, session);
      }

      const deletedCity = await City.deleteMany({ _id: cityId }, opts);

      await session.commitTransaction();
      session.endSession();

      return deletedCity;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return e;
    }
  }
};

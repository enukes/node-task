const mongoose = require('mongoose');
const Area = require('../models/area');
const City = require('../models/cities');
const Store = require('../models/store');
const apiError = require('../common/api-errors');

module.exports = {
  getOnlyCitiesWithPagination(search, pageNo, perPage) {
    return City.find({ name: new RegExp(search, 'i') }).select('-areas').skip((pageNo - 1) * perPage).limit(perPage);
  },

  getCityCount(request, search) {
    const condition = {
      $and:
        [
          {
            $or:
              [
                { name: new RegExp(search, 'i') }
              ]
          },
          request
        ]
    };
    return City.countDocuments(condition);
  },

  getOnlyActiveCities() {
    return City.find({ status: 1 }).select('-areas');
  },

  getAreasWithPagination(cityId, search, pageNo, perPage) {
    return City.findById(cityId).populate({
      path: 'areas',
      match: { name: new RegExp(search, 'i') },
      options: {
        sort: {},
        skip: (pageNo - 1) * perPage,
        limit: perPage
      }
    });
  },

  async getAreaCount(cityId, search) {
    const city = await City.findById(cityId).populate({
      path: 'areas',
      match: { name: new RegExp(search, 'i') }
    });

    return city.areas.length;
  },

  getActiveCityAreas(cityId) {
    return City.findById(cityId).populate({
      path: 'areas',
      match: { status: 1 }
    });
  },

  getCity(request) {
    return City.findOne(request);
  },

  getArea(request) {
    return Area.findOne(request);
  },

  async addArea(details) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const opts = { session };

    try {
      const { city_id: cityId } = details;
      const cityOne = await City.findById(cityId);
      // eslint-disable-next-line no-param-reassign
      delete details.city_id;

      if (!cityOne) throw new apiError.InternalServerError();

      const area = await new Area(details).save(opts);
      if (!area) throw new apiError.InternalServerError();

      const city = await City.findOneAndUpdate(
        { _id: cityId },
        { $push: { areas: area._id } },
        opts
      );
      if (!city) throw new apiError.InternalServerError();

      await session.commitTransaction();
      session.endSession();

      return city;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return e;
    }
  },

  updateArea(criteria, details) {
    return Area.findOneAndUpdate(criteria, details, { new: true });
  },

  async deleteArea(areaId, parentSession = null) {
    let session;

    if (parentSession) {
      session = parentSession;
    } else {
      session = await mongoose.startSession();
      session.startTransaction();
    }
    const opts = { session };

    try {
      await Store.update(
        { 'address.area_id': mongoose.Types.ObjectId(areaId) },
        { $pull: { address: { area_id: mongoose.Types.ObjectId(areaId) } } },
        opts
      );
      const deletedArea = await Area.deleteMany({ _id: areaId }, opts);
      await City.update(
        { areas: mongoose.Types.ObjectId(areaId) },
        { $pullAll: { areas: [mongoose.Types.ObjectId(areaId)] } },
        opts
      );

      if (!parentSession) {
        await session.commitTransaction();
        session.endSession();
      }

      return deletedArea;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return e;
    }
  }
};

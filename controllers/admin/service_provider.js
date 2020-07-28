const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const HelperService = require('../../common/helper');
const ServiceProviderService = require('../../services/service_provider');
const bcrypt = require('bcrypt');
const sh = require('shorthash');
const AreaService = require('../../services/area');


module.exports = {
  addAServiceProvider: async (req, res) => {
    try {
      const request = { ...req.body };
      if (!request.owner) {
        throw new apiError.ValidationError('owner_details', messages.OWNER_DETAILS_REQUIRED);
      }
      if (!request.address) {
        throw new apiError.ValidationError('owner_details', messages.ADDRESS_REQUIRED)
      }
      if (!request.timings) {
        throw new apiError.ValidationError('owner_details', messages.TIMINGS_REQUIRED)
      }

      const serviceProviderCategoryId = request.serviceCategory;
      if (!serviceProviderCategoryId || !HelperService.isValidMongoId(serviceProviderCategoryId)) {
        throw new apiError.ValidationError('serviceProviderCategoryId', messages.ID_INVALID);
      }

      request.owner = JSON.parse(request.owner);
      request.address = JSON.parse(request.address);
      request.timings = JSON.parse(request.timings);

      if (request.address.length === 0) {
        throw new apiError.ValidationError('address', messages.ADDRESS_REQUIRED);
      }
      if (!request.owner.email) {
        throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);
      }
      if (!request.owner.contact_number) {
        throw new apiError.ValidationError('email', messages.CONTACT_REQUIRED);
      }

      let service_provider = await ServiceProviderService.getServiceProvider({ 'owner.email': request.owner.email });
      if (service_provider) {
        throw new apiError.ValidationError('email', messages.EMAIL_ALREADY_EXIST);
      }

      service_provider = await ServiceProviderService.getServiceProvider({ 'owner.contact_number': request.owner.contact_number });
      if (service_provider) {
        throw new apiError.ValidationError('contact_number', messages.CONTACT_ALREADY_EXIST);
      }

      if (!request.owner && !request.owner.password){
        throw new apiError.ValidationError('owner_password', messages.PASSWORD_REQUIRED);
      }
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(request.owner.password, salt);

      if (!hash){
        throw apiError.InternalServerError();
      }

      request.owner.password = hash;
      if (req.files.length === 0) {
        throw new apiError.ValidationError('picture', messages.STORE_PICTURE_REQUIRED);
      }

      const serviceProviderPicture = req.files.filter((ele) => ele.fieldname === 'service_provider_picture');
      request.picture = serviceProviderPicture[0].filename;

      for (let i = 0; i < request.address.length; i++) {
        const element = request.address[i];
        if (element.unique_link) continue;
        const city = await AreaService.getCity({ _id: element.city_id });
        const area = await AreaService.getArea({ _id: element.area_id });
        element.unique_link = sh.unique(request.name + city.name + area.name);
      }
   
      const data = await ServiceProviderService.createServiceProvider(request);
      if (!data.success) throw new apiError.InternalServerError();
      return res.status(200).send(ResponseService.success({ service_provider: data.service_provider }));
    } catch (error) {
      return res.status(error.code || 500).send(ResponseService.failure(error))
    }

  }
}

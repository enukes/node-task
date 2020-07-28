const ServiceProviderCategory = require('../models/service_provider_category');

module.exports = {
  /**
   * Add a Service Provider Category
   */
  addServiceProviderCategory(serviceProviderCategoryDetails) {
    return new ServiceProviderCategory(serviceProviderCategoryDetails).save();
  },

  /**
   * Get all Service Provider Category
   */

   getAllServiceProviderCategories(search, pageNo, perPage, status) {
     return ServiceProviderCategory.find({
       name: new RegExp(search, 'i'),
       ...(!!status && {status}) 
     }).skip((pageNo - 1) * perPage).limit(perPage);
   },

   /**
    * Count the Service Provider Categories
    */
   getServiceProviderCategoryCount (request, search) {
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
     return ServiceProviderCategory.countDocuments(condition);
   },

   /**
    * Get Service Provider Category by Id
    */
   getServiceProviderCategoryById(id) {
     return ServiceProviderCategory.findById(id);
   },

   /**
    * Update Service Provider Category
    */

    updateServiceProviderCategory(criteria, serviceProviderCategoryDetails) {
      return ServiceProviderCategory.findOneAndUpdate(criteria, serviceProviderCategoryDetails, {new: true} );
    },

    /**
     * Delete Service Provider Category
     */

     deleteServiceProviderCategory(serviceProviderCategoryId) {
       return ServiceProviderCategory.deleteMany({ _id: serviceProviderCategoryId });
     }
}

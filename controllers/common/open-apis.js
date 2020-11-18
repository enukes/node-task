const bcrypt = require('bcrypt');
const sh = require('shorthash');
const messages = require('../../common/messages');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const ViewsService = require('../../services/views');


module.exports = {

  /**
   * Add views
   */
  async addViews(req, res) {
    try {
      const request = { ...req.body };
      request.userId = parseInt(req.query.user);
      request.productId = parseInt(req.query.product);
      let driver = await ViewsService.addViews(request);

      return res.status(200).send(ResponseService.success({ driver }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  /**
  * Get All views
  */
  getViews: async (req, res) => {
    try {

      const criteria = {
        product: req.query.product,
        fromDate: req.query.fromDate + 'T00:00:00.000Z',
        toDate: req.query.toDate + 'T23:59:59.000Z',
        type: req.query.type
      };
      
      if (criteria.type == "monthly") {
        let date=new Date();
        criteria.fromDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
        criteria.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
      }
      if (criteria.type == "weekly") {
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        criteria.fromDate = new Date(curr.setDate(first)).toISOString();
        criteria.toDate = new Date(curr.setDate(last)).toISOString();
      }
      if (criteria.type == "daily") {
        criteria.fromDate = new Date().toISOString().slice(0, 10)+ 'T00:00:00.000Z';
        criteria.toDate = new Date().toISOString().slice(0, 10)+ 'T23:59:59.000Z';
      }

      let result = await ViewsService.getViews(criteria);

      let totalCount = await ViewsService.getCount(criteria);

      return res.status(200).send(ResponseService.success({ unique_users: result, unique_user_length: result.length, all_users: totalCount, all_users_count: totalCount.length }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }

  }

}

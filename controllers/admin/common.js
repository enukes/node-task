const fs = require('fs');
const path = require('path');
const OrderService = require('../../services/order');
const ServiceOrderService = require('../../services/service_order');
const CustomerService = require('../../services/customer');
const StoreService = require('../../services/store');
const ServiceProviderService = require('../../services/service_provider');
const SlotService = require('../../services/slot');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');

module.exports = {
  async dashboard(req, res) {
    try {
      const request = { ...req.body };
      const type = req._userInfo._user_type;

      if (!request.from_date) throw new apiError.ValidationError('from_date', messages.FROM_DATE_REQUIRED);
      if (!request.to_date) throw new apiError.ValidationError('from_date', messages.TO_DATE_REQUIRED);

      if (type === 2) {
        const storeId = req._userInfo._user_id;
        const store = await StoreService.getStore({ _id: storeId });
        if (!(store.storeApproval === 'Approved')) {
          throw new apiError.ValidationError('storeApproval', messages.STORE_PERMISSION);
        }

        const totalOrders = await OrderService.getTotalOrdersCount({ store_id: storeId });
        const data = await OrderService.getStoreTotalSale(req._userInfo._user_id);
        let deliveredOrders = {};
        let unDeliveredOrders = {};
        deliveredOrders = await OrderService.getTotalDeliveredOrder({ store_id: storeId, status: 3 });
        unDeliveredOrders = await OrderService.getTotalDeliveredOrder({ store_id: storeId, status: 4 })
        const totalSale = data.length > 0 ? data[0].amount : 0;
        const graphOrderDate = await OrderService.getGraphOrderDate(
          request.from_date,
          request.to_date,
          storeId
        );
        const graphSaleData = await OrderService.getGraphSaleData(
          request.from_date,
          request.to_date,
          storeId
        );

        return res.status(200).send(ResponseService.success({
          total_orders: totalOrders,
          total_sale: totalSale,
          deliveredOrders,
          unDeliveredOrders,
          graph_sale_data: graphSaleData,
          graph_order_date: graphOrderDate
        }));
      }

      const totalOrders = await OrderService.getTotalOrdersCount({});
      const totalCustomers = await CustomerService.getTotalCustomerCount({}, '');
      const totalStores = await StoreService.getTotalStoreCount({});
      const serviceProviders = await ServiceProviderService.getTotalServiceProviderCount({});
      const data = await OrderService.getTotalSale();
      const totalSale = data[0].amount;
      const graphOrderDate = await OrderService.getGraphOrderDate(
        request.from_date,
        request.to_date
      );
      const graphServiceOrderDate = await ServiceOrderService.getGraphOrderDate(
        request.from_date,
        request.to_date
      );
      const graphSaleData = await OrderService.getGraphSaleData(
        request.from_date,
        request.to_date
      );
      const graphSaleDataServiceOrder = await ServiceOrderService.getGraphSaleData(
        request.from_date,
        request.to_date,
      );

      return res.status(200).send(ResponseService.success({
        total_orders: totalOrders,
        total_customers: totalCustomers,
        total_stores: totalStores,
        serviceProviders,
        total_sale: totalSale,
        graph_sale_data: graphSaleData,
        graph_order_date: graphOrderDate,
        graphSaleDataServiceOrder,
        graphServiceOrderDate
      }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async runScheduler(req, res) {
    await SlotService.slotScheduler();
    return res.send(ResponseService.success({ message: 'Scheduler Run' }));
  },

  async manualSlotCreation(req, res) {
    await SlotService.checkAndAddSlots();
    return res.send(ResponseService.success({ message: 'Slot updated Successfully.' }));
  },

  async checkIfFileAlreadyExists(req, res) {
    try {
      const { name } = req.query;
      if (!name) throw new apiError.ValidationError('name', messages.NAME_REQUIRED);

      const filePath = path.resolve(`static/uploads/${name}`);

      if (fs.existsSync(filePath)) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    } catch (e) {
      res.send({ success: false });
    }
  },

  async updateStoreInfo(req, res) {
    try {
      const { _userInfo: { _user_id: userId } } = req;
      const criteria = { _id: userId };
      const { storeInfo } = req.body;
      const updatedStore = await StoreService.updateStore({ storeInfo }, criteria);
      return res.send(ResponseService.success({ updatedStore, message: 'Store info has been updated successfully' }));
    } catch (e) {
      return res.send({ success: false });
    }
  }
};

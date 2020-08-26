const mongoose = require('mongoose');
const moment = require('moment-timezone');
const ReportService = require('../../services/report');
const StoreService = require('../../services/store');
const CustomerService = require('../../services/customer');
const OrderService = require('../../services/order');
const ResponseService = require('../../common/response');
const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const config = require('../../config/constants');
const exportToExcel = require('../../common/export-to-excel');

module.exports = {
  async getCustomersForReport(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const search = req.query.search || '';

      const paginationVariables = { pageNo, perPage };

      const customerCount = await CustomerService.getTotalCustomerCount({}, search);
      const customers = await ReportService.getCustomersReportWithPagination(
        search, pageNo, perPage
      );

      paginationVariables.totalItems = customerCount;
      return res.status(200).send(ResponseService.success({ customers, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getStorePaymentReport(req, res) {
    try {
      const criteria = {};
      const { _user_type: type } = req._userInfo;

      if (`${type}` === '2') {
        criteria._id = mongoose.Types.ObjectId(req._userInfo._user_id);
      }

      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;
      const { search = '' } = req.query;

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }
      if (search) {
        criteria.name = { $regex: search, $options: 'i' };
      }

      const paginationVariables = { pageNo, perPage };
      const payments = await ReportService.getStorePaymentReportWithPagination({
        pageNo, perPage, fromDate, toDate, criteria
      });

      if (`${type}` === '1') {
        const storeCount = await StoreService.getTotalStoreCount({}, '');
        paginationVariables.totalItems = storeCount;
        return res.status(200).send(ResponseService.success({ payments, paginationVariables }));
      }
      return res.status(200).send(ResponseService.success({ payments, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async exportStorePaymentReport(req, res) {
    try {
      const criteria = {};
      const type = req._userInfo._user_type;

      if (`${type}` === '2') criteria._id = mongoose.Types.ObjectId(req._userInfo._user_id);

      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      const payments = await ReportService.getStorePaymentReportWithPagination({
        fromDate, toDate, criteria
      });

      return exportToExcel.getExcelFile({
        expressRes: res,
        data: payments,
        sheetName: 'Payments',
        columns: [
          { name: 'name', label: 'Shop' },
          { name: 'totalOrders', label: 'No of Orders' },
          { name: 'totalAmount', label: 'Order Net Amount (INR)' },
          { name: 'taxAmount', label: 'Tax amount (INR)' },
          { name: 'deliveryCharges', label: 'Delivery Charges (INR)' },
          { name: 'totalCommission', label: 'Admin Commission (INR)' }
        ],
        fileName: `Sales_reports${fromDate ? `_from_${moment(fromDate).format('Do_MMM_YYYY')}` : ''}${toDate ? `_to_${moment(toDate).format('Do_MMM_YYYY')}` : ''}`
      });
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async markStorePaid(req, res) {
    try {
      const storeId = req.params.id;
      const request = { ...req.body };

      const store = await StoreService.getStore({ _id: storeId });
      if (!store) throw new apiError.ValidationError('store_id', messages.STORE_ID_INVALID);

      if (!request.from_date) throw new apiError.ValidationError('from_date', messages.FROM_DATE_REQUIRED);
      if (!request.to_date) throw new apiError.ValidationError('to_date', messages.TO_DATE_REQUIRED);
      if (!request.total_amount) throw new apiError.ValidationError('total_amount', messages.TOTAL_AMOUNT_REQUIRED);

      const orders = await OrderService.getOrders({
        store_id: mongoose.Types.ObjectId(storeId),
        status: 3,
        store_paid: false,
        deliver_start_time: {
          $gte: moment(request.from_date).toDate(),
          $lt: moment(request.to_date).toDate()
        }
      });

      const data = await OrderService.markOrdersAsPaid(orders, request.total_amount);
      if (!data.success) throw new Error(data.error);

      return res.status(200).send(ResponseService.success({ message: 'Store has been marked as paid.' }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getStoreSalesReport(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const fromDate = req.query.from_date;
      let toDate = req.query.to_date;
      const search = req.query.search || '';

      const paginationVariables = {
        pageNo,
        perPage
      };

      if (!fromDate) throw new apiError.ValidationError('from_date', messages.FROM_DATE_REQUIRED);
      if (!toDate) throw new apiError.ValidationError('to_date', messages.TO_DATE_REQUIRED);

      toDate = moment(toDate).add(1, 'month').toISOString();

      const storeCount = await StoreService.getTotalStoreCount({}, search);
      const stores = await ReportService.getStoreSalesReportWithPagination(
        pageNo, perPage, fromDate, toDate, search
      );

      paginationVariables.totalItems = storeCount;
      return res.status(200).send(ResponseService.success({ stores, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getStoreReport(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;
      const { search = '' } = req.query;

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }

      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      const { _user_type: type } = req._userInfo;
      const storeId = `${type}` === '2' ? req._userInfo._user_id : req.query.store_id;

      const paginationVariables = { pageNo, perPage };

      const stores = await ReportService.getStoreReportWithPagination({
        storeId, fromDate, toDate, search, pageNo, perPage
      });

      return res.status(200).send(ResponseService.success({ stores, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async exportShopReport(req, res) {
    try {
      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;

      const type = req._userInfo._user_type;
      const storeId = `${type}` === '2' ? req._userInfo._user_id : req.query.store_id;

      const stores = await ReportService.getStoreReportWithPagination({
        storeId, fromDate, toDate
      });

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      return exportToExcel.getExcelFile({
        expressRes: res,
        data: stores,
        sheetName: 'Shops',
        columns: [
          { name: 'name', label: 'Name' },
          { name: 'ownerName', label: 'Owner' },
          { name: 'items', label: 'Items' },
          { name: 'soldQty', label: 'No of orders' },
          { name: 'sales', label: 'Sales (INR)' },
          { name: 'totalCommission', label: 'Commission (INR)' }
        ],
        fileName: `Shops_reports${fromDate ? `_from_${moment(fromDate).format('Do_MMM_YYYY')}` : ''}${toDate ? `_to_${moment(toDate).format('Do_MMM_YYYY')}` : ''}`
      });
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getCommissionPerStoreReport(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;
      const { search = '' } = req.query;

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      const type = req._userInfo._user_type;
      const storeId = `${type}` === '2' ? req._userInfo._user_id : req.query.store_id;

      const paginationVariables = { pageNo, perPage };

      const stores = await ReportService.getCommissionPerStoreReportWithPagination({
        storeId, fromDate, toDate, search, pageNo, perPage
      });

      return res.status(200).send(ResponseService.success({ stores, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async exportCommissionReport(req, res) {
    try {
      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;

      const type = req._userInfo._user_type;
      const storeId = `${type}` === '2' ? req._userInfo._user_id : req.query.store_id;
      const stores = await ReportService.getCommissionPerStoreReportWithPagination({
        storeId, fromDate, toDate
      });

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      return exportToExcel.getExcelFile({
        expressRes: res,
        data: stores,
        sheetName: 'Commissions',
        columns: [
          { name: 'name', label: 'Shop Name' },
          { name: 'ownerName', label: 'Owner Name' },
          { name: 'sales', label: 'Sales (INR)' },
          { name: 'totalCommission', label: 'Commission (INR)' }
        ],
        fileName: `Commission_reports${fromDate ? `_from_${moment(fromDate).format('Do_MMM_YYYY')}` : ''}${toDate ? `_to_${moment(toDate).format('Do_MMM_YYYY')}` : ''}`
      });
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getCouponsReport(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      const type = req._userInfo._user_type;
      const storeId = `${type}` === '2' ? req._userInfo._user_id : (req.query.store_id || null);

      const paginationVariables = { pageNo, perPage };

      const coupons = await ReportService.getCouponsReportWithPagination({
        pageNo, perPage, fromDate, toDate, storeId
      });

      return res.status(200).send(ResponseService.success({ coupons, paginationVariables }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async exportCouponReport(req, res) {
    try {
      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;
      const type = req._userInfo._user_type;
      const storeId = `${type}` === '2' ? req._userInfo._user_id : (req.query.store_id || null);

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      const stores = await ReportService.getCouponsReportWithPagination({
        storeId, fromDate, toDate
      });

      return exportToExcel.getExcelFile({
        expressRes: res,
        data: stores,
        sheetName: 'Coupons',
        columns: [
          { name: 'couponCode', label: 'Coupon Code' },
          { name: 'orderId', label: 'Order Id' },
          { name: 'customer', label: 'Customer' },
          { name: 'couponAmount', label: 'Commission (INR)' },
          { name: 'usedDate', label: 'Date' }
        ],
        fileName: `Coupons_reports${fromDate ? `_from_${moment(fromDate).format('Do_MMM_YYYY')}` : ''}${toDate ? `_to_${moment(toDate).format('Do_MMM_YYYY')}` : ''}`
      });
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getAllDriversCommission(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      let { fromDate = null } = req.query;
      let { toDate = null } = req.query;
      const { driverId = null, orderId = null } = req.query;

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      const [{
        data: driverCommissions,
        pagination: [pagination]
      }] = await ReportService.getDriverCommissionReport({
        pageNo,
        perPage,
        fromDate,
        toDate,
        ...(!!driverId && { driverId }),
        ...(!!orderId && { orderId })
      });

      return res.send(ResponseService.success({ driverCommissions, pagination }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async exportDriverReport(req, res) {
    try {
      let { from_date: fromDate = null } = req.query;
      let { to_date: toDate = null } = req.query;
      const { driverId = null, orderId = null } = req.query;

      if (fromDate) {
        fromDate = moment(fromDate).set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      if (toDate) {
        toDate = moment(toDate).set({
          hour: 23,
          minute: 59,
          second: 59
        });
      }

      const [{ data: driverCommissions }] = await ReportService.getDriverCommissionReport({
        fromDate,
        toDate,
        ...(!!driverId && { driverId }),
        ...(!!orderId && { orderId })
      });

      return exportToExcel.getExcelFile({
        expressRes: res,
        data: driverCommissions,
        sheetName: 'Drivers',
        columns: [
          { name: 'orderId', label: 'Order Id' },
          { name: 'totalAmount', label: 'Total Amount (INR)' },
          { name: 'totalAdminCommission', label: 'Admin Commission (INR)' },
          { name: 'totalDriverCommission', label: 'Driver Commission (INR)' }
        ],
        fileName: `Driver_reports${fromDate ? `_from_${moment(fromDate).format('Do_MMM_YYYY')}` : ''}${toDate ? `_to_${moment(toDate).format('Do_MMM_YYYY')}` : ''}`
      });
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  },

  async getDriverCommissionsById(req, res) {
    try {
      const pageNo = Number(req.query.pageNo || config.pagination.pageNo);
      const perPage = Number(req.query.perPage || config.pagination.perPage);
      const { fromDate = null } = req.query;
      const { toDate = null } = req.query;
      const driverId = req.params.id;

      const driverOrders = await ReportService.getDriverOrdersByDriverId({
        pageNo,
        perPage,
        fromDate,
        toDate,
        driverId
      });
      return res.send(ResponseService.success({ driverOrders }));
    } catch (e) {
      return res.status(500).send(ResponseService.failure(e));
    }
  }
};

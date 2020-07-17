const mongoose = require('mongoose');
const Customer = require('../models/customer');

class CustomerService {
  getCustomer(request) {
    return Customer.findOne(request);
  }

  createCustomer(details) {
    return new Customer(details).save();
  }

  updateCustomer(details, criteria) {
    console.log('details-------------------------->', details);
    console.log('criteria------------------------>', criteria);
    return Customer.findOneAndUpdate(criteria, details, { new: true, upsert: false });
  }

  deleteCustomer(criteria) {
    return Customer.findOneAndDelete(criteria);
  }

  async getCustomerWithAddress(userId) {
    return Customer.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $unwind: '$address'
      },
      {
        $lookup: {
          from: 'cities',
          localField: 'address.city_id',
          foreignField: '_id',
          as: 'address.city'
        }
      },
      {
        $unwind: '$address.city'
      },
      {
        $group: {
          _id: '$_id',
          picture: { $first: '$picture' },
          gmail_id: { $first: '$gmail_id' },
          facebook_id: { $first: '$facebook_id' },
          status: { $first: '$status' },
          email: { $first: '$email' },
          full_name: { $first: '$full_name' },
          created_at: { $first: '$created_at' },
          updated_at: { $first: '$updated_at' },
          address: { $push: '$address' }
        }
      }
    ]);
  }

  addAddress(address, customer_id) {
    return Customer.findOneAndUpdate({ _id: customer_id }, { $push: { address } }, { new: true });
  }

  async updateAddress(address, address_id, customer_id) {
    await Customer.findOneAndUpdate({ _id: customer_id }, { $pull: { address: { _id: mongoose.Types.ObjectId(address_id) } } });
    return Customer.findOneAndUpdate({ _id: customer_id }, { $push: { address } }, { new: true });
  }

  async deleteAddress(address_id, customer_id) {
    return Customer.findOneAndUpdate({ _id: customer_id }, { $pull: { address: { _id: mongoose.Types.ObjectId(address_id) } } }, { new: true });
  }

  getTotalCustomerCount(request, search) {
    const condition = {
      $and:
                [
                  {
                    $or:
                            [
                              { full_name: new RegExp(search, 'i') }
                            ]
                  },
                  request
                ]
    };
    return Customer.countDocuments(condition);
  }

  getCustomersWithPagination(request, pageNo, perPage, search, sort) {
    const condition = {
      $and:
                [
                  {
                    $or:
                            [
                              { full_name: new RegExp(search, 'i') }
                            ]
                  },
                  request
                ]
    };
    return Customer.find(condition).skip((pageNo - 1) * perPage).limit(perPage).sort(sort);
  }
}

module.exports = new CustomerService();

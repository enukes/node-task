const Admin = require('../models/admin');

class AdminService {
  getAdmin(request) {
    return Admin.findOne(request);
  }

  getAdmins(request, perPage, pageNo) {
    return Admin.find(request).skip((pageNo - 1) * perPage).limit(perPage);
  }

  adminTotalCount(request) {
    return Admin.countDocuments(request);
  }

  createAdmin(details) {
    return new Admin(details).save();
  }

  updateAdmin(details, criteria) {
    console.log('details-------------------------->', details);
    console.log('criteria------------------------>', criteria);
    return Admin.findOneAndUpdate(criteria, details, { new: true });
  }

  deleteAdmin(criteria) {
    return Admin.findOneAndDelete(criteria);
  }
}

module.exports = new AdminService();

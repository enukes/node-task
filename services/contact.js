const mongoose = require('mongoose');
const Contact = require('../models/contact');

class ContactService {
  addContactRequest(details) {
    return new Contact(details).save();
  }
}

module.exports = new ContactService();

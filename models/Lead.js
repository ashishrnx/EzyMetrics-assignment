const mongoose = require('mongoose');

// Customer schema
const customerSchema = new mongoose.Schema({
  email: String,
  username: String,
  name: {
    firstname: String,
    lastname: String,
  },
  address: {
    city: String,
    street: String,
    number: Number,
    zipcode: String,
  },
  phone: String,
});

const Lead = mongoose.model('Lead', customerSchema);
module.exports = Lead;

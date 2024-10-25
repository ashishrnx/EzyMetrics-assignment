const mongoose = require('mongoose');

// Product schema 
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

const Campaign = mongoose.model('Campaign', productSchema); 
module.exports = Campaign;

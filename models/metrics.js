const mongoose = require('mongoose');

//  Metrics schema
const metricsSchema = new mongoose.Schema({
  averageProductPrice: { type: Number, required: true },
  topRatedProducts: [
    {
      title: String,
      rating: {
        rate: Number,
        count: Number,
      },
    }
  ],
  customerLocationBreakdown: { type: Object, required: true },
  mostDemandingCategory: {
    category: String,
    count: Number,
  },
  createdAt: { type: Date, default: Date.now }, 
});

const Metrics = mongoose.model('Metrics', metricsSchema);

module.exports = Metrics;

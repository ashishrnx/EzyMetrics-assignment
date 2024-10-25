require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customers');
const productRoutes = require('./routes/products');
const metricsRoutes = require('./routes/metrics');
const reportRoutes = require('./routes/report');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

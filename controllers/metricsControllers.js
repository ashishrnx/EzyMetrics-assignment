const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');
const Metrics = require('../models/Metrics');
const { sendEmailNotification } = require('../services/emailServices');

// ETL
exports.getMetrics = async (req, res) => {
  try {
    const customers = await Lead.find();
    const products = await Campaign.find();

    const avgProductPrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
    const topRatedProducts = products.filter(product => product.rating.rate >= 4.5);
    const customerLocationBreakdown = customers.reduce((acc, customer) => {
      const city = customer.address.city;
      acc[city] = acc[city] ? acc[city] + 1 : 1;
      return acc;
    }, {});

    const mostDemandingCategory = products.reduce((acc, product) => {
      const category = product.category;
      acc[category] = acc[category] ? acc[category] + 1 : 1;
      return acc;
    }, {});

    if (avgProductPrice > 30) {
      const alertMessage = `Alert: The average product price has exceeded the threshold! Current average price: ${avgProductPrice}`;
      await sendEmailNotification(alertMessage);
    }

    const metrics = new Metrics({
      averageProductPrice: avgProductPrice,
      topRatedProducts,
      customerLocationBreakdown,
      mostDemandingCategory,
    });

    await metrics.save();
    res.json({ message: 'Metrics saved', metrics });
  } catch (error) {
    res.status(500).send('Error in ETL process');
  }
};

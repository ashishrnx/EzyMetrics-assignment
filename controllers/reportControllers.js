const Metrics = require('../models/Metrics');
const { generatePDF } = require('../services/pdfServices');
const { generateCSV } = require('../services/csvServices');

exports.generatePDFReport = async (req, res) => {
  try {
    const metrics = await Metrics.findOne().sort({ createdAt: -1 });
    if (!metrics) {
      return res.status(404).send('No metrics found to generate report');
    }
    await generatePDF(metrics, res);
  } catch (error) {
    res.status(500).send('Error generating PDF report');
  }
};

exports.generateCSVReport = async (req, res) => {
  try {
    const metrics = await Metrics.findOne().sort({ createdAt: -1 });
    if (!metrics) {
      return res.status(404).send('No metrics found to generate report');
    }
    await generateCSV(metrics, res);
  } catch (error) {
    res.status(500).send('Error generating CSV report');
  }
};

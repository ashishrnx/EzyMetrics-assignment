const express = require('express');
const router = express.Router();
const { generatePDFReport, generateCSVReport } = require('../controllers/reportControllers');

// Routes for PDF and CSV generation
router.get('/pdf', generatePDFReport);
router.get('/csv', generateCSVReport);

module.exports = router;

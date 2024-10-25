const express = require('express');
const router = express.Router();
const { getMetrics } = require('../controllers/metricsControllers');

router.get('/', getMetrics);

module.exports = router;

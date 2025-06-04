const express = require('express');
const { getStockQuote } = require('../utils/finnhub');

const router = express.Router();

// Example: GET /api/stock/AAPL
router.get('/stock/:symbol', async (req, res) => {
  try {
    const data = await getStockQuote(req.params.symbol);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

module.exports = router;

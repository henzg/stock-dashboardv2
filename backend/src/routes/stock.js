import { Router } from 'express';
import logger from '../utils/logger.js';
import { getStockQuote } from '../utils/finnhub.js';
import { getStockHistory } from '../utils/alphaVantage.js';
import { searchStock } from '../utils/alphaVantage.js';


const router = Router();

router.get('/search', async (req,res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query param "q" is required.'});
    }
    const results = await searchStock(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search for stocks.' });
  }
});

// gets basic info about stock from finnhub api
router.get('/:symbol', async (req, res) => {
  try {
    const data = await getStockQuote(req.params.symbol);
    res.json(data);
  } catch (err) {
    logger.error('[Stock Route error]', err);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// uses alphaVantage api
router.get('/:symbol/history', async (req,res) => {
    try {
        const data = await getStockHistory(req.params.symbol);
        res.json(data);
    } catch (err) {
      logger.error('[Stock History Route error]', err);
      res.status(500).json({ error: 'Failed to fetch historical price data' });
    }
});


export default router;

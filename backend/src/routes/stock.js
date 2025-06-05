import { Router } from 'express';
import logger from '../utils/logger.js';
import { getStockQuote } from '../utils/finnhub.js';
import { getStockHistory } from '../utils/alphaVantage.js';
import { searchStock } from '../utils/alphaVantage.js';


const router = Router();

/**
 * @swagger
 * /stock/search:
 *   get:
 *     summary: Search for stocks
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: keyword to search for (company name or symbol)
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                     description: Stock symbol
 *                   name:
 *                     type: string
 *                     description: Company name
 *                   type:
 *                     type: string
 *                   region:
 *                     type: string
 *                   currency:
 *                     type: string
 *       400:
 *         description: Query param "q" is required
 *       500:
 *         description: Faile to search for stocks
 */
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


/**
 * @swagger
 * /stock/{symbol}:
 *   get:
 *     summary: Get real-time stock quote. Uses Finnhub
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: The stock symbol
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error fetching stock data
 */ 
router.get('/:symbol', async (req, res) => {
  try {
    const data = await getStockQuote(req.params.symbol);
    res.json(data);
  } catch (err) {
    logger.error('[Stock Route error]', err);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

/**
 * @swagger
 * stock/{symbol}/history:
 *   get:
 *     summary: Get historical daily stock prices. Uses alphaVantage
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: The stock symbol
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error fetching stock data
 */ 
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

import { Router } from 'express';
import { portfolios } from '../data/users.js';

const router = Router();

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Gets all portfolios
 *     responses:
 *       200:
 *         description: Displays all user portfolios
 *       404:
 *         description: No portfolios found
 */ 
router.get('/', (req,res)=>{
    // if(!portfolios) res.status(404).json({ error: 'No portfolios found'})
    return res.json(portfolios)
});

/**
 * @swagger
 * /portfolio/{userId}:
 *   get:
 *     summary: Gets a users portfolio info
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *          type: number
 *         description: A users Id     
 *     responses:
 *       200:
 *         description: Displays a users portfolio
 *       404:
 *         description: User id doesnt have a portfolio
 */ 
router.get('/:userId', (req,res) => {
    const userId = Number(req.params.userId);
    const portfolio = portfolios.find(p => p.userId === userId);
    if (portfolio) return res.json(portfolio);
    res.status(404).json({ error: 'Portfolio not found' });
});

router.post('/:userId/add', (req,res) => {
    const userId = Number(req.params.userId);
    const { symbol, quantity } = req.body;

    if (!symbol || !quantity){
        return res.status(400).json("Symbol and quantity required");
    }

    if (!Number(quantity)) {
        return res.status(400).json("Quantity is not a number!")
    }

    let portfolio = portfolios.find(p => p.userId === userId);
    if (!portfolio) {
        portfolio = { userId, holdings: [] };
        portfolios.push(portfolio);
    } 

    const existing = portfolio.holdings.find(h => h.symbol === symbol);
    if (existing) {
        existing.quantity += Number(quantity)
    } else {
        portfolio.holdings.push({ symbol, quantity: Number(quantity) });
    }

    res.json(portfolio);
});

export default router;
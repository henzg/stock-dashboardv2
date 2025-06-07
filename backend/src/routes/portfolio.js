import { Router } from 'express';
import { portfolios } from '../data/users.js';

const router = Router();

router.get('/', (req,res)=>{
    return res.json(portfolios)
})

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
// route to grab companies profile using company profile 2
import { Router } from 'express';
import logger from '../utils/logger.js';
import { getCompanyProfile } from '../utils/finnhub.js';

const router = Router();
router.get("/:symbol", async (req,res) => {
    try {
        const data = await getCompanyProfile(req.params.symbol);
        res.json(data);
    } catch (err) {
        logger.error('[CP Route error]', err);
        res.status(500).json({ error: 'Failed to fetch company profile data'});
    }
});

export default router;
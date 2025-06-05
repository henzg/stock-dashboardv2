// imports
import dotenv from 'dotenv';
dotenv.config();
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

import express from 'express';
import stockRoutes from './routes/stock.js';
import companyRoutes from './routes/company.js';
import logger from './utils/logger.js';

const app = express();

app.use(express.json());


// health check route
app.get('/api/health', (req,res)=> {
  res.status(200).json({ status: 'ok' });
});


// api routes
app.use('/api/stock', stockRoutes);
app.use('/api/company', companyRoutes);

// connection
const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

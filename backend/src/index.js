// dotenv import
import dotenv from 'dotenv';
dotenv.config();
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
// module imports
import express from 'express';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';
// module imports from files
import stockRoutes from './routes/stock.js';
import companyRoutes from './routes/company.js';
import logger from './utils/logger.js';
import swaggerDefinition from './docs/swagger.js';
import userRoutes from './routes/user.js';
import portfolioRoutes from './routes/portfolio.js';

const app = express();
app.use(express.json());

const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15min
  max: 6, // ip is 60 req per windowMs
  standardHeaders: true, // rate limit info in the headers
  legacyHeaders: false, //disable x-rateLimit-* in header
  message: "Stop spamming the api bruv",
});

// swagger setup
const options = { 
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({ origin: "http://localhost:3000" }));

// health check route
app.get('/api/health', (req,res)=> {
  res.status(200).json({ status: 'ok' });
});

// api routes
app.use('/api/stock', defaultLimiter, stockRoutes);
app.use('/api/company', defaultLimiter, companyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/portfolio', portfolioRoutes);

// connection
const port = process.env.PORT || 8000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

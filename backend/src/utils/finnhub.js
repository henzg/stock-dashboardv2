import axios from 'axios';
import logger from './logger.js';

const BASE_URL = 'https://finnhub.io/api/v1';

export async function getStockQuote(symbol) {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
  const url = `${BASE_URL}/quote`;
  

  if(!FINNHUB_API_KEY) {
    throw new Error('FINNHUB_API_KEY is not set or invalid. Please check your key.');
  }

  try {
    const res = await axios.get(url, {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });
    return res.data;
  } catch (err) {
    logger.error('Error fetching stock quote:', err.message);
    throw err;
  }
}

export async function getCompanyProfile(symbol) {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
  const url = `${BASE_URL}/stock/profile2`;
  
  if(!FINNHUB_API_KEY) {
    throw new Error('FINNHUB_API_KEY is not set or invalid. Please check your key.');
  }

  try {
    const res = await axios.get(url, {
      params: {symbol, token: FINNHUB_API_KEY},
    });
    return res.data;
  } catch (err) {
    logger.error('Error fetching company profile: ', err.message);
    throw err;
  }
}
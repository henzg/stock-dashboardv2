import axios from 'axios';
import logger from './logger.js';

const BASE_URL = 'https://www.alphavantage.co'

export async function getStockHistory(symbol) {
    const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY
    const url = `${BASE_URL}/query`;

  if(!ALPHAVANTAGE_API_KEY) {
    throw new Error('ALPHAVANTAGE_API_KEY is not set or invalid. Please check your key.');
  }

  try {
    const res = await axios.get(url, {
        params: {
            function: 'TIME_SERIES_DAILY',
            symbol,
            apikey:  ALPHAVANTAGE_API_KEY,
            outputsize: 'compact', // can be full for future development
        },
    });
    // time sereies daily object
    if (res.data['Time Series (Daily)']) {
        return res.data['Time Series (Daily)'];
    }else {
        logger.error('Alpha Vantage error:', res.data);
        throw new Error('No historical data found for symbol.');
    }
  } catch (err) {
    logger.error('Error fetching historical prices:', err.message);
    throw err;
  }
}

export async function searchStock(keyword) {
    const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY
    const url = `${BASE_URL}/query`;

  if(!ALPHAVANTAGE_API_KEY) {
    throw new Error('ALPHAVANTAGE_API_KEY is not set or invalid. Please check your key.');
  }
 
  try {
    const res = await axios.get(url, {
        params: {
            function: 'SYMBOL_SEARCH',
            keywords: keyword,
            datatype: 'json',
            apikey: ALPHAVANTAGE_API_KEY,
        },
    });
    if (res.data && res.data.bestMatches) {
        return res.data.bestMatches;
    } else {
        logger.error('Alpha Vantage search error:', res.data);
        throw new Error('No matches found for the keyword');
    }
} catch (err) {
    logger.error('Error searchign for stock:', err.message);
    throw err;
  }
}
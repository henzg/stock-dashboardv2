const axios = require('axios');

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

async function getStockQuote(symbol) {
  const url = `${BASE_URL}/quote`;
  try {
    const res = await axios.get(url, {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching stock quote:', err.message);
    throw err;
  }
}

module.exports = {
  getStockQuote,
};

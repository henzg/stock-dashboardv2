require('dotenv').config();

const express = require('express');
const stockRoutes = require('./routes/stock');

const app = express();

app.use(express.json());

app.use('/api', stockRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

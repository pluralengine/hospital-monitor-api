if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const { router } = require('./routes');

// Database
db.init();

// Middlewares
app.use(bodyParser.json());
app.use(router);

// Listen to port
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
app.listen(PORT, () =>
  console.log(`Hospital-monitor-api listening on port ${PORT}! 🚀`)
);

// Export router

module.exports = { app };

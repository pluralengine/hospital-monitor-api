if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const router = require('./routes/hospital-routes');
require('./db-config');

// routes
const hospitalsRouter = require('./routes/hospital-routes.js');

// Middlewares
app.use(bodyParser.json());
app.use(router);
app.use('/hospitals', hospitalsRouter);

// Listen to port

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}! 🚀`)
);

// Export router

module.exports = { app };

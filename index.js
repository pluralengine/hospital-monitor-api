if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
let PORT;
if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PORT;
} else {
  PORT = 3000;
}
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
  console.log(`Hospital-monitor-api listening on port ${PORT}! 🚀`)
);

// Export router

module.exports = { app };

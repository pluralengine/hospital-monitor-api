const router = require('./router');
const hospitalsRouter = require('./hospital-routes.js');
const usersRouter = require('./user-routes.js');
const scoreRouter = require('./score-routes.js');
const loginRouter = require('./login-routes.js');

module.exports = {
  router,
  hospitalsRouter,
  usersRouter,
  scoreRouter,
  loginRouter,
};

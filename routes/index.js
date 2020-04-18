const router = require('./router');
require('./hospital-routes.js');
require('./pharmacy-routes.js');
require('./user-routes.js');
require('./score-routes.js');
require('./login-routes.js');
require('./provinces-routes');

module.exports = {
  router,
};

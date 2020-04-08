const router = require('./router');
const { loginControllers } = require('../controllers');

router.post('/login', loginControllers.login);

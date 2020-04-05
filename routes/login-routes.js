const router = require('./router');
const loginController = require('../controllers/login-controller');

router.post('/login', loginController.login);

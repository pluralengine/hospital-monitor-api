const router = require('./router');
const { userControllers } = require('../controllers');

router.get('/users', userControllers.getAllUsers);
router.get('/users/:id', userControllers.findUserById);
router.post('/users', userControllers.createUser);

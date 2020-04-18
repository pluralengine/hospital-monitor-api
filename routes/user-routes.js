const router = require('./router');
const { userControllers, pharmacyControllers } = require('../controllers');
const { authenticateJWT } = require('./utils');

router.get('/users/:id', userControllers.findUserById);
router.post('/users', userControllers.createUser);
router.put(
  '/user/pharmacy/stock',
  authenticateJWT,
  pharmacyControllers.updateUserPharmacyStock
);

const router = require('./router');
const { userControllers, pharmacyControllers } = require('../controllers');
const { authenticateJWT } = require('./utils');

router.post('/users', userControllers.createUser);
router.get('/users/:id', userControllers.findUserById);
router.put(
  '/user/pharmacy/stock',
  authenticateJWT,
  pharmacyControllers.updateUserPharmacyStock
);
router.get(
  '/user/pharmacy',
  authenticateJWT,
  pharmacyControllers.getUsersPharmacy
);
router.post('/user/pharmacy', userControllers.createPharmacyUser);

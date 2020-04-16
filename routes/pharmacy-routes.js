const router = require('./router');
const { pharmacyControllers } = require('../controllers');
const { authenticateJWT } = require('./utils');

router.get('/pharmacies', pharmacyControllers.getAllPharmacies);
router.get('/pharmacies/:id', pharmacyControllers.getPharmacyById);
router.put(
  '/pharmacies/stock',
  authenticateJWT,
  pharmacyControllers.updatePharmacyStock
);

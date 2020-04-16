const router = require('./router');
const { pharmacyControllers } = require('../controllers');
const { authenticateJWT } = require('./utils');

router.get('/pharmacies', pharmacyControllers.getAllPharmacies);
router.put(
  '/pharmacies/stock',
  authenticateJWT,
  pharmacyControllers.updatePharmacyStock
);

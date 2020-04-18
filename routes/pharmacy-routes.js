const router = require('./router');
const { pharmacyControllers } = require('../controllers');

router.get('/pharmacies', pharmacyControllers.getAllPharmacies);
router.get('/pharmacies/:id', pharmacyControllers.getPharmacyById);

const router = require('./router');
const { pharmacyControllers } = require('../controllers');

router.get('/pharmacies', pharmacyControllers.getAllPharmacies);
console.log(router)
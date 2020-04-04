const router = require('./router');
const { hospitalControllers } = require('../controllers');

router.get('/hospitals', hospitalControllers.getAllHospitals);
router.get('/hospitals/:id', hospitalControllers.findHospitalById);
router.post('/hospitals', hospitalControllers.createHospital);

const router = require('./router');
const { hospitalControllers } = require('../controllers');
const { authenticateJWT } = require('./utils');

router.get('/hospitals', hospitalControllers.getAllHospitals);
router.get('/hospitals/:id', hospitalControllers.findHospitalById);
router.post('/hospitals', authenticateJWT, hospitalControllers.createHospital);

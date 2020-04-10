const router = require('./router');
const { scoreControllers } = require('../controllers');
const { authenticateJWT } = require('./utils');

router.post('/score', authenticateJWT, scoreControllers.sendHospitalScore);

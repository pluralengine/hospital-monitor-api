const router = require('./router');
const { scoreControllers } = require('../controllers');

router.post('/score', scoreControllers.sendHospitalScore);

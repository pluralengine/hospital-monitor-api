const router = require('./router');
const { scoreControllers } = require('../controllers');

router.post('/router/:id', scoreControllers.sendHospitalScore);

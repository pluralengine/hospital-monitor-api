const router = require('express').Router();

const hospitalController = require('../controllers/hospital-controller');

router.get('/hospitals', hospitalController.getAllHospitals);

module.exports = router;

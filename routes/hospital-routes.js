const router = require('express').Router();

const hospitalController = require('../controllers/hospital-controller');

router.get('/hospitals', hospitalController.getAllHospitals);
router.get('/hospitals/:id', hospitalController.findHospitalById);
router.post('/hospitals', hospitalController.createHospital);
router.put('/hospitals/:id', hospitalController.changeStatus);

module.exports = router;

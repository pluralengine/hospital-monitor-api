const router = require('express').Router();

const userControllers = require('../controllers/user-controller');

router.get('/users', userControllers.getAllUsers);
router.get('/users/:id', userControllers.findHospitalById);
router.post('/users', userControllers.createUser);

const router = require('./router');
const { provinceControllers } = require('../controllers');

router.get('/provinces', provinceControllers.getProvinces);
router.get('/provinces/areas', provinceControllers.getAreas);

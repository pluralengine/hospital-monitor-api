const router = require('./router');
const { productControllers } = require('../controllers');

router.get('/products', productControllers.getAllProducts);

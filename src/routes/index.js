const { Router } = require('express');
const router = Router();
const { getProductos, postProductos } = require('../controllers/productosControllers')

router.get('/personas', getProductos);
router.post('/personas', postProductos);

module.exports = router;
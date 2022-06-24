const { Router } = require('express');
const router = Router();
const { getForm, postProductos, getProductos } = require('../controllers/productosControllers')


router.get('/', getForm);
router.post('/productos', postProductos);
router.get('/productos', getProductos);

module.exports = router;
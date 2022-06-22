const { Router } = require('express');
const router = Router();
const { getForm, postForm, getProductos, postProductos } = require('../controllers/productosControllers')


router.get('/', getForm);
router.post('/', postForm);

router.get('/productos', getProductos);
router.post('/productos', postProductos);

module.exports = router;
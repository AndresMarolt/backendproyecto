const { Router } = require('express');
const router = Router();
const { CartHandler } = require('../controllers/index');

const cartsHandler = new CartHandler();

router.post('/', cartsHandler.createCart)
router.delete('/:id', cartsHandler.deleteCart)

router.get('/:id/productos', cartsHandler.getCartProducts);
router.post('/:id/productos', cartsHandler.addCartProduct);
router.delete('/:id/productos/:id_prod', cartsHandler.deleteCartProduct)

module.exports = router;
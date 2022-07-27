import { Router } from "express";
const router = Router();
import handler from '../controllers/index.js'

router.get('/productos/:id?', handler.getProduct);
router.post('/productos/', handler.addProduct);
router.put('/productos/:id', handler.updateProduct);
router.delete('/productos/:id', handler.deleteProduct);


router.post('/carrito/', handler.createCart);
router.delete('/carrito/:id', handler.deleteCart);
router.get('/carrito/:id/productos', handler.getCartProducts);
router.post('/carrito/:id/productos', handler.addCartProduct);
router.delete('/carrito/:id/productos/:id_prod', handler.deleteCartProduct);

export default router;
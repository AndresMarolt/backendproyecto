import { Router } from "express";
const router = Router();
import handler from '../controllers/index.js'

router.get('/productos/:id?', handler.getProduct);              // Mongo: OK, Firebase: OK
router.post('/productos/', handler.addProduct);                 // Mongo: OK, Firebase: OK
router.put('/productos/:id', handler.updateProduct);            // Mongo: OK, Firebase: OK
router.delete('/productos/:id', handler.deleteProduct);         // Mongo: OK, Firebase: OK

router.post('/carrito/', handler.createCart);                                       // Mongo: OK, Firebase: OK
router.delete('/carrito/:id', handler.deleteCart);                                  // Mongo: OK, Firebase: OK
router.get('/carrito/:id/productos', handler.getCartProducts);                      // Mongo: NO FUNCIONA, Firebase: 
router.post('/carrito/:id/productos', handler.addCartProduct);                      // Mongo: OK, Firebase: 
router.delete('/carrito/:id/productos/:id_prod', handler.deleteCartProduct);        // Mongo: NO FUNCIONA, Firebase: 

export default router;
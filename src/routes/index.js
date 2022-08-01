import { Router } from "express";
const router = Router();
import productHandler from '../controllers/productControllers.js'
import cartHandler from '../controllers/cartControllers.js'

router.post('/productos/', productHandler.addProduct);                 
router.get('/productos/:id?', productHandler.getProduct);              
router.put('/productos/:id', productHandler.updateProduct);            
router.delete('/productos/:id', productHandler.deleteProduct);         

router.post('/carrito/', cartHandler.createCart);                                       
router.delete('/carrito/:id', cartHandler.deleteCart);                                  
router.get('/carrito/:id/productos', cartHandler.getCartProducts);
router.post('/carrito/:id/productos', cartHandler.addCartProduct);                      
router.delete('/carrito/:id/productos/:id_prod', cartHandler.deleteCartProduct);

export default router;
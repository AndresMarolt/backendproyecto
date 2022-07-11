const { Router } = require('express');
const router = Router();
const { adminMiddleware, ProductsHandler } = require('../controllers/index')

const productsHandler = new ProductsHandler();

router.get('/:id?', productsHandler.getProd);
router.post('/', adminMiddleware, productsHandler.addProd);
router.put('/:id', adminMiddleware, productsHandler.updateProd);
router.delete('/:id', adminMiddleware, productsHandler.deleteProd);

module.exports = router;
import daos from '../daos/index.js'

const cartHandler = new daos.CartDao;


const createCart = async (req, res) => {
    try{
        const timestamp = Date.now();
        const products = [];
        const newCart = { timestamp, products };
        await cartHandler.add(newCart);
        res.status(201).json('Carrito agregado exitosamente');
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`})
    }
}

const deleteCart = async (req, res) => {
    try {
        await cartHandler.delete(req.params.id);
        res.status(200).json('Carrito eliminado correctamente');
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}

const getCartProducts = async (req, res) => {
    try {
        const cart = await cartHandler.getProducts(req.params.id);
        res.status(200).json(cart);
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}

const addCartProduct = async (req, res) => {
    try {
        const cartId = req.params.id;
        const product = req.body
        await cartHandler.addCartProduct(cartId, product);
        res.status(200).json('Producto agregado al carrito exitosamente');
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}

const deleteCartProduct = async (req, res) => {
    try {
        const cartId = req.params.id;
        const prodId = req.params.id_prod;

        await cartHandler.deleteCartProd(cartId, prodId);

        res.status(200).json('Eliminado exitosamente');
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}

export default {createCart, deleteCart, getCartProducts, addCartProduct, deleteCartProduct}
// import adminMiddleware from '../middleware';
import daos from '../daos/index.js'

const productHandler = new daos.ProductDao;
const cartHandler = new daos.CartDao;


const getProduct = async (req, res) => {
    try {
        const response = await productHandler.get(req.params.id);
        res.status(200).json(response);
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}

const addProduct = async (req, res) => {
    try{
        let {title, thumbnail, description, serialNumber, price, stock } = req.body;
        const timestamp = Date.now();

        const newProduct = {title, thumbnail, stock, description, serialNumber, price, timestamp};
        await productHandler.add(newProduct);
        res.status(201).json(`${title} agregado exitosamente`);
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}

const updateProduct = async (req, res) => {
    try {
        let {title, thumbnail, description, serialNumber, price, stock } = req.body;
        const timestamp = Date.now();

        const updatedProd = {title, thumbnail, description, serialNumber, price, stock, timestamp};

        await productHandler.update(req.params.id, updatedProd);
        res.status(200).json(`${title} actualizado exitosamente`);
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}

const deleteProduct = async (req, res) => {
    try {
        await productHandler.delete(req.params.id);
        res.status(200).json(`Producto eliminado exitosamente`)
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}


// ==================================================================================================================================


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
        const productToAdd = await productHandler.get(req.body.id);
        await cartHandler.addCartProduct(cartId, productToAdd);
        res.status(200).json('Producto agregado al carrito exitosamente');
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}

const deleteCartProduct = async (req, res) => {
    try {
        const cartId = req.params.id;
        const prodId = req.params.id_prod;

        const product = await productHandler.get(prodId);

        await cartHandler.deleteCartProd(cartId, product);
        res.status(200).json('Eliminado exitosamente');
    } catch(err) {
        res.status(502).json({error: 502, descripcion: `${err}`});
    }
}



export default {getProduct, addProduct, updateProduct, deleteProduct, createCart, deleteCart, getCartProducts, addCartProduct, deleteCartProduct}
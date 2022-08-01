import daos from '../daos/index.js'

const productHandler = new daos.ProductDao;


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

export default {getProduct, addProduct, updateProduct, deleteProduct}
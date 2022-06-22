class Contenedor {
    constructor() {
        this.productos = [];
    }

    obtenerProductos() {
        return this.productos;
    }

    añadirProducto(title, price, thumbnail) {
        let id = this.productos.length + 1;
        this.productos.push({id, title, price, thumbnail});
    }
}

const prodContenedor = new Contenedor();

const getForm = (req, res) => {
    console.log(prodContenedor.productos);
    res.render('main');
}

const postForm = (req, res) => {
    const {title, price, thumbnail} = req.body;
    prodContenedor.añadirProducto(title, price, thumbnail);
    res.statusCode(201);
}

const getProductos = (req, res) => {
    const prods = prodContenedor.obtenerProductos();
    res.render('productos.hbs', {prods, hasAny: true});
}

const postProductos = (req, res) => {
    res.sendStatus(201);
}

module.exports = {
    getProductos,
    postProductos,
    getForm,
    postForm
}
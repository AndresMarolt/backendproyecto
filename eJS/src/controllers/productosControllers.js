class Contenedor {
    constructor() {
        this.productos = [];
    }

    obtenerProductos() {
        try {
            return this.productos;
        } catch(err) {
            console.log(err);
        }
    }

    añadirProducto(title, price, thumbnail) {
        try{
            let id = this.productos.length + 1;
            this.productos.push({id, title, price, thumbnail});
        } catch(err) {
            console.log(err);
        }
            
    }
}

const prodContenedor = new Contenedor();

const getForm = (req, res) => {
    res.render('main.ejs');
}

const postProductos = (req, res) => {
    const {title, price, thumbnail} = req.body;
    console.log(req.body);
    prodContenedor.añadirProducto(title, price, thumbnail);
    res.redirect('/productos');
}

const getProductos = (req, res) => {
    const prods = prodContenedor.obtenerProductos();
    console.log(prods);
    res.render('productos.ejs', {prods: prods, hasAny: true});
}

module.exports = {
    getProductos,
    getForm,
    postProductos
}
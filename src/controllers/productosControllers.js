const productos = [];

const getProductos = (req, res) => {
    res.render('main.hbs', { productos })
}

const postProductos = (req, res) => {
    const { title, price, thumbnail } = req.body;
    const producto = { title: title, price: price, thumbnail: thumbnail}
    productos.push(persona);
    res.redirect('/productos')
}

module.exports = {
    getProductos,
    postProductos
}
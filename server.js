require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// const path = require('path');
const rutasProducto = require('./src/routes/rutasProducto');
const rutasCarrito = require('./src/routes/rutasCarrito');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/productos', rutasProducto);
app.use('/api/carrito', rutasCarrito);
app.get('*', (req, res) => {
    res.status(404).send({error: 404, descripcion: 'Ruta inexistente'});
  });

app.listen(port, (err) => {
    if(err) {
        console.log(`Error: ${err}`);
    } else {
        console.log(`Server listening to port ${port}`)
    }
})
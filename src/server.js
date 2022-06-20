const express = require('express');
const app = express();
const port = 8080;
const path = require('path');       // Se importa 'path' para poder utilizar el método join
const rutas = require('./routes/index');

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use('/', rutas);

app.listen(port, (err) => {
    err ?
        console.log(`Hubo un error al inicializar el servidor: ${err}`)
        :
        console.log(`Servidor escuchando a puerto ${port}`)
})
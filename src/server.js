const express = require('express');
const app = express();
const port = 8080;
const rutas = require('./routes/index');
const path = require('path');
const {engine} = require('express-handlebars');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layouts/index.hbs'),
    layoutDir: path.join(__dirname, './views/layouts'),
    partialsDir: path.join(__dirname, './views/partials/')
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')

app.use('/', rutas);

app.listen(port, (err) => {
    err ?
        console.log(`Hubo un error al inicializar el servidor: ${err}`)
        :
        console.log(`Servidor escuchando a puerto ${port}`)
})
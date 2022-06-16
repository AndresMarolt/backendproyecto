const express = require('express');
const app = express();
const port = 8080;
const rutas = require('../routes/index');
const {engine} = require('express-handlebars');
const path = require('path');

app.engine('hbs', engine({
    extname: '.hbs',                                                             // extname es el nombre que se le va a dar a la extensión de la plantilla
    defaultLayout: path.join(__dirname, '../views/layouts/main.hbs'),            // defaultLayout es a donde vamos a incrustar todas las plantillas que creemos
    layoutDir: path.join(__dirname, '../views/layouts'),
    partialsDir: path.join(__dirname, '../views/partials')
}))

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use('/', rutas);

app.listen(port, (err) => {
    err ? console.log(`Hubo un error al intentar inicializar el servidor: ${error}`) : console.log(`Servidor escuchando al puerto ${port}`);
})
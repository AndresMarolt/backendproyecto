const express = require('express');
const app = express();
const port = 8080;
const rutas = require('./routes/index');
const path = require('path');
const {engine} = require('express-handlebars');
// WEBSOCKET CONFIG:
const {Server: IOServer} = require('socket.io');
const expressServer = app.listen(port, (err) => {
    err ? console.log(`Hubo un error al inicializar el servidor: ${err}`) : console.log(`Servidor escuchando a puerto ${port}`)
})
const io = new IOServer(expressServer);
const products = [];

// DIRECTORIO DE ARCHIVOS ESTATICOS:
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// RUTAS
/* app.use('/', rutas); */

// WEBSOCKET:
io.on('connection', socket => {
    console.log("Se conectó un usuario nuevo");
    socket.emit('server:products', products);
})
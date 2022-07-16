require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const { createProdTable, createChatTable } = require('./src/createTables');
const { productDatabase, chatDatabase } = require('./src/ddbb');
const databaseHandler = require('./src/controllers/index');

const ddbbHandlerProd = new databaseHandler(productDatabase, 'product');
const ddbbHandlerMsg = new databaseHandler(chatDatabase, 'chat');

// WEBSOCKET CONFIG:
const {Server: IOServer} = require('socket.io');
const expressServer = app.listen(port, (err) => {
    err ? console.log(`Hubo un error al inicializar el servidor: ${err}`) : console.log(`Servidor escuchando a puerto ${port}`)
})
const io = new IOServer(expressServer);


// DIRECTORIO DE ARCHIVOS ESTATICOS:
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// WEBSOCKET:
io.on('connection', async socket => {
    // console.log("Se conectó un usuario nuevo");
    
    await createProdTable(productDatabase, 'product');            // CREA LA TABLA DE PRODUCTOS SI ESTA NO EXISTIA
    let prods = await ddbbHandlerProd.getAll();                   // SE TRAEN TODOS LOS PRODUCTOS DE LA TABLA

    await createChatTable(chatDatabase, 'chat');                  // CREA LA TABLA DE CHATS SI ESTA NO EXISTIA
    let chat = await ddbbHandlerMsg.getAll();                     // SE TRAEN TODOS LOS CHATS DE LA TABLA

    io.emit('server:products', prods);                            // AL ESTABLECERSE LA CONEXION SE LE ENVIAN AL CLIENTE LOS PRODUCTOS QUE HAYA EN LA BBDD
    socket.on('client:product', async productData => {              
        await ddbbHandlerProd.save(productData);                  // CUANDO EL CLIENTE LE ENVIA AL SERVIDOR UN NUEVO PRODUCTO DESDE EL SERVIDOR SE LO GUARDA EN LA BBDD
        prods = await ddbbHandlerProd.getAll();                   // SE ESPERA A QUE SE TRAIGAN TODOS LOS PRODUCTOS DE LA BBDD Y SE LOS ALMACENA EN UNA VARIABLE  
        io.emit('server:products', prods);                        // SE ENVIA AL CLIENTE LA VARIABLE CONTENEDORA DE TODOS LOS PRODUCTOS PARA QUE SE RENDERICEN
    })
    
    io.emit('server:messages', chat);
    socket.on('client:message', async messageData => {
        await ddbbHandlerMsg.save(messageData);
        chat = await ddbbHandlerMsg.getAll();
        io.emit('server:messages', chat);
    })
})


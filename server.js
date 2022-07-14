const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { createProdTable, createChatTable } = require('./src/createTables');
const { productDatabase, chatDatabase } = require('./src/ddbb');

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


const addElement = async (ddbb, table, element) => {
    try {
        await ddbb(table).insert(element);
        console.log('Agregado a la tabla');
        ddbb.destroy();
    } catch(err) {
        console.log(err);
        ddbb.destroy();
    }
}


// WEBSOCKET:
io.on('connection', socket => {
    console.log("Se conectó un usuario nuevo");
    
    io.emit('server:products');                                 // Ejecuta el evento 'server:products', con lo cual el cliente renderiza los productos que haya en bbdd
    socket.on('client:product', productData => {                // El servidor escucha al evento 'client:product' y cuando ocurre hace lo siguiente:
        createProdTable(productDatabase(), 'product');            // Crea una tabla 'product' si esta no existía antes
        addElement(productDatabase(), 'product', productData);    // Añade el elemento recibido
        io.emit('server:products');
    })
    
    io.emit('server:messages');
    socket.on('client:message', messageData => {
        createChatTable(chatDatabase, 'chat');
        addElement(chatDatabase, 'chat', messageData)
        io.emit('server:messages');
    })
})


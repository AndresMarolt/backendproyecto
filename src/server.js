const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
// WEBSOCKET CONFIG:
const {Server: IOServer} = require('socket.io');
const expressServer = app.listen(port, (err) => {
    err ? console.log(`Hubo un error al inicializar el servidor: ${err}`) : console.log(`Servidor escuchando a puerto ${port}`)
})
const io = new IOServer(expressServer);
const products = [];
const messages = [];

// DIRECTORIO DE ARCHIVOS ESTATICOS:
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ARCHIVO CON CHATS
const saveFile = async messages => {
    try {
        let chats = JSON.stringify(messages);
        await fs.promises.writeFile(`./chats`, chats);
    } catch(error) {
        console.log(error);              
    }
}
// WEBSOCKET:
io.on('connection', socket => {
    console.log("Se conectó un usuario nuevo");
    io.emit('server:products', products);
    
    socket.on('client:product', productData => {            // ATAJA EL PRODUCTO ENVIADO DESDE EL CLIENTE
        products.push(productData);                         // ACTUALIZA EL ARRAY DE PRODUCTOS
        io.emit('server:products', products)                           // ENVIA AL CLIENTE EL ARRAY ACTUALIZADO
    })

    io.emit('server:messages', messages);
    socket.on('client:message', messageData => {
        messages.push(messageData);
        saveFile(messages);
        io.emit('server:messages', messages);
    })
})


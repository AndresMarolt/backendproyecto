require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');

// SOCKET.io CONFIG:
const {Server: IOServer} = require('socket.io');
const expressServer = app.listen(port, err => {
    err ? console.log(`There was an error when itializing server: ${err}`) : console.log(`Server listening to port ${port}`);
})
const io = new IOServer(expressServer);
const products = [{title: 'Lapiz', price: 1500, thumbnail: 'https://www.faber-castell.com.ar/-/media/Products/Product-Repository/CASTELL-9000/24-24-01-Pencil/119003-Graphite-pencil-CASTELL-9000-3B/Images/119003_0_PM99.ashx?bc=ffffff&w=273&h=290&as=0&la=es-AR&hash=C37AA24F6CC9EDB168050B31DB8473925C20E37E'}]

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {
    console.log(`Se conectó un usuario nuevo`);

    socket.emit('server:products', products)
})

const express = require('express');
const app = express();
const port = 8080;
const rutas = require('./routes/index');
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.use('/', rutas);

app.listen(port, (err) => {
    err ?
        console.log(`Hubo un error al inicializar el servidor: ${err}`)
        :
        console.log(`Servidor escuchando a puerto ${port}`)
})
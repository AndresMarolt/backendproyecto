/* const express = require('express');
const rutas = require('./routes/index')
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(`${__dirname}/public`))

app.use('/', rutas)

app.listen(port, err => {
    if(err) {
        console.log(`Se produjo un error al iniciar el servidor: ${err}`);
    } else {
        console.log(`El servidor está escuchando el puerto ${port}`);
    }
}) */


// ====================================================================================================================================


const express = require('express');
const app = express();
const port = 8080;
const rutas = require('./routes/index')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(`${__dirname}/public`));

app.use('/api/productos', rutas);

app.listen(port, (err) => {
    if(err) {
        console.log(`Se producto un error al iniciar el servidor: ${err}`);
    } else {
        console.log(`Servidor escuchando al puerto ${port}`);
    }
})
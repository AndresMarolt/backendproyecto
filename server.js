const express = require('express');
const app = express();
const port = 8080;
const rutas = require('./routes')

app.listen(port, err => {
    if(err) {
        console.log(`Se produjo un error al iniciar el servidor: ${err}`);
    } else {
        console.log(`El servidor está escuchando el puerto ${port}`);
    }
})
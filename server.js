import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import rutas from './src/routes/index.js'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/', rutas);
app.get('*', (req, res) => {
    res.status(404).send({error: 404, descripcion: 'Ruta inexistente'});
  });

app.listen(port, (err) => {
    if(err) {
        console.log(`Error: ${err}`);
    } else {
        console.log(`Server listening to port ${port}`)
    }
})
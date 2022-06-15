const {Router} = require('express');
const router = Router();

const productos = [];

router.get('/', (req, res) => {                             // DEVUELVE TODOS LOS PRODUCTOS
    res.json(productos);
});

router.get('/:id', (req, res) => {                         // DEVUELVE UN PRODUCTO SEGUN SU id
    let id = Number(req.params.id);
    let prodBuscado = productos.find(prod => {
        return prod.id === id;
    })

    prodBuscado ?
        res.json(prodBuscado)
    :
        res.status(404).send({error: 'Producto no encontrado'})
    
});

router.post('/', (req, res) => {                            // RECIBE Y AGREGA UN PRODUCTO, Y LO DEVUELVE CON SU id ASIGNADO
    const {title, price, thumbnail} = req.body;
    let id = productos.length + 1;
    productos.push({id, title, price, thumbnail});
    res.sendStatus(201);
});

router.put('/:id', (req, res) => {                         // RECIBE Y ACTUALIZA UN PRODUCTO SEGUN SU id
    let id = Number(req.params.id);
    let aModificar = productos.find(prod => {
        return prod.id === id;
    })

    if(aModificar) {
        const {title, price, thumbnail} = req.body;
        aModificar.title = title;
        aModificar.price = price;
        aModificar.thumbnail = thumbnail;
        res.sendStatus(201);
    } else {
        res.status(404).send({error: 'Producto no encontrado'})
    }
});

router.delete('/:id', (req, res) => {                      // ELIMINA UN PRODUCTO SEGUN SU id
    let id = Number(req.params.id);
    let aEliminar = productos.find(prod => {
        return prod.id === id;
    })

    if(aEliminar) {
        const index = productos.indexOf(aEliminar);
        if(index > -1) {
            productos.splice(index, 1);
            res.sendStatus(200);
        }
    } else {
        res.status(404).send({error: 'Producto no encontrado'})

    }
});


module.exports = router;
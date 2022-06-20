const {Router} = require('express');
const router = Router();

const productos = [
    {
        title: 'Lápiz',
        thumbnail: 'https://img.freepik.com/vector-gratis/lapiz_24908-54630.jpg?w=2000',
        price: 125
    },
    {
        title: 'Regla',
        thumbnail: 'https://i0.wp.com/humorenpublico.com/wp-content/uploads/2017/09/ruler-1023726_1280.png?resize=525%2C175',
        price: 108
    },
    {
        title: 'Sacapuntas',
        thumbnail: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/407/537/products/183100_10_pm11-35ef3f983044908c9915156786072638-640-0.jpg',
        price: 86
    }

] 

router.get('/', (req, res) => {
    res.render('datos', { name: 'Andrés', surname: 'Marolt', age: 27, email: 'andresmmarolt@gmail.com', cel: 1138940402})
})

router.get('/products/:id', (req, res) => {
    const indice = req.params.id;

    res.render('product', productos[indice]);
})

module.exports = router;
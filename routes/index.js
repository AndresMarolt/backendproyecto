const {Router} = require('express');
const router = Router();
const champs = [
    {
        name: 'salva',
        surName: 'perez'
    },
    {
        name: 'pepe',
        surName: 'perez'
    },
    {
        name: 'jose',
        surName: 'perez'
    }
]

router.get('/', (req, res) => {
    res.render('champs', { champs, hasAny: true})
})

module.exports = router;
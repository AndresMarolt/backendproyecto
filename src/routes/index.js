const { Router } = require('express');
const router = Router();
const { getPersonas, postPersonas } = require('../controllers/personasControllers')

router.get('/personas', getPersonas);
router.post('/personas', postPersonas);

module.exports = router;
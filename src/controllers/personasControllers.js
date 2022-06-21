const personas = [];

const getPersonas = (req, res) => {
    res.render('personas.ejs', { personas })
}

const postPersonas = (req, res) => {
    personas.push(req.body.nombre);
    res.redirect('/personas')
}

module.exports = {
    getPersonas,
    postPersonas
}
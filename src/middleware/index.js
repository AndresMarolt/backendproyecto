

const adminMiddleware = (req, res, next) => {
    const rol = true;
    if(rol) {
        next();
    } else {
        res.status(403).json({error: 403, descripcion: 'No puede acceder a esta ruta sin ser admin'});
    }
}


export default adminMiddleware;
const helpers = {};
//creo la funcion isAutenticated para poder mantener las siones en otras pestañas
//y asi poder reutilizarla cada vez que la requiera y proteger las rutas
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');//si no esta logueado, mandara a la pestaña de logueo
}

module.exports = helpers;//exporto helpers
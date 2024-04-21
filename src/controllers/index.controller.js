//controladores de la pagina
const indexCtrl = {};
const passport = require('passport');
const User= require('../models/User');

indexCtrl.renderIndex =(req, res) =>{
    res.render('index');
};

//-------------------------------
//muestra el iniciar sesion
indexCtrl.rendersignin =(req, res) =>{
    res.render('signin');
};
//accion iniciar sesion
indexCtrl.signinaction = passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect:'user/navigationuser'
})
//------------------------------

//------------------------------
//muestra el registro
indexCtrl.rendersignup =(req, res) =>{
    res.render('signup');
};
//accion de registrar usuario
indexCtrl.signupaction= async (req, res) =>{
    const {name, lastname, email, password, rut} = req.body;
    // Crear un nuevo usuario con el campo "scope" establecido en "basic user"
    const newbUser = new User({
        name: name,
        lastname: lastname,
        password: password,
        rut: rut,
        email: email,
        scope: 'user' // Valor predeterminado para el campo "scope"
    });

    // Guardar el nuevo usuario en la base de datos
    await newbUser.save();
    res.redirect('signup');
};   
//------------------------------

//------------------------------
//muestra el cierre de sesion
//accion sign out
indexCtrl.signoutaction=(req, res) =>{
    req.logout( (err) => {

        if (err) { return next(err); }
        res.redirect( "/" );

    });
}
//------------------------------

module.exports = indexCtrl;
//login con passport
const passport = require('passport');
/*
ocupo strategy en esta parte para asi autenticar de manera local con passport
*/ 
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');//exporto el modelo de usuario para asi obtener sus campos y funciones

passport.use(new LocalStrategy({
    usernameField:'rut',//declaro como "rut" el username para que compare y use en los filtros de login
    passwordField:'password'
}, async (rut, password, done) => {
    const users = await User.findOne({rut: rut});//se compara el rut ingresado con uno de la bd para poder continuar con los filtros
    if (!users){
        return done(null, false, console.log('rut equivocado'));//si no hay o se equivoco de rut dara este error
    } else {
        const found = await users.matchPassword(password);
        /* comparo la variable users con matchPassword para asi
            poder hacer un filtro de de contraseñas, donde una vez filtrada 
            la guardo en la variable found para asi obtener los datos
            si esta bien la contraseña ingresada, esta sera true y si esta mal
            ingresada dara false, de esta manera pasara al condicional (match)
            y asi podra dar incapie al ultimo filtro.
        */
        console.log(found);
        console.log(users);
        if (found){
            return done(null, users, console.log('success'));
            /*
                si la es true, osea si todo esta bien, devolvera usuario
            */
        } else {
            /*
                si es false, simplemente dara el mensaje de error y no devolvera nada
            */
            return done(null, false, console.log('incorrect password'));
        };

    };
}));
/* aqui serializare el usuario identificado, al tener users y done(la cual
    es un callback, se llamara solo y cuando la serializacion este completa ) */
passport.serializeUser((users, done) => {
    done(null, users.id);
    /*
        done se presentara cuando la serializacion sea exitosa, null significa
        que no hubo error alguno
    */
});
/*aqui deserializamos al usuario a partir del id almacenado en la sesion,
 User.findbid(id)  me buscara el usuario, si existe me retornara al usuario sin fallas,
 si no me retornara error*/
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

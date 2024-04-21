//modelo de usuario
const {Schema, model} = require('mongoose');
const md5 =require('md5') //tipo de encriptado

//modelo del usuario
const UserSchema=new Schema({
    name:{
        type: String,
        required:true
    } ,
    lastname: String,
    scope: String,
    rut:{
        type: String,
        required:true
    } ,
    email: String,
    password:{
        type: String,
        required:true
    } 
});
UserSchema.methods.encryptthePassword = function (password) {
    return md5(password); // Aquí se usa MD5 para hashear la contraseña
};

UserSchema.methods.matchPassword = function (password) {
    console.log('encriptado: ', this.password, md5(password))
    return md5(this.password) === md5(password); // Comparación directa de las contraseñas hasheadas con MD5
};

module.exports = model('User', UserSchema, 'Users');


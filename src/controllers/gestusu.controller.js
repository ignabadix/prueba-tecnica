const geusuContr = {};
const User= require('../models/User');
//agregar
//accion de agregar
geusuContr.renderUseradd= async (req, res) =>{
    const { name, lastname, scope, rut, email, password } = req.body;//aqui extraigo los datos del formulario, para si poder guardarlos en la bd
    
    const addnewUser =new User({ 
        name: name, 
        lastname: lastname,
        scope: scope,
        rut: rut,
        email: email,
        password: password,
        scope: 'user'
    });
    await addnewUser.save();
    res.redirect('/user/listuser');//con esto puedo cargar todo automaticamente en el listado(en verdad redirecciono alla pero ahi me entiendo yo)
};
//mostrar registro de agregar
geusuContr.renderUseraddform= (req, res) =>{
    res.render('user/newuser');
};
//listar/eliminar
geusuContr.renderUserList = async (req, res) =>{
   const allusers = await User.find({}).lean();//si alguna vez no me funciona el {{nombre de campo}} en hbs, aqui en vez de modelo.find() solamente, agrega tambien modelo.find({}).lean
   res.render('user/allusersdb', { allusers });
   console.log(allusers);
};
geusuContr.renderUserdel = async (req, res) =>{
    await User.findByIdAndDelete(req.params.id);

    res.redirect('/user/listuser');
};
//editar/actualizar
geusuContr.renderUseredit = async (req, res) =>{//cargar el formulario para editar
    const editheuser = await User.findById(req.params.id).lean();
    res.render('user/edituser', {editheuser});
};
geusuContr.updateUser = async (req, res) =>{
    const { name, lastname, rut, scope, email, password } = req.body;
    await User.findByIdAndUpdate(req.params.id, {name:name,
        lastname:lastname,rut:rut,scope:scope,email:email,password:password})
    res.redirect('/user/listuser')
};

//cargar opciones
geusuContr.renderoptionsUser= (req, res) =>{
    res.render('user/navigationuser');
};

module.exports = geusuContr;
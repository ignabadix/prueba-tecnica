const { Router } = require('express');

const router = Router()
//importo validate para poder mantener las sesiones
const {isAuthenticated} =require('../helpers/validate');

const { renderUserList, renderUseradd, renderUseredit,
     renderUserdel, updateUser,renderUseraddform,renderoptionsUser
 } = require('../controllers/gestusu.controller');

 //colocando isAuthenticated en donde se muestra las informaciones, se podra mantener las sesiones
//cargar opciones
router.get('/user/navigationuser', isAuthenticated, renderoptionsUser);//menu de acciones
//editar/actualizar usuario
router.get('/user/edituser/:id', isAuthenticated, renderUseredit);//formulario de 
router.put('/user/edituser/:id', updateUser);
//agregar usuario
router.post('/user/adduser', isAuthenticated, renderUseradd);//accion de registrar
router.get('/user/newuser', renderUseraddform);//muestra el formulario de nuevo registro
//listar y/o eliminar usuario
router.get('/user/listuser', isAuthenticated, renderUserList);//muestra el listado de usuario
router.delete('/user/delete/:id', renderUserdel);


module.exports = router; 
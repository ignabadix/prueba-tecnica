const { Router } = require('express');
const router = Router();
const {isAuthenticated} =require('../helpers/validate');
const { renderIndex, rendersignup,rendersignin
    ,signupaction,signinaction,signoutaction } = require('../controllers/index.controller')
//inicio de la app
router.get('/', renderIndex);
//inicio,registro y cerrar sesion
//login
router.get('/signin',rendersignin);
router.post('/signin',signinaction);
//register action register
router.get('/signup', rendersignup);
router.post('/signup', signupaction);
//---------------------------
//salir sesion
router.get('/signout', isAuthenticated, signoutaction);

module.exports = router;
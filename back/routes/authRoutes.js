const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validarMiddlewares');

router.post('/login',
    [
        check('email', 'Introduzca un email valido').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        validarCampos
    ], 
    controlador.login);

module.exports = router;
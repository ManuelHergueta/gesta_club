const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/usuarioController');
const midsJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarMiddlewares');

router.get('/', [midsJWT.validarJWT], controlador.usuariosGet);

router.get('/:email', [midsJWT.validarJWT], controlador.usuarioGet);

router.post('/', 
    [
        check('email', 'Introduzca un email valido').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        validarCampos
    ], 
    controlador.usuarioPost);

router.put('/:email?', 
    [
        midsJWT.validarJWT,
        check('email', 'Introduzca un email valido').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        validarCampos
    ], 
    controlador.usuarioPut);
    
router.delete('/:email', [midsJWT.validarJWT], controlador.usuarioDelete);

//Ruta para comprobar si existe email en la bd:
router.get('/existeEmail/:email', controlador.existeEmail);

//Ruta para modificar la contraseña
router.post('/cambioContra', controlador.modificarContra);


module.exports = router;
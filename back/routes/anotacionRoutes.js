const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/anotacionController');
const midsJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarMiddlewares');

//Estadistica los tres mejores jugadores absolutos
router.get('/topJugadores', [midsJWT.validarJWT], controlador.mostrarTopJugadores);

//Estadistica los tres mejores jugadores de un partido
router.get('/topJugadores/:id_partido', [midsJWT.validarJWT], controlador.mostrarTopJugadoresXPartido);

//Crear anotaciones
router.post('/',
    [
        check('id_partido','El id de partido es numerico y obligatorio').notEmpty().isInt(),
        check('id_jugada','El id de jugada es numerica y obligatoria').notEmpty().isInt(),
        validarCampos,
        midsJWT.validarJWT
    ],
    controlador.crearAnotaciones);



module.exports = router;
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/alineacionController');
const midsJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarMiddlewares');

router.get('/:id_partido', [midsJWT.validarJWT], controlador.alineacionesGet);
router.post('/', 
    [
        //Uso * para aplicar las validaciones a cada elemento del array
        check('*.id_partido','El id de partido es numerico y obligatorio').notEmpty().isInt(),
        check('*.dni_deportista', 'El dni del deportista es obligatorio').notEmpty(),
        validarCampos,
        midsJWT.validarJWT
    ],
    controlador.alineacionPost);
router.delete('/:id_partido/:dni_deportista', [midsJWT.validarJWT], controlador.alineacionDelete);

module.exports = router;
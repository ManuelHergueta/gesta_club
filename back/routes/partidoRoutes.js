const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/partidoController');
const midsJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarMiddlewares');

router.get('/', [midsJWT.validarJWT], controlador.partidosGet);

router.get('/:id', [midsJWT.validarJWT], controlador.partidoGet);

router.post('/',
    [
        check('categoria_id','Id de categoria obligatorio y entero').notEmpty().isInt(),
        check('fecha_partido','Fecha del partido obligatoria').notEmpty().isDate(),
        validarCampos,
        midsJWT.validarJWT
    ],
    controlador.partidoPost);

router.put('/:id', [midsJWT.validarJWT], controlador.partidoPut);

router.delete('/:id', [midsJWT.validarJWT], controlador.partidoDelete);

module.exports = router;
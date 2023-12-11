const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/partidoController');
const midsJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarMiddlewares');

//Listar partidos
router.get('/', [midsJWT.validarJWT], controlador.partidosGet);

//Listar partidos incluyendo nombre categoria
router.get('/categoria', [midsJWT.validarJWT], controlador.partidosGetConCategoria)

//Listar partido con una id
router.get('/:id', [midsJWT.validarJWT], controlador.partidoGet);

//Crear partido
router.post('/',
    [
        check('categoria_id','Id de categoria obligatorio y entero').notEmpty().isInt(),
        check('fecha_partido','Fecha del partido obligatoria').notEmpty().isDate(),
        validarCampos,
        midsJWT.validarJWT
    ],
    controlador.partidoPost);

//Modificar un partido
router.put('/:id', [midsJWT.validarJWT], controlador.partidoPut);

//Borrar un partido
router.delete('/:id', [midsJWT.validarJWT], controlador.partidoDelete);

module.exports = router;
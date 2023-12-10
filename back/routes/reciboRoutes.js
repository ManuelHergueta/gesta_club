const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/reciboController');
const midsJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarMiddlewares');

//Todos los recibos
router.get('/', [midsJWT.validarJWT], controlador.recibosGet);

//Un solo recibo por su id
router.get('/:id', [midsJWT.validarJWT], controlador.reciboGet);

//Reenviar recibo por email.
router.get('/email/:id', [midsJWT.validarJWT], controlador.reenviarReciboGet);

//Ruta para multiples peticiones
router.get('/multiple/:peticion/:valor', [midsJWT.validarJWT] ,controlador.recibosPorPeticionGet);

router.post('/',
    [
        check('id_cuota', 'El id_cuota es numérico y obligatorio').notEmpty().isInt(),
        check('dni_deportista', 'El dni_deportista es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio y con formato correcto').notEmpty().isEmail(),
        check('nombre_completo','El nombre completo es obligatorio').notEmpty(),
        check('fecha_pago','La fecha de pago no puede estar vacia').notEmpty(),
        check('temporada','La temporada es numérico y obligatorio').notEmpty().isInt(),
        check('mes','El mes es obligatorio').notEmpty(),
        check('importe','El importe es numérico y obligatorio').notEmpty().isInt(),
        check('tipo_pago','El tipo de pago es obligatorio').notEmpty(),
        validarCampos,
        midsJWT.validarJWT,
    ],
    controlador.reciboPost);

module.exports = router;
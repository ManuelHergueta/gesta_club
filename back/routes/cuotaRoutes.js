const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const controlador = require('../controllers/cuotaController');
const { validarCampos } = require('../middlewares/validarMiddlewares');
const midsJWT = require('../middlewares/validarJWT');

//Todas las cuotas:
router.get('/', [midsJWT.validarJWT],controlador.cuotasGet);

//Todas las cuotas incluyendo nombre y apellidos del deportista.
router.get('/nombre', [midsJWT.validarJWT], controlador.cuotasGetConNombre);

//Cuotas de un dni:
router.get('/dni/:dni', [midsJWT.validarJWT], controlador.cuotasPorDniGet);

//Detalle de una cuota
router.get('/:id', [midsJWT.validarJWT], controlador.cuotaGet);

//Actualizar una cuota
router.put('/:id', 
    [
        check('id', 'El id de cuota es numérico y obligatorio').notEmpty().isInt(),
        check('dni_deportista', 'El dni del deportista es obligatorio').notEmpty(),
        check('temporada', 'El dato temporada es numerico y obligatorio').notEmpty().isInt(),
        check('mes', 'El mes es obligatorio').notEmpty(),
        check('importe', 'El importe es numérico y obligatorio').notEmpty().isInt(),
        check('estado', "El estado tiene que ser 'pagada' o 'pendiente'").notEmpty().isIn(['pagada','pendiente']),
        check('tipo_pago', 'El tipo de pago puede ser').optional().isIn(['efectivo','tarjeta','transferencia']),
        validarCampos, 
        midsJWT.validarJWT
    ],
    controlador.cuotaPut);



module.exports = router;
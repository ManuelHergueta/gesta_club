const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/reclamacionController');
const midsJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../middlewares/validarMiddlewares');


//Listar todas las reclamaciones
router.get('/', [midsJWT.validarJWT], controlador.reclamacionesGet);

//Crear reclamacion y envio por email
router.post('/', 
[
    check('id_cuota', 'El id de la cuota es obligatorio y numerico').notEmpty().isInt(),
    check('dni_deportista', 'El dni es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellidos', 'Campo apellidos es obligatorio').notEmpty(),
    check('mes', 'El mes es obligatorio').notEmpty(),
    check('temporada', 'La temporada es obligatoria y numerica').notEmpty().isInt(),
    validarCampos,
    midsJWT.validarJWT
], controlador.reclamacionPost); 

module.exports = router;
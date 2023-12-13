const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/jugadaController');
const midsJWT = require('../middlewares/validarJWT');

//Todas las jugadas
router.get('/', [midsJWT.validarJWT], controlador.jugadasGet);


module.exports = router;
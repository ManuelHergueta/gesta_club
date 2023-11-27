const { Router } = require('express');
const router = Router();

const controlador = require('../controllers/cuotaController');
const midsJWT = require('../middlewares/validarJWT');

router.get('/', [midsJWT.validarJWT],controlador.cuotasGet);

module.exports = router;
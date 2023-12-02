const { Router } = require('express');
const router = Router();

const controlador = require('../controllers/cuotaController');
const midsJWT = require('../middlewares/validarJWT');

router.get('/', [midsJWT.validarJWT],controlador.cuotasGet);

router.get('/:id', [midsJWT.validarJWT], controlador.cuotaGet);



module.exports = router;
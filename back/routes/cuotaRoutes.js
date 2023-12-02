const { Router } = require('express');
const router = Router();

const controlador = require('../controllers/cuotaController');
const midsJWT = require('../middlewares/validarJWT');

//Todas las cuotas:
router.get('/', [midsJWT.validarJWT],controlador.cuotasGet);

//Cuotas de un dni:
router.get('/dni/:dni', [midsJWT.validarJWT], controlador.cuotasPorDniGet);

//Detalle de una cuota
router.get('/:id', [midsJWT.validarJWT], controlador.cuotaGet);



module.exports = router;
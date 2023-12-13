const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/deportistaController');
const midsJWT = require('../middlewares/validarJWT');

//TO-DO
//Falta aplicar middlewares y validators

router.get('/', [midsJWT.validarJWT], controlador.deportistasGet);
router.get('/precio/:dni', controlador.deportistaConPrecioGet);
router.get('/:dni', controlador.deportistaGet);
router.post('/', controlador.deportistaPost);
router.put('/:dni?', controlador.deportistaPut);
router.delete('/:dni', controlador.deportistaDelete);

module.exports = router;
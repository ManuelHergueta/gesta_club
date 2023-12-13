const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const controlador = require('../controllers/categoriaController');
const midsJWT = require('../middlewares/validarJWT');

//Todas las cuotas
router.get('/', [midsJWT.validarJWT], controlador.categoriasGet);


module.exports = router;
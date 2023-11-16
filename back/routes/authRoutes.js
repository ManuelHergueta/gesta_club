const { Router } = require('express');
const controlador = require('../controllers/authController');
const router = Router();

router.post('/login',controlador.login);

module.exports = router;
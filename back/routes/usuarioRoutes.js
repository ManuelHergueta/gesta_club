const { Router } = require('express');
const controlador = require('../controllers/usuarioController');
const router = Router();


router.get('/', controlador.usuariosGet);
router.get('/:email', controlador.usuarioGet);
router.post('/', controlador.usuarioPost);
router.put('/:email?', controlador.usuarioPut);
router.delete('/:email', controlador.usuarioDelete);

//Ruta para comprobar si existe email en la bd:
router.get('/existeEmail/:email', controlador.existeEmail);

//Ruta para modificar la contraseña
router.post('/cambioContra', controlador.modificarContra);


module.exports = router;
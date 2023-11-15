const { Router } = require('express');
const controlador = require('../controllers/usuarioController');
const router = Router();


router.get('/', controlador.usuariosGet);
router.get('/:email', controlador.usuarioGet);
router.post('/', controlador.usuarioPost);
router.put('/:email?', controlador.usuarioPut);
router.delete('/:email', controlador.usuarioDelete);



module.exports = router;
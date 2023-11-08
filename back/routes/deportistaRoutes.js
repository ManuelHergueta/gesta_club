const { Router } = require('express');
const controlador = require('../controllers/deportistaController');
const router = Router();


router.get('/', controlador.deportistasGet);
router.get('/:dni', controlador.deportistaGet);
router.post('/', controlador.deportistaPost);
router.put('/:dni?', controlador.deportistaPut);
router.delete('/:dni', controlador.deportistaDelete);



module.exports = router;
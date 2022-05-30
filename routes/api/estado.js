const {
    Router
} = require('express');
const {
    obtenerEstados,
    obtenerEstadoId,
    crearEstado,
    actualizarEstado,
    borrarEstado
} = require('../../controllers/estadoController');
const {
    validationInsert,
    validationUpdate
} = require('../../controllers/validator/estadoValidator');
const {
    validateToken
} = require('../../middlewares/verifyToken');

const router = Router();

router.get('/', validateToken, obtenerEstados);

router.get('/:id', validateToken,obtenerEstadoId);

module.exports = router;
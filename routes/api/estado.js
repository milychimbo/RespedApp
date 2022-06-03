const {
    Router
} = require('express');
const {
    obtenerEstados,
    obtenerEstadoId,
    crearEstado,
    actualizarEstado,
    borrarEstado
} = require('../../LogicLayer/estadoController');
const {
    validationInsert,
    validationUpdate
} = require('../../LogicLayer/validator/estadoValidator');
const {
    validateToken
} = require('../../middlewares/verifyToken');

const router = Router();

router.get('/', validateToken, obtenerEstados);

router.get('/:id', validateToken,obtenerEstadoId);

module.exports = router;
const {Router} =require('express');
const { crearReserva, obtenerUsuarioReserva, obtenerReservas, actualizarReserva, borrarReserva, obtenerReservasPorEstado } = require('../../LogicLayer/reservaController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/reservaValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken, obtenerReservas);

 router.get('/:id', validateToken,obtenerReservasPorEstado);

 router.post('/',validateToken,validationInsert, crearReserva);

 router.put('/',validateToken, validationUpdate, actualizarReserva);

 router.delete('/:id', validateToken,borrarReserva);

module.exports=router;
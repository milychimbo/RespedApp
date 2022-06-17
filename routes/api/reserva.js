const {Router} =require('express');
const { crearReserva, obtenerReservasUsuario,obtenerReservas, actualizarReserva, borrarReserva, obtenerReservasPorEstado } = require('../../LogicLayer/reservaController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/reservaValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken, obtenerReservas);

 router.get('/estado/:id', validateToken,obtenerReservasPorEstado);

 router.get('/usuario/', validateToken,obtenerReservasUsuario);

 router.post('/',validateToken,validationInsert, crearReserva);

 router.put('/',validateToken, validationUpdate, actualizarReserva);

 router.delete('/:id', validateToken,borrarReserva);

module.exports=router;
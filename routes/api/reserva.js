const {Router} =require('express');
const { crearReserva, obtenerUsuarioReserva,obtenerReservaID, obtenerReservas, actualizarReserva, borrarReserva } = require('../../LogicLayer/reservaController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/reservaValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken, obtenerReservas);

 router.get('/:id', validateToken,obtenerReservaID);
 
router.get('/usuario/:id',validateToken, obtenerUsuarioReserva);

 router.post('/',validateToken,validationInsert, crearReserva);

 router.put('/',validateToken, validationUpdate, actualizarReserva);

 router.delete('/:id', validateToken,borrarReserva);

module.exports=router;
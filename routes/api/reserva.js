const {Router} =require('express');
const { crearReserva, obtenerReservaID, obtenerReservas, actualizarReserva, borrarReserva } = require('../../controllers/reservaController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/reservaValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken, obtenerReservas);

 router.get('/:id', validateToken,obtenerReservaID);

 router.post('/',validateToken,validationInsert, crearReserva);

 router.put('/',validateToken, validationUpdate, actualizarReserva);

 router.delete('/:id', validateToken,borrarReserva);

module.exports=router;
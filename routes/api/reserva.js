const {Router} =require('express');
const { crearReserva, obtenerReservaID, obtenerReservas, actualizarReserva, borrarReserva } = require('../../controllers/reservaController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/reservaValidator');

const router = Router();

 router.get('/', obtenerReservas);

 router.get('/:id', obtenerReservaID);

 router.post('/',validationInsert, crearReserva);

 router.put('/', validationUpdate, actualizarReserva);

 router.delete('/:id', borrarReserva);

module.exports=router;
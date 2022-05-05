const {Router} =require('express');
const { crearReserva, obtenerReservaID, obtenerReservas, actualizarReserva, borrarReserva } = require('../../controllers/reservaController');

const router = Router();

 router.get('/', obtenerReservas);

 router.get('/:id', obtenerReservaID);

 router.post('/', crearReserva);

 router.put('/', actualizarReserva);

 router.delete('/:id', borrarReserva);

module.exports=router;
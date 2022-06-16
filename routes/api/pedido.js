const {Router} =require('express');
const { obtenerPedidosLocales,obtenerPedidosDomicilio,obtenerPedidoLocalID,crearPedidoLocal,crearPedido, obtenerPedidos, crearPedidoDomicilio ,borrarPedido, crearPedidoReserva, obtenerPedidosReserva} = require('../../LogicLayer/pedidoController');
const { validationInsertLocal } = require('../../LogicLayer/validator/pedidoLocalValidator');
const { validationInsertDomicilio } = require('../../LogicLayer/validator/pedidoDomicilioValidator');
const { validateToken } = require('../../middlewares/verifyToken');
const { validationInsertReserva } = require('../../LogicLayer/validator/pedidoReservaValidator');

const router = Router();

 router.get('/', validateToken,obtenerPedidos);
 router.get('/local/', validateToken,obtenerPedidosLocales);
 router.get('/domicilio/', validateToken,obtenerPedidosDomicilio);
 router.get('/reserva/', validateToken,obtenerPedidosReserva);

// router.get('/:id',validateToken, obtenerPedidoLocalID);

 //router.post('/', validateToken, crearPedidoLocal);

 router.post('/', validateToken, crearPedido);

 router.post('/local/', validateToken, validationInsertLocal,crearPedidoLocal);
 router.post('/domicilio/', validateToken, validationInsertDomicilio,crearPedidoDomicilio);
 router.post('/reserva/', validateToken, validationInsertReserva,crearPedidoReserva);

 router.delete('/:id', validateToken,borrarPedido);

module.exports=router;
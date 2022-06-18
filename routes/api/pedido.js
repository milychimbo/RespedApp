const {Router} =require('express');
const { obtenerPedidosLocales,obtenerPedidosDomicilio,obtenerPedidosUsuarioDomicilio,crearPedidoLocal,crearPedido, obtenerPedidos, crearPedidoDomicilio ,borrarPedido, crearPedidoReserva, obtenerPedidosReserva, actualizarPedido, obtenerPedidosLocalUsuario, obtenerPedidosUsuarioReserva} = require('../../LogicLayer/pedidoController');
const { validationUpdate } = require('../../LogicLayer/validator/pedidoValidator');
const { validationInsertLocal } = require('../../LogicLayer/validator/pedidoLocalValidator');
const { validationInsertDomicilio } = require('../../LogicLayer/validator/pedidoDomicilioValidator');
const { validateToken } = require('../../middlewares/verifyToken');
const { validationInsertReserva } = require('../../LogicLayer/validator/pedidoReservaValidator');

const router = Router();

 router.get('/', validateToken,obtenerPedidos);
 router.get('/local/', validateToken,obtenerPedidosLocales);
 router.get('/domicilio/', validateToken,obtenerPedidosDomicilio);
 router.get('/reserva/', validateToken,obtenerPedidosReserva);
 router.get('/usuario/local/', validateToken,obtenerPedidosLocalUsuario);
 router.get('/usuario/domicilio/', validateToken,obtenerPedidosUsuarioDomicilio);
 router.get('/usuario/reserva/', validateToken,obtenerPedidosUsuarioReserva);


// router.get('/:id',validateToken, obtenerPedidoLocalID);

 //router.post('/', validateToken, crearPedidoLocal);

 router.post('/', validateToken, crearPedido);

 router.post('/local/', validateToken, validationInsertLocal,crearPedidoLocal);
 router.post('/domicilio/', validateToken, validationInsertDomicilio,crearPedidoDomicilio);
 router.post('/reserva/', validateToken, validationInsertReserva,crearPedidoReserva);
 router.put('/', validateToken, validationUpdate,actualizarPedido);
 router.delete('/:id', validateToken,borrarPedido);

module.exports=router;
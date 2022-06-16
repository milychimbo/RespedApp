const {Router} =require('express');
const { obtenerPedidosLocales,obtenerPedidosDomicilio,obtenerPedidoLocalID,crearPedidoLocal,crearPedido, obtenerPedidos, crearPedidoDomicilio } = require('../../LogicLayer/pedidoController');
const { validationInsertLocal } = require('../../LogicLayer/validator/pedidoLocalValidator');
const { validationInsertDomicilio } = require('../../LogicLayer/validator/pedidoDomicilioValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/', validateToken,obtenerPedidos);
 router.get('/local/', validateToken,obtenerPedidosLocales);
 router.get('/domicilio/', validateToken,obtenerPedidosDomicilio);

// router.get('/:id',validateToken, obtenerPedidoLocalID);

 //router.post('/', validateToken, crearPedidoLocal);

 router.post('/', validateToken, crearPedido);

 router.post('/local/', validateToken, validationInsertLocal,crearPedidoLocal);
 router.post('/domicilio/', validateToken, validationInsertDomicilio,crearPedidoDomicilio);
/*
 router.put('/',validateToken, validationUpdate, actualizarPedido);

 router.delete('/:id', validateToken,borrarPedido);*/

module.exports=router;
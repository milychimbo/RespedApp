const {Router} =require('express');
const { obtenerPedidosLocales,obtenerPedidoLocalID,crearPedidoLocal,crearPedido, obtenerPedidos } = require('../../LogicLayer/pedidoController');
const { validationInsert } = require('../../LogicLayer/validator/pedidoLocalValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/', validateToken,obtenerPedidos);
 router.get('/local/', validateToken,obtenerPedidosLocales);

 router.get('/:id',validateToken, obtenerPedidoLocalID);

 //router.post('/', validateToken, crearPedidoLocal);

 router.post('/', validateToken, crearPedido);

 router.post('/local/', validateToken, validationInsert,crearPedidoLocal);
/*
 router.put('/',validateToken, validationUpdate, actualizarPedido);

 router.delete('/:id', validateToken,borrarPedido);*/

module.exports=router;
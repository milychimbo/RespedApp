const {Router} =require('express');
const { obtenerPedidosLocales,obtenerPedidoLocalID,crearPedidoLocal } = require('../../LogicLayer/pedidoController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/pedidoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/', validateToken,obtenerPedidosLocales);

 router.get('/:id',validateToken, obtenerPedidoLocalID);

 router.post('/', validateToken, crearPedidoLocal);
/*
 router.put('/',validateToken, validationUpdate, actualizarPedido);

 router.delete('/:id', validateToken,borrarPedido);*/

module.exports=router;
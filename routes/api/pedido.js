const {Router} =require('express');
const { obtenerPedidos, obtenerPedidoId, crearPedido, actualizarPedido, borrarPedido } = require('../../LogicLayer/pedidoController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/pedidoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/', validateToken,obtenerPedidos);

 router.get('/:id',validateToken, obtenerPedidoId);

 router.post('/', validateToken,validationInsert, crearPedido);

 router.put('/',validateToken, validationUpdate, actualizarPedido);

 router.delete('/:id', validateToken,borrarPedido);

module.exports=router;
const {Router} =require('express');
const { obtenerPedidos, obtenerPedidoId, crearPedido, actualizarPedido, borrarPedido } = require('../../controllers/pedidoController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/reservaValidator');


const router = Router();

 router.get('/', obtenerPedidos);

 router.get('/:id', obtenerPedidoId);

 router.post('/', validationInsert, crearPedido);

 router.put('/', validationUpdate, actualizarPedido);

 router.delete('/:id', borrarPedido);

module.exports=router;
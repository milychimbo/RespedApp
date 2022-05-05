const {Router} =require('express');
const { obtenerPedidos, obtenerPedidoId, crearPedido, actualizarPedido, borrarPedido } = require('../../controllers/pedidoController');

const router = Router();

 router.get('/', obtenerPedidos);

 router.get('/:id', obtenerPedidoId);

 router.post('/', crearPedido);

 router.put('/', actualizarPedido);

 router.delete('/:id', borrarPedido);

module.exports=router;
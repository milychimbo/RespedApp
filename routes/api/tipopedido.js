const {Router} =require('express');
const { obtenerTipoPedidos, obtenerTipoPedidoId, actualizarTipoPedido } = require('../../LogicLayer/tipopedidoController');
const {  validationUpdate } = require('../../LogicLayer/validator/tipopedidoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken,obtenerTipoPedidos);

 router.get('/:id', validateToken,obtenerTipoPedidoId);

 router.put('/',validateToken, validationUpdate, actualizarTipoPedido);

module.exports=router;
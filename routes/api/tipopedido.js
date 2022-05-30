const {Router} =require('express');
const { obtenerTipoPedidos, obtenerTipoPedidoId, actualizarTipoPedido } = require('../../controllers/tipopedidoController');
const {  validationUpdate } = require('../../controllers/validator/tipopedidoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken,obtenerTipoPedidos);

 router.get('/:id', validateToken,obtenerTipoPedidoId);

 router.put('/',validateToken, validationUpdate, actualizarTipoPedido);

module.exports=router;
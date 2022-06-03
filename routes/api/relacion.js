const {Router} =require('express');
const { obtenerPedidosProductos,obtenerPedidoProducto,crearPedidoProducto } = require('../../LogicLayer/relacionpedidoproductoController');
const { validationInsert} = require('../../LogicLayer/validator/relacionpedidoproductoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken,obtenerPedidosProductos);

 router.get('/:id', validateToken,obtenerPedidoProducto);

 router.post('/',validateToken, validationInsert, crearPedidoProducto);
 
module.exports=router;
const {Router} =require('express');
const { obtenerPedidosProductos,obtenerPedidoProducto,crearPedidoProducto } = require('../../controllers/relacionpedidoproductoController');
const { validationInsert} = require('../../controllers/validator/relacionpedidoproductoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken,obtenerPedidosProductos);

 router.get('/:id', validateToken,obtenerPedidoProducto);

 router.post('/',validateToken, validationInsert, crearPedidoProducto);
 
module.exports=router;
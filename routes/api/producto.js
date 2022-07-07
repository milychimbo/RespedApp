const {Router} =require('express');
const { obtenerProductos, crearProducto, actualizarProducto, borrarProducto, obtenerProductosTodo } = require('../../LogicLayer/productoController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/productoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/', obtenerProductos);

 router.get('/todo', obtenerProductosTodo);

 router.post('/',validateToken, validationInsert, crearProducto);

 router.put('/', validateToken,validationUpdate, actualizarProducto);

 router.delete('/:id', validateToken,borrarProducto);

module.exports=router;
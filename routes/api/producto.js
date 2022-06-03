const {Router} =require('express');
const { obtenerMenu, obtenerProductos, obtenerProductoId, crearProducto, actualizarProducto, borrarProducto, obtenerProductoCategoria } = require('../../LogicLayer/productoController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/productoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken, obtenerProductos);

 router.get('/menu/', obtenerMenu);
 router.get('/categoria/:id', obtenerProductoCategoria);

 router.get('/:id',validateToken, obtenerProductoId);

 router.post('/',validateToken, validationInsert, crearProducto);

 router.put('/', validateToken,validationUpdate, actualizarProducto);

 router.delete('/:id', validateToken,borrarProducto);

module.exports=router;
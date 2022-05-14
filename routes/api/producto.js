const {Router} =require('express');
const { obtenerProductosCategoria, obtenerProductos, obtenerProductoId, crearProducto, actualizarProducto, borrarProducto } = require('../../controllers/productoController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/productoValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/', obtenerProductos);

 router.get('/categoria/:id', obtenerProductosCategoria);

 router.get('/:id',validateToken, obtenerProductoId);

 router.post('/',validateToken, validationInsert, crearProducto);

 router.put('/', validateToken,validationUpdate, actualizarProducto);

 router.delete('/:id', validateToken,borrarProducto);

module.exports=router;
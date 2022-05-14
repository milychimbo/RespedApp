const {Router} =require('express');
const { obtenerProductosCategoria, obtenerProductos, obtenerProductoId, crearProducto, actualizarProducto, borrarProducto } = require('../../controllers/productoController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/productoValidator');

const router = Router();

 router.get('/', obtenerProductos);

 router.get('/categoria/:id', obtenerProductosCategoria);

 router.get('/:id', obtenerProductoId);

 router.post('/', validationInsert, crearProducto);

 router.put('/', validationUpdate, actualizarProducto);

 router.delete('/:id', borrarProducto);

module.exports=router;
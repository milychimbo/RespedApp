const {Router} =require('express');
const { obtenerProductosCategoria, obtenerProductos, obtenerProductoId, crearProducto, actualizarProducto, borrarProducto } = require('../../controllers/productoController');

const router = Router();

 router.get('/', obtenerProductos);

 router.get('/categoria/:id', obtenerProductosCategoria);

 router.get('/:id', obtenerProductoId);

 router.post('/', crearProducto);

 router.put('/', actualizarProducto);

 router.delete('/:id', borrarProducto);

module.exports=router;
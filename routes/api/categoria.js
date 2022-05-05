const {Router} =require('express');
const { obtenerCategorias, obtenerCategoriaId, crearCategoria, actualizarCategoria, borrarCategoria } = require('../../controllers/categoriaController');

const router = Router();

 router.get('/', obtenerCategorias);

 router.get('/:id', obtenerCategoriaId);

 router.post('/', crearCategoria);

 router.put('/', actualizarCategoria);

 router.delete('/:id', borrarCategoria);

module.exports=router;
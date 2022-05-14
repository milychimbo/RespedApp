const {Router} =require('express');
const { obtenerCategorias, obtenerCategoriaId, crearCategoria, actualizarCategoria, borrarCategoria } = require('../../controllers/categoriaController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/categoriaValidator');


const router = Router();

 router.get('/', obtenerCategorias);

 router.get('/:id', obtenerCategoriaId);

 router.post('/', validationInsert, crearCategoria);

 router.put('/', validationUpdate, actualizarCategoria);

 router.delete('/:id', borrarCategoria);

module.exports=router;
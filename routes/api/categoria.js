const {Router} =require('express');
const { obtenerCategorias, obtenerCategoriaId, crearCategoria, actualizarCategoria, borrarCategoria } = require('../../controllers/categoriaController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/categoriaValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',obtenerCategorias);

 router.get('/:id', obtenerCategoriaId);

 router.post('/',validateToken, validationInsert, crearCategoria);

 router.put('/',validateToken, validationUpdate, actualizarCategoria);

 router.delete('/:id',validateToken, borrarCategoria);

module.exports=router;
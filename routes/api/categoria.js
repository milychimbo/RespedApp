const {Router} =require('express');
const { obtenerCategorias, crearCategoria, actualizarCategoria, borrarCategoria } = require('../../LogicLayer/categoriaController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/categoriaValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',obtenerCategorias);

 router.post('/',validateToken, validationInsert, crearCategoria);

 router.put('/',validateToken, validationUpdate, actualizarCategoria);

 router.delete('/:id',validateToken, borrarCategoria);

module.exports=router;
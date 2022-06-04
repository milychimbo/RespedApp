const {Router} =require('express');
const { obtenerUsuarios, obtenerUsuarioId, actualizarUsuario, crearUsuario, borrarUsuario } = require('../../LogicLayer/usuarioController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/usuarioValidator');
const { validateToken } = require('../../middlewares/verifyToken');


const router = Router();

 router.get('/',validateToken, obtenerUsuarios);

 router.get('/:id',validateToken, obtenerUsuarioId);

 router.post('/',validateToken, validationInsert, crearUsuario);

 router.put('/',validateToken, validationUpdate, actualizarUsuario);

 router.delete('/:id',validateToken, borrarUsuario);

module.exports=router;
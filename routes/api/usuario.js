const {Router} =require('express');
const { obtenerUsuarios, obtenerUsuarioId, obtenerTipoUsuario,actualizarUsuario, crearUsuario,actualizarTipoUsuario, borrarUsuario } = require('../../LogicLayer/usuarioController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/usuarioValidator');
const { validateToken } = require('../../middlewares/verifyToken');


const router = Router();

 router.get('/',validateToken, obtenerUsuarios);

 router.get('/:id',validateToken, obtenerUsuarioId);

 router.get('/tipo/:id',validateToken, obtenerTipoUsuario);

 router.post('/',validateToken, validationInsert, crearUsuario);

 router.put('/',validateToken, validationUpdate, actualizarUsuario);
 
 router.put('/tipo/',validateToken, actualizarTipoUsuario);

 router.delete('/:id',validateToken, borrarUsuario);

module.exports=router;
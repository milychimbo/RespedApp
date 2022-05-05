const {Router} =require('express');
const { obtenerUsuarios, obtenerUsuarioId, actualizarUsuario, crearUsuario, borrarUsuario } = require('../../controllers/usuarioController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/usuarioValidator');


const router = Router();

 router.get('/', obtenerUsuarios);

 router.get('/:id', obtenerUsuarioId);

 router.post('/',validationInsert, crearUsuario);

 router.put('/', validationUpdate, actualizarUsuario);

 router.delete('/:id', borrarUsuario);

module.exports=router;
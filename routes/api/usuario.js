const {Router} =require('express');
const { obtenerUsuarios, obtenerUsuarioId, actualizarUsuario, crearUsuario, borrarUsuario } = require('../../controllers/usuarioController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/usuarioValidator');
const { validateToken } = require('../../middlewares/verifyToken');


const router = Router();

 router.get('/',obtenerUsuarios);

 router.get('/:id',validateToken, obtenerUsuarioId);

 router.post('/',validateToken, validationInsert, crearUsuario);

 router.put('/',actualizarUsuario);

 router.delete('/:id',validateToken, borrarUsuario);

module.exports=router;
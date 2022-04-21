const {Router} =require('express');
const { obtenerUsuarios, obtenerUsuarioId, actualizarUsuario, crearUsuario, borrarUsuario } = require('../../controllers/usuarioController');


const router = Router();

 router.get('/', obtenerUsuarios);

 router.get('/:id', obtenerUsuarioId);

 router.post('/', crearUsuario);

 router.put('/', actualizarUsuario);

 router.delete('/:id', borrarUsuario);

module.exports=router;
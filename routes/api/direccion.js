const {Router} =require('express');
const { obtenerDirecciones, obtenerDireccionId, crearDireccion, actualizarDireccion, borrarDireccion } = require('../../controllers/direccionController');

const router = Router();

 router.get('/', obtenerDirecciones);

 router.get('/:id', obtenerDireccionId);

 router.post('/', crearDireccion);

 router.put('/', actualizarDireccion);

 router.delete('/:id', borrarDireccion);

module.exports=router;
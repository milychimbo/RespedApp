const {Router} =require('express');
const { obtenerDirecciones, obtenerDireccionId, crearDireccion, actualizarDireccion, borrarDireccion } = require('../../controllers/direccionController');
const { validationInsert, validationUpdate } = require('../../controllers/validator/direccionValidator');


const router = Router();

 router.get('/', obtenerDirecciones);

 router.get('/:id', obtenerDireccionId);

 router.post('/',validationInsert, crearDireccion);

 router.put('/',validationUpdate, actualizarDireccion);

 router.delete('/:id', borrarDireccion);

module.exports=router;
const {Router} =require('express');
const { obtenerDirecciones, obtenerDireccionId, crearDireccion, actualizarDireccion, borrarDireccion } = require('../../LogicLayer/direccionController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/direccionValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken, obtenerDirecciones);

 router.get('/:id', validateToken,obtenerDireccionId);

 router.post('/',validateToken,validationInsert, crearDireccion);

 router.put('/',validateToken,validationUpdate, actualizarDireccion);

 router.delete('/:id', validateToken,borrarDireccion);

module.exports=router;
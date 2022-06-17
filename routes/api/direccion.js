const {Router} =require('express');
const {obtenerUsuarioDireccion,crearDireccion, actualizarDireccion, borrarDireccion, obtenerDireccionId } = require('../../LogicLayer/direccionController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/direccionValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

router.get('/',validateToken, obtenerUsuarioDireccion);

router.get('/:id',validateToken, obtenerDireccionId);

 router.post('/',validateToken, validationInsert,crearDireccion);

 router.put('/',validateToken,validationUpdate, actualizarDireccion);

 router.delete('/:id', validateToken,borrarDireccion);

module.exports=router;
const {Router} =require('express');
const {obtenerUsuarioDireccion,crearDireccion, actualizarDireccion, borrarDireccion } = require('../../LogicLayer/direccionController');
const { validationInsert, validationUpdate } = require('../../LogicLayer/validator/direccionValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

router.get('/:id',validateToken, obtenerUsuarioDireccion);

 router.post('/',validateToken, validationInsert,crearDireccion);

 router.put('/',validateToken,validationUpdate, actualizarDireccion);

 router.delete('/:id', validateToken,borrarDireccion);

module.exports=router;
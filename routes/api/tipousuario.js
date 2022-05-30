const {Router} =require('express');
const { obtenerTipoUsuarios, obtenerTipoUsuarioId } = require('../../controllers/tipousuarioController');

const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/',validateToken,obtenerTipoUsuarios);

 router.get('/:id', validateToken,obtenerTipoUsuarioId);


module.exports=router;
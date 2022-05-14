const {Router} =require('express');
const { obtenerRestauranteID, actualizarRestaurante} = require('../../controllers/restauranteController');
const { validationUpdate } = require('../../controllers/validator/restauranteValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

 router.get('/:id', validateToken, obtenerRestauranteID);

 router.put('/',validateToken,validationUpdate, actualizarRestaurante);

module.exports=router;
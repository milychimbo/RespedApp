const {Router} =require('express');
const { obtenerRestauranteID, actualizarRestaurante} = require('../../controllers/restauranteController');
const { validationUpdate } = require('../../controllers/validator/restauranteValidator');


const router = Router();

 router.get('/:id', obtenerRestauranteID);

 router.put('/',validationUpdate, actualizarRestaurante);

module.exports=router;
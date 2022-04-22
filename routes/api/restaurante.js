const {Router} =require('express');
const { obtenerRestauranteID, actualizarRestaurante} = require('../../controllers/restauranteController');


const router = Router();

 router.get('/:id', obtenerRestauranteID);

 router.put('/', actualizarRestaurante);

module.exports=router;
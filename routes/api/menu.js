const {Router} =require('express');
const { obtenerMenuID, actualizarMenu } = require('../../controllers/menuController');



const router = Router();

 router.get('/:id', obtenerMenuID);

module.exports=router;
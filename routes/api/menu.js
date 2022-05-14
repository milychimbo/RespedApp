const {Router} =require('express');
const { obtenerMenuID, actualizarMenu } = require('../../controllers/menuController');
const { validateToken } = require('../../middlewares/verifyToken');


const router = Router();

 router.get('/:id', obtenerMenuID);

module.exports=router;
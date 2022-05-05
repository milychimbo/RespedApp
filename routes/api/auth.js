const {Router} =require('express');
const {getToken} = require('../../controllers/authController');


const router = Router();

 router.get('/',getToken);

module.exports=router;
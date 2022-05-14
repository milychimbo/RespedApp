const {Router} =require('express');
const {login} = require('../../controllers/authController');
const { validationSearch } = require('../../controllers/validator/authValidator');

const router = Router();

 router.get('/',validationSearch, login);

module.exports=router;
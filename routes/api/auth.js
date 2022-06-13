const {Router} =require('express');
const {login} = require('../../LogicLayer/authController');
const { validationSearch } = require('../../LogicLayer/validator/authValidator');

const router = Router();

 router.get('/',validationSearch, login);

module.exports=router;
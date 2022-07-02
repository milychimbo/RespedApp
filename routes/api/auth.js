const { Router } = require('express');
const { login, validate } = require('../../LogicLayer/authController');
const { validationSearch, validationToken } = require('../../LogicLayer/validator/authValidator');

const router = Router();

router.post('/', validationSearch, login);
router.post('/validate-token',validationToken, validate);

module.exports = router;
const { Router } = require('express');
const { login, validate } = require('../../LogicLayer/authController');
const { validationSearch, validationToken } = require('../../LogicLayer/validator/authValidator');
const { validateToken } = require('../../middlewares/verifyToken');

const router = Router();

router.post('/validate-token', validationToken, validate);
router.post('/', validationSearch, login);

module.exports = router;
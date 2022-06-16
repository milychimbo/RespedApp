const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationUpdate = [
    check('IDPEDIDOTOTAL').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('IDSTATE').optional().isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = {validationUpdate }
const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationUpdate = [
    check('idRestaurante').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('aforoMax').not().isEmpty().isInt().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationUpdate }
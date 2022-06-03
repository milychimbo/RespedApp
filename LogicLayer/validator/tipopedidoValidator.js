const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationUpdate = [
    check('IDTIPOPEDIDO').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('TIPO').optional().isString().withMessage('Debe ser de tipo texto'),
    check('EXTRA').optional().isFloat().withMessage('Debe ser de tipo Double'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = {validationUpdate }
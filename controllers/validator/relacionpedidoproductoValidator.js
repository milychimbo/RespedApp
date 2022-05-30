const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('IDPEDIDO').not().isEmpty().withMessage('No puede ser vacio'),
    check('IDPRODUCTO').not().isEmpty().withMessage('No puede ser vacio'),
    check('PRICE').not().isEmpty().isFloat().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert }
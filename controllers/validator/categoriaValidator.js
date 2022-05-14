const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('name').not().isEmpty().withMessage('No puede ser vacio'),
    check('name').isString().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('idPedido').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('name').optional().isString().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
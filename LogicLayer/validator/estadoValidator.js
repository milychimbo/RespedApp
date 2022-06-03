const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('STATE').not().isEmpty().withMessage('No puede ser vacio'),
    check('STATE').isString().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('IDSTATE').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('STATE').optional().isString().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
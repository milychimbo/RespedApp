const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('NAME').not().isEmpty().withMessage('No puede ser vacio'),
    check('NAME').isString().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('IDCATEGORIA').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('NAME').optional().isString().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
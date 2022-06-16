const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('IDPEDIDOTOTAL').not().isEmpty().isInt().trim().withMessage('No es un valor valido'),
    check('MESA').not().isEmpty().isInt().trim().withMessage('No es un valor valido'),
    check('NOTE').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('NOTE').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];
module.exports = { validationInsert }
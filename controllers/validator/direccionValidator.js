const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('street1').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('street1').optional().isLength({max: 100 }).withMessage('Longitud máxima de 100'),
    check('street2').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('street2').optional().isLength({max: 100 }).withMessage('Longitud máxima de 100'),
    check('reference').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('reference').optional().isLength({max: 200 }).withMessage('Longitud máxima de 200'),
    check('idUsuario').isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('street1').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('street1').optional().isLength({max: 100 }).withMessage('Longitud máxima de 100'),
    check('street2').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('street2').optional().isLength({max: 100 }).withMessage('Longitud máxima de 100'),
    check('reference').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('reference').optional().isLength({max: 200 }).withMessage('Longitud máxima de 200'),
    check('idUsuario').optional().isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('STREET1').isString().trim().withMessage('Debe ser de tipo texto'),
    check('STREET1').isLength({max: 100 }).withMessage('Longitud máxima de 100'),
    check('STREET2').isString().trim().withMessage('Debe ser de tipo texto'),
    check('STREET2').isLength({max: 100 }).withMessage('Longitud máxima de 100'),
    check('REFERENCE').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('REFERENCE').optional().isLength({max: 150 }).withMessage('Longitud máxima de 200'),
    check('NAME').isString().trim().withMessage('Debe ser de tipo texto'),
    check('PHONEDIR').isString().trim().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('STREET1').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('STREET1').optional().isLength({max: 100 }).withMessage('Longitud máxima de 100'),
    check('STREET2').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('STREET2').optional().isLength({max: 100 }).withMessage('Longitud máxima de 100'),
    check('REFERENCE').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('REFERENCE').optional().isLength({max: 200 }).withMessage('Longitud máxima de 200'),
    check('NAME').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('PHONEDIR').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('NAME').not().isEmpty().isString().trim().withMessage('No puede ser vacio'),
    check('DETAIL').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('DETAIL').optional().isLength({max: 200 }).withMessage('Longitud máxima de 200'),
    check('PRICE').not().isEmpty().isFloat().withMessage('No es un valor valido'),
    check('AVAILABILITY').not().isEmpty().isInt({ gt: 0, lt: 3 }).withMessage('Debe ser un valor del 1-2'),
    check('AVAILABILITY').isLength({ min: 1, max: 1 }).withMessage('Longitud de 1'),
    check('IMAGE').optional().isURL().trim().withMessage('Debe ser de tipo URL'),
    check('IDCATEGORIA').isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('IDPRODUCTO').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('IDCATEGORIA').optional().isInt().trim().withMessage('No es un valor valido'),
    check('NAME').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('DETAIL').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('DETAIL').optional().isLength({max: 200 }).withMessage('Longitud máxima de 200'),
    check('PRICE').optional().isFloat().withMessage('No es un valor valido'),
    check('AVAILABILITY').optional().isInt({ gt: 0, lt: 3 }).withMessage('Debe ser un valor del 1-2'),
    check('AVAILABILITY').optional().isLength({ min: 1, max: 1 }).withMessage('Longitud de 1'),
    check('IMAGE').optional().isURL().trim().withMessage('Debe ser de tipo URL'),
    
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
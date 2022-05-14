const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('name').not().isEmpty().isString().trim().withMessage('No puede ser vacio'),
    check('detail').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('detail').optional().isLength({max: 200 }).withMessage('Longitud máxima de 200'),
    check('price').not().isEmpty().isFloat().withMessage('No es un valor valido'),
    check('availability').not().isEmpty().isInt({ gt: 0, lt: 3 }).withMessage('Debe ser un valor del 1-2'),
    check('availability').isLength({ min: 1, max: 1 }).withMessage('Longitud de 1'),
    check('image').optional().isURL().trim().withMessage('Debe ser de tipo URL'),
    check('idCategoria').isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('idProducto').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('name').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('detail').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('detail').optional().isLength({max: 200 }).withMessage('Longitud máxima de 200'),
    check('price').optional().isFloat().withMessage('No es un valor valido'),
    check('availability').optional().isInt({ gt: 0, lt: 3 }).withMessage('Debe ser un valor del 1-2'),
    check('availability').optional().isLength({ min: 1, max: 1 }).withMessage('Longitud de 1'),
    check('image').optional().isURL().trim().withMessage('Debe ser de tipo URL'),
    check('idCategoria').optional().isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
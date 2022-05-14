const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('products').not().isEmpty().trim().isJSON().withMessage('No puede ser vacio'),
    check('totalPrice').not().isEmpty().isFloat().withMessage('No es un valor valido'),
    check('type').not().isEmpty().isInt({ gt: 0, lt: 3 }).withMessage('Debe ser un valor del 1-2'),
    check('type').isLength({ min: 1, max: 1 }).withMessage('Longitud de 1'),
    check('idAddress').optional().isInt().trim().withMessage('No es un valor valido'),
    check('note').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('note').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    check('state').not().isEmpty().isInt({ gt: 0, lt: 6 }).withMessage('Debe ser un valor del 1-5'),
    check('idUsuario').isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('idPedido').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('products').optional().trim().isJSON().withMessage('Debe ser JSON'),
    check('totalPrice').optional().isFloat().withMessage('Debe ser Double'),
    check('type').optional().isInt({ gt: 0, lt: 3 }).withMessage('Debe ser un valor del 1-2'),
    check('type').optional().isLength({ min: 1, max: 1 }).withMessage('Longitud de 1'),
    check('idAddress').optional().isInt().trim().withMessage('No es un valor valido'),
    check('note').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('note').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    check('state').optional().isInt({ gt: 0, lt: 6 }).withMessage('Debe ser un valor del 1-5'),
    check('idUsuario').optional().isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
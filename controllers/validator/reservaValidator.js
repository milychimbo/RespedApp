const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('reservationDate').not().isEmpty().trim().isDate().withMessage('No puede ser vacio'),
    check('reservationTime').not().isEmpty().withMessage('No puede ser vacio'),
    check('reservationTime').isString().withMessage('Debe ser de tipo texto'),
    check('reservationTime').isLength({ min: 4, max: 12 }).withMessage('Longitud de 4 a 12'),
    check('people').not().isEmpty().isInt({ gt: 0, lt: 81 }).withMessage('Debe ser un valor del 1-3'),
    check('idPedido').optional().isInt().trim().withMessage('No es un valor valido'),
    check('note').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('note').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('idReserva').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('reservationDate').optional().isDate().withMessage('Debe de ser tipo fecha'),
    check('reservationTime').optional().isString().withMessage('Debe ser de tipo texto'),
    check('reservationTime').optional().isLength({ min: 4, max: 12 }).withMessage('Longitud de 4 a 12'),
    check('people').optional().isInt({ gt: 0, lt: 81 }).withMessage('Debe ser un valor del 1-3'),
    check('idPedido').optional().isInt().trim().withMessage('No es un valor valido'),
    check('note').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('note').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('IDUSUARIO').not().isEmpty().isInt().trim().withMessage('No es un valor valido'),
    check('IDPEDIDO').optional().isInt().trim().withMessage('No es un valor valido'),
    check('PEOPLE').not().isEmpty().isInt().trim().withMessage('No es un valor valido'),
    check('NOTE').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('NOTE').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    check('RESERVATIONDATE').not().isEmpty().trim().isDate().withMessage('No puede ser vacio'),
    check('RESERVATIONTIME').not().isEmpty().withMessage('No puede ser vacio'),
    check('RESERVATIONTIME').isString().withMessage('Debe ser de tipo texto'),
    check('RESERVATIONTIME').isLength({ min: 5, max: 5 }).withMessage('Longitud de 5'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('IDRESERVA').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('IDUSUARIO').optional().isInt().trim().withMessage('No es un valor valido'),
    check('IDPEDIDO').optional().isInt().trim().withMessage('No es un valor valido'),
    check('PEOPLE').optional().isInt().trim().withMessage('No es un valor valido'),
    check('NOTE').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('NOTE').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    check('RESERVATIONDATE').optional().isDate().withMessage('Debe de ser tipo fecha'),
    check('RESERVATIONTIME').optional().isString().withMessage('Debe ser de tipo texto'),
    check('RESERVATIONTIME').optional().isLength({ min: 5, max: 5}).withMessage('Longitud de 5'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
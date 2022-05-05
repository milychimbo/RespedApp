const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('userName').not().isEmpty().trim().isString().withMessage('No puede ser vacio'),
    check('email').not().isEmpty().isEmail().withMessage('Deber ser un email valido'),
    check('name').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('lastName').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('password').not().isEmpty().withMessage('No puede ser vacio'),
    check('password').isString().withMessage('Debe ser de tipo texto'),
    check('password').not().isAlpha().withMessage('Debe contener al menos un numero'),
    check('password').isLength({ min: 4, max: 12 }).withMessage('Longitud de 4 a 12'),
    check('tipoUsuario').not().isEmpty().isInt({ gt: 0, lt: 4 }).withMessage('Debe ser un valor del 1-3'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('idUsuario').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('userName').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('email').optional().exists().isEmail().withMessage('Deber ser un email valido'),
    check('name').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('lastName').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('password').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('password').optional().not().isAlpha().withMessage('Debe contener al menos un numero'),
    check('password').optional().isLength({ min: 4, max: 12 }).withMessage('Longitud de 4 a 12'),
    check('tipoUsuario').optional().not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('tipoUsuario').optional().isInt({ gt: 0, lt: 4 }).withMessage('Debe ser un valor del 1-3'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = {validationInsert, validationUpdate }
const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('IDTIPOUSUARIO').optional().isInt().withMessage('No es un valor valido'),
    check('USERNAME').not().isEmpty().trim().isString().withMessage('No puede ser vacio'),
    check('EMAIL').not().isEmpty().isEmail().withMessage('Deber ser un email valido'),
    check('NAME').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('LASTNAME').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('PASSWORD').not().isEmpty().withMessage('No puede ser vacio'),
    check('PASSWORD').isString().withMessage('Debe ser de tipo texto'),
    check('PASSWORD').not().isAlpha().withMessage('Debe contener al menos un numero'),
    check('PASSWORD').isLength({ min: 4, max: 12 }).withMessage('Longitud de 4 a 12'),
    check('PHONE').not().isEmpty().withMessage('No puede ser vacio'),
    check('PHONE').isString().withMessage('Debe ser de tipo texto'),
    check('PHONE').isLength({ min: 9, max: 15 }).withMessage('Longitud de 9 a 15'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('IDUSUARIO').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('USERNAME').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('EMAIL').optional().exists().isEmail().withMessage('Deber ser un email valido'),
    check('NAME').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('LASTNAME').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('PASSWORD').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('PASSWORD').optional().not().isAlpha().withMessage('Debe contener al menos un numero'),
    check('PASSWORD').optional().isLength({ min: 4, max: 12 }).withMessage('Longitud de 4 a 12'),
    check('PHONE').optional().isString().withMessage('Debe ser de tipo texto'),
    check('PHONE').optional().isLength({ min: 9, max: 15 }).withMessage('Longitud de 4 a 12'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = {validationInsert, validationUpdate }
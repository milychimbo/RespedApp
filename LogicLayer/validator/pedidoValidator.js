const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationInsert = [
    check('IDTIPOPEDIDO').not().isEmpty().isInt().trim().withMessage('No es un valor valido'),
    check('IDDIRECCION').optional().isInt().trim().withMessage('No es un valor valido'),
    check('IDUSUARIO').not().isEmpty().isInt().trim().withMessage('No es un valor valido'),
    check('TOTALPRICE').not().isEmpty().isFloat().withMessage('No es un valor valido'),
    check('NOTE').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('NOTE').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    check('IDSTATE').not().isEmpty().isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validationUpdate = [
    check('IDPEDIDO').not().isEmpty().isInt().withMessage('No es un valor valido'),
    check('IDTIPOPEDIDO').optional().isInt().trim().withMessage('No es un valor valido'),
    check('IDDIRECCION').optional().isInt().trim().withMessage('No es un valor valido'),
    check('IDUSUARIO').optional().isInt().trim().withMessage('No es un valor valido'),
    check('TOTALPRICE').optional().isFloat().withMessage('Debe ser Double'),
    check('NOTE').optional().isString().trim().withMessage('Debe ser de tipo texto'),
    check('NOTE').optional().isLength({max: 150 }).withMessage('Longitud máxima de 150'),
    check('IDSTATE').optional().isInt().trim().withMessage('No es un valor valido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validationInsert,validationUpdate }
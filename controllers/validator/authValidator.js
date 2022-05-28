const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationSearch = [
    check('USERNAME').not().isEmpty().trim().isString().withMessage('No puede ser vacio'),
    check('PASSWORD').not().isEmpty().withMessage('No puede ser vacio'),
    check('PASSWORD').isString().withMessage('Debe ser de tipo texto'),
    check('PASSWORD').not().isAlpha().withMessage('Debe contener al menos un numero'),
    check('PASSWORD').isLength({ min: 4, max: 12 }).withMessage('Longitud de 4 a 12'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];


module.exports = {validationSearch }
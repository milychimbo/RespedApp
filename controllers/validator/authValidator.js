const { check } = require("express-validator");
const { validateResult } = require('../../helpers/handleGenericFunction');

const validationSearch = [
    check('userName').not().isEmpty().trim().isString().withMessage('No puede ser vacio'),
    check('password').not().isEmpty().withMessage('No puede ser vacio'),
    check('password').isString().withMessage('Debe ser de tipo texto'),
    check('password').not().isAlpha().withMessage('Debe contener al menos un numero'),
    check('password').isLength({ min: 4, max: 12 }).withMessage('Longitud de 4 a 12'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];


module.exports = {validationSearch }
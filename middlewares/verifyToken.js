const jwt = require('jsonwebtoken')
const {
    request,
    response
} = require('express');

const {
    responseJson
} = require('../helpers/handleGenericFunction');

const secret = process.env.SECRET || 'CDjNU7uuZWazUSQsScR/P5RYwSeTsm2I0HLCUXKWnHY';

function validateToken(req = request, res = response, next) {
    const authorization = req.headers.authorization;
    let token = null;
    if (authorization != undefined) {
        if (authorization.startsWith('Bearer')) {
            token = authorization.substring(7);
            try {
                const decodedToken = jwt.verify(token, secret);
                req.currentToken=decodedToken;
                next();
            } catch {
                res.status(401).json(responseJson(401, "no autorizado"))
            }
        }
    } else {
        res.status(401).json(responseJson(401, "no autorizado"))
    }
}
module.exports = {validateToken}
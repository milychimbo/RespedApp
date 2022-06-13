const jwt = require('jsonwebtoken')
const {
    request,
    response
} = require('express');

const {
    responseJson
} = require('../helpers/handleGenericFunction');

const secret = process.env.SECRET || '123';

function validateToken(req = request, res = response, next) {
    
    let token = req.cookies.token;
    console.log(token)
    if (token != undefined) {
            try {
                const decodedToken = jwt.verify(token, secret);
                req.currentToken=decodedToken;
                next();
            } catch {
                res.status(401).json(responseJson(401, "no autorizado"))
            }
    } else {
        res.status(401).json(responseJson(401, "no autorizado"))
    }
}
module.exports = {validateToken}
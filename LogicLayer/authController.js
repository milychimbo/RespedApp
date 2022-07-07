const { request, response } = require('express');
const { getAllUsers, getOneUser, getOneUserByUsername } = require('../DataLayer/usuario');
const { responseJson } = require('../helpers/handleGenericFunction');
const { verifyPassword } = require('../helpers/handleBCrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_TOKEN;


async function login(req = request, res = response) {
    const {USERNAME, PASSWORD} = req.body;

    const requestUser = await getOneUserByUsername(USERNAME);
    if (requestUser?.dataValues) {
        const { dataValues: user } = requestUser;
        if (USERNAME === user.USERNAME && verifyPassword(PASSWORD, user.PASSWORD)) {
            const payloadToken = {
                IDUSUARIO: user.IDUSUARIO,
                TIPO: user.IDTIPOUSUARIO,
                EMAIL: user.EMAIL,
                NAME: user.NAME,
                LASTNAME: user.LASTNAME,
                USERNAME: user.USERNAME,
                PHONE: user.PHONE,
            }
            const token = jwt.sign(payloadToken, secret, { expiresIn: '1d' });
            return res.status(200).json(responseJson(200, "success", { token }))
        } else {
            return res.status(404).json(responseJson(404, "El usuario o la contraseña son incorrectas"));
        }
    } else {
        return res.status(404).json(responseJson(404, "El usuario o la contraseña son incorrectas"));
    }
}

async function validate(req = request, res = response) {
    let { token } = req.body;
    if (token != undefined) {
        try {
            const decodedToken = jwt.verify(token, secret);
            res.status(200).json(responseJson(200, "token valido", decodedToken))
        } catch {
            res.status(401).json(responseJson(401, "El token no es valido"))
        }
    } else {
        res.status(401).json(responseJson(401, "No se recibio un token"))
    }
}

module.exports = { login, validate };
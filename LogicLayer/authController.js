const { request, response } = require('express');
const { getAllUsers } = require('../DataLayer/usuario');
const { responseJson } = require('../helpers/handleGenericFunction');
const { verifyPassword } = require('../helpers/handleBCrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'CDjNU7uuZWazUSQsScR/P5RYwSeTsm2I0HLCUXKWnHY';


async function login(req = request, res = response) {
    const USERNAME = req.body.USERNAME;
    const PASSWORD = req.body.PASSWORD;
    const users = await getAllUsers();
    const usersL = users.length;
    var i = 0;
    users.forEach(user => {
        i = i + 1;
        if (user.USERNAME == USERNAME) {
            const match = verifyPassword(PASSWORD, user.PASSWORD);
            if (match) {
                i = usersL + 1;
                const userToken = {
                    IDUSUARIO: user.IDUSUARIO,
                    USERNAME: user.USERNAME,
                    TIPO: user.IDTIPOUSUARIO,
                }
                const token = jwt.sign(userToken, secret, { expiresIn: '1d' });
                const time = 1000 * 60 * 60;
                const data = {
                    token,
                    id: user.IDUSUARIO,
                    username: user.USERNAME,
                    email: user.EMAIL,
                    rol: user.IDTIPOUSUARIO,
                }
                res.status(200).json(responseJson(200, "success", data))


            } else {
                i = usersL + 1;
                res.status(400).json(responseJson(400, "contraseña incorrecta"))

            }
        }
        else {
            if (i == usersL) {
                res.status(404).json(responseJson(404, "no existe"))
            }
        }
    });
}

async function validate(req = request, res = response) {
    let { token } = req.body;
    console.log(token);
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
const { request, response } = require('express');
const { getAllUsers } = require('../DataLayer/usuario');
const { responseJson } = require('../helpers/handleGenericFunction');
const { verifyPassword } = require('../helpers/handleBCrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_TOKEN;


function login(req = request, res = response) {
    const USERNAME = req.body.USERNAME;
    const PASSWORD = req.body.PASSWORD;

    getAllUsers().then(users => {
        const usersL = users.length;
        var i = 0;
        users.forEach(user => {
            i = i + 1;
            if (user.USERNAME == USERNAME) {
                const match = verifyPassword(PASSWORD, user.PASSWORD);
                if (match) {
                    console.log(user);
                    i = usersL + 1;
                    const userToken = {
                        IDUSUARIO: user.IDUSUARIO,
                        TIPO: tipo.TIPO,
                        EMAIL: user.EMAIL,
                        NAME: user.NAME,
                        LASTNAME: user.LASTNAME,
                        USERNAME: user.USERNAME,   
                        PHONE: user.PHONE,
                    }
                    const token = jwt.sign(userToken, secret, { expiresIn: '1d' });
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
    })

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
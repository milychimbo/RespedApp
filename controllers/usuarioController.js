const {
    request,
    response
} = require('express');
const {
    getAllUsers,
    getOneUser,
    updateUser,
    createUser,
    deleteUser
} = require('../models/user');
const {
    responseJson
} = require('../helpers/handleGenericFunction');
const {
    encrypt
} = require('../helpers/handleBCrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || '123';

async function obtenerUsuarios(req = request, res = response) {
    const authorization = req.headers.authorization;
    let token = null;
    if (authorization != undefined) {
        if (authorization.startsWith('Bearer')) {
            token = authorization.substring(7);
            try {
                const decodedToken = jwt.verify(token, secret);
                const users = await getAllUsers();
                if (users.length > 0)
                    res.status(200).json(responseJson(200, "success", users))
                else
                    res.status(404).json(responseJson(404, "no existe"))
            } catch {
                res.status(401).json(responseJson(401, "no autorizado"))

            }
        }
    } else {
        res.status(401).json(responseJson(401, "no autorizado"))
    }


}

async function obtenerUsuarioId(req = request, res = response) {
    const authorization = req.headers.authorization;
    let token = null;
    if (authorization != undefined) {
        if (authorization.startsWith('Bearer')) {
            token = authorization.substring(7);
            try {
                const decodedToken = jwt.verify(token, secret)
                const user = await getOneUser(req.params.id);
                if (user != null)
                    res.status(200).json(responseJson(200, "success", user))
                else
                    res.status(404).json(responseJson(404, "no existe"))
            } catch {
                res.status(401).json(responseJson(401, "no autorizado"))

            }
        }
    } else {
        res.status(401).json(responseJson(401, "no autorizado"))
    }
}


async function crearUsuario(req = request, res = response) {
    const authorization = req.headers.authorization;
    let token = null;
    if (authorization != undefined) {
        if (authorization.startsWith('Bearer')) {
            token = authorization.substring(7);
            try {
                const decodedToken = jwt.verify(token, secret)
                req.body.password = await encrypt(req.body.password);
                const user = await createUser(req.body);
                if (Object.keys(user)[0] == "dataValues")
                    res.status(201).json(responseJson(201, "success"))
                else {
                    const error = {
                        message: user.errors[0].message,
                        value: user.errors[0].value
                    }
                    res.status(400).json(responseJson(400, "no se pudo crear", error))
                }
            } catch {
                res.status(401).json(responseJson(401, "no autorizado"))
            }
        }
    } else {
        res.status(401).json(responseJson(401, "no autorizado"))
    }
}


async function actualizarUsuario(req = request, res = response) {
    const authorization = req.headers.authorization;
    let token = null;
    if (authorization != undefined) {
        if (authorization.startsWith('Bearer')) {
            token = authorization.substring(7);
            try {
                const decodedToken = jwt.verify(token, secret)
                if (req.params.password) {
                    req.body.password = await encrypt(req.body.password);
                }
                const user = await updateUser(req.body);
                if (user == 1)
                    res.status(201).json(responseJson(201, "success"))
                else
                    res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
            } catch {
                res.status(401).json(responseJson(401, "no autorizado"))
            }
        }
    } else {
        res.status(401).json(responseJson(401, "no autorizado"))
    }
}


async function borrarUsuario(req = request, res = response) {
    const authorization = req.headers.authorization;
    let token = null;
    if (authorization != undefined) {
        if (authorization.startsWith('Bearer')) {
            token = authorization.substring(7);
            try {
                const decodedToken = jwt.verify(token, secret);
                const user = await deleteUser(req.params.id);
                if (user == 1)
                    res.status(201).json(responseJson(201, "success"))
                else
                    res.status(200).json(responseJson(200, "no hubo cambios"))
            } catch {
                res.status(401).json(responseJson(401, "no autorizado"))
            }
        }
    } else {
        res.status(401).json(responseJson(401, "no autorizado"))
    }
}


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioId,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};
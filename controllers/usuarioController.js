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
} = require('../models/usuario');
const {
    responseJson
} = require('../helpers/handleGenericFunction');
const {
    encrypt
} = require('../helpers/handleBCrypt');

async function obtenerUsuarios(req = request, res = response) {
   
    const users = await getAllUsers();
    if (users.length > 0)
        res.status(200).json(responseJson(200, "success", users))
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerUsuarioId(req = request, res = response) {
    const user = await getOneUser(req.params.id);
    if (user != null)
        res.status(200).json(responseJson(200, "success", user))
    else
        res.status(404).json(responseJson(404, "no existe"))
}


async function crearUsuario(req = request, res = response) {
    req.body.PASSWORD = await encrypt(req.body.PASSWORD);
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
}


async function actualizarUsuario(req = request, res = response) {
    if (req.body.PASSWORD) {
        req.body.PASSWORD = await encrypt(req.body.PASSWORD);
    }
    const user = await updateUser(req.body);
    if (user == 1)
        res.status(201).json(responseJson(201, "success"))
    else
        res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}


async function borrarUsuario(req = request, res = response) {
    const user = await deleteUser(req.params.id);
    if (user == 1)
        res.status(201).json(responseJson(201, "success"))
    else
        res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioId,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};
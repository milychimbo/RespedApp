const { request, response } = require("express");
const {
    getAllUsers,
    updateUser,
    createUser,
    deleteUser,
    getAllUsersByType,
} = require("../DataLayer/usuario");
const { getOneTipoUsuario } = require("../DataLayer/tipousuario");
const { responseJson } = require("../helpers/handleGenericFunction");
const { encrypt } = require("../helpers/handleBCrypt");
const { verifyPassword } = require("../helpers/handleBCrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_TOKEN;

async function obtenerUsuarios(req = request, res = response) {
    const users = await getAllUsers();
    if (users.length > 0)
        res.status(200).json(responseJson(200, "success", users));
    else {
        res.status(404).json(responseJson(404, "no existe"));
    }
}

async function obtenerUsuariosPorTipo(req = request, res = response) {
    const users = await getAllUsersByType(req.params.id);
    const arrayUsers = [];
    if (users.length > 0) {
        users.forEach(async (user, index) => {
            const tipo = await getOneTipoUsuario(req.params.id);
            const respuesta = {
                IDUSUARIO: user.IDUSUARIO,
                TIPO: tipo.TIPO,
                EMAIL: user.EMAIL,
                NAME: user.NAME,
                LASTNAME: user.LASTNAME,
                USERNAME: user.USERNAME,
                PHONE: user.PHONE,
            };
            arrayUsers.push(respuesta);
            if (index == users.length - 1) {
                res.status(200).json(responseJson(200, "success", arrayUsers));
            }
        });
    } else {
        res.status(404).json(responseJson(404, "no existe"));
    }
}

async function crearUsuario(req = request, res = response) {
    req.body.PASSWORD = await encrypt(req.body.PASSWORD);
    const user = await createUser(req.body);
    if (Object.keys(user)[0] == "dataValues")
        res.status(201).json(responseJson(201, "success"));
    else {
        res
            .status(400)
            .json(responseJson(400, "no se pudo crear", user.parent.sqlMessage));
    }
}

function crearCliente(req = request, res = response) {
    encrypt(req.body.PASSWORD).then((password) => {
        const userJson = {
            IDTIPOUSUARIO: 3,
            USERNAME: req.body.USERNAME,
            EMAIL: req.body.EMAIL,
            NAME: req.body.NAME,
            LASTNAME: req.body.LASTNAME,
            PASSWORD: password,
            PHONE: req.body.PHONE,
        };
        createUser(userJson).then((user) => {
            if (Object.keys(user)[0] == "dataValues") {
                try {
                    const USERNAME = req.body.USERNAME;
                    const PASSWORD = req.body.PASSWORD;
                    getAllUsers().then((users) => {
                        const usersL = users.length;
                        var i = 0;
                        users.forEach((user) => {
                            i = i + 1;
                            if (user.USERNAME == USERNAME) {
                                const match = verifyPassword(PASSWORD, user.PASSWORD);
                                if (match) {
                                    i = usersL + 1;
                                    const userToken = {
                                        IDUSUARIO: user.IDUSUARIO,
                                        USERNAME: user.USERNAME,
                                        TIPO: user.IDTIPOUSUARIO,
                                        NAME: user.NAME,
                                        LASTNAME: user.LASTNAME,
                                        PHONE: user.PHONE,
                                    };
                                    const token = jwt.sign(userToken, secret, {
                                        expiresIn: "1d",
                                    });
                                    const data = {
                                        token,
                                        id: user.IDUSUARIO,
                                        username: user.USERNAME,
                                        email: user.EMAIL,
                                        rol: user.IDTIPOUSUARIO,
                                    };
                                    res.status(200).json(responseJson(200, "success", data));
                                } else {
                                    i = usersL + 1;
                                    res
                                        .status(400)
                                        .json(responseJson(400, "contraseña incorrecta"));
                                }
                            } else {
                                if (i == usersL) {
                                    res.status(404).json(responseJson(404, "no existe"));
                                }
                            }
                        });
                    });
                } catch {
                    res.status(400).json(responseJson(400, "no se pudo crear"));
                }
            } else {
                res
                    .status(400)
                    .json(responseJson(400, "no se pudo crear", user.parent.sqlMessage));
            }
        });
    });
}

async function actualizarUsuario(req = request, res = response) {
    const newPayloadToken = {
        ...req.currentToken,
        ...req.body
    }
    if (req.body.PASSWORD) {
        req.body.PASSWORD = await encrypt(req.body.PASSWORD);
        delete newPayloadToken.PASSWORD;
    }
    delete newPayloadToken.iat;
    delete newPayloadToken.exp;

    const user = await updateUser(req.body);
    if (user == 1) {
        const token = jwt.sign(newPayloadToken, secret, { expiresIn: "1d" });
        res.status(201).json(responseJson(201, "success", { token }));
    }
    else {
        res.status(200).json(responseJson(200, "no hubo cambios", user));
    }
}

async function borrarUsuario(req = request, res = response) {
    const user = await deleteUser(req.params.id);
    if (user == 1) res.status(201).json(responseJson(201, "success"));
    else {
        res.status(200).json(responseJson(200, "no hubo cambios")); //me devuelve 1 si actualizo o 0 si no
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuariosPorTipo,
    crearUsuario,
    crearCliente,
    actualizarUsuario,
    borrarUsuario,
};

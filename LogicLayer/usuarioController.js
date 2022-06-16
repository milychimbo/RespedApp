const {
    request,
    response
} = require('express');
const {
    getAllUsers,
    updateUser,
    createUser,
    deleteUser,
    getAllUsersByType
} = require('../DataLayer/usuario');
const {
    getOneTipoUsuario
} = require('../DataLayer/tipousuario');
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
    else{
        res.status(404).json(responseJson(404, "no existe"))
    }
        
}

async function obtenerUsuariosPorTipo(req = request, res = response) {
   
    const users = await getAllUsersByType(req.params.id);
    const arrayUsers = [];
    if (users.length > 0){
        users.forEach(async (user,index) => {
            const tipo = await getOneTipoUsuario(req.params.id);
            const respuesta = {
                "IDUSUARIO":user.IDUSUARIO,
                "USERNAME":user.USERNAME,
                "EMAIL":user.EMAIL,
                "NAME":user.NAME,
                "LASTNAME":user.LASTNAME,
                "PHONE":user.PHONE,
                "TIPO": tipo.TIPO
            }
            arrayUsers.push(respuesta)
            if(index==(users.length-1)){
                res.status(200).json(responseJson(200, "success", arrayUsers))
            }
        });
    }
    else{
        res.status(404).json(responseJson(404, "no existe"))
    }
        
}

async function crearUsuario(req = request, res = response) {
    req.body.PASSWORD = await encrypt(req.body.PASSWORD);
    const user = await createUser(req.body);
    if (Object.keys(user)[0] == "dataValues")
        res.status(201).json(responseJson(201, "success"))
    else {
        res.status(400).json(responseJson(400, "no se pudo crear", user.parent.sqlMessage))
    }
}


async function actualizarUsuario(req = request, res = response) {
    if (req.body.PASSWORD) {
        req.body.PASSWORD = await encrypt(req.body.PASSWORD);
    }
    const user = await updateUser(req.body);
    if (user == 1)
        res.status(201).json(responseJson(201, "success"))
    else{
        
            res.status(200).json(responseJson(200, "no hubo cambios",user)) 
    }
}


async function borrarUsuario(req = request, res = response) {
    const user = await deleteUser(req.params.id);
    if (user == 1)
        res.status(201).json(responseJson(201, "success"))
    else{
        res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
    }
}


module.exports = {
    obtenerUsuarios,
    obtenerUsuariosPorTipo,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};
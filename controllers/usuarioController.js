const {request,response} = require('express');
const {getAllUsers, getOneUser, updateUser, createUser, deleteUser} = require('../models/user');



async function obtenerUsuarios(req = request,res = response){
    const users = await getAllUsers();
    res.json(users[0])
}

async function obtenerUsuarioId(req = request,res = response){
    const user = await getOneUser(req.params.id);
    res.json(user)
}

async function crearUsuario(req = request,res = response){
    const userObj = req.body;
   const user = await createUser(userObj);
   res.send(user) //me devuelve el user
}

async function actualizarUsuario(req = request,res = response){
    const userObj = req.body;
   const user = await updateUser(userObj);
   res.send(user) //me devuelve 1 si actualizo o 0 si no
}

async function borrarUsuario(req = request,res = response){
    const user = await deleteUser(req.params.id);
    res.json(user)
}


module.exports= {obtenerUsuarios,obtenerUsuarioId,crearUsuario,actualizarUsuario,borrarUsuario};
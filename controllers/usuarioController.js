const {request,response} = require('express');
const {getAllUsers, getOneUser, updateUser, createUser, deleteUser} = require('../models/user');
const { responseJson } = require('../helpers/handleGenericFunction');



async function obtenerUsuarios(req = request,res = response){
    const users = await getAllUsers();
    if(users.length!=0)
    res.json(responseJson(200, "success", users))
    else
    res.json(responseJson(204, "no existe"))
}

async function obtenerUsuarioId(req = request,res = response){
    const user = await getOneUser(req.params.id);
    if(user!=null)
    res.json(responseJson(200, "success", user))
    else
    res.json(responseJson(204, "no existe"))
}

async function crearUsuario(req = request,res = response){
   const user = await createUser(req.body);
   console.log(Object.keys(user)[0]);
    if(Object.keys(user)[0]=="dataValues")
    res.json(responseJson(200, "success"))
    else
    res.json(responseJson(400, "no se pudo crear",user))
}

async function actualizarUsuario(req = request,res = response){
   const user = await updateUser(req.body);
   if(user==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarUsuario(req = request,res = response){
    const user = await deleteUser(req.params.id);
    if(user==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerUsuarios,obtenerUsuarioId,crearUsuario,actualizarUsuario,borrarUsuario};
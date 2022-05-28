const {request,response} = require('express');
const {getAllTipoUsuarios, getOneTipoUsuario, updateTipoUsuario, deleteTipoUsuario, createTipoUsuario} = require('../models/tipopedido');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerTipoUsuarios(req = request,res = response){
    const tipousuarios = await getAllTipoUsuarios();
    if(tipousuarios.length>0)
    res.status(200).json(responseJson(200, "success", tipousuarios))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerTipoUsuarioId(req = request,res = response){
    const tipousuario = await getOneTipoUsuario(req.params.id);
    if(tipousuario!=null)
    res.status(200).json(responseJson(200, "success", tipousuario))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function crearTipoUsuario(req = request,res = response){
    const tipousuario = await createTipoUsuario(req.body);
    if(Object.keys(tipousuario)[0]=="dataValues")
    res.status(200).json(responseJson(200, "success"))
    else
    res.status(400).json(responseJson(400, "no se pudo crear",tipousuario))
}

async function actualizarTipoUsuario(req = request,res = response){
   const tipousuario = await updateTipoUsuario(req.body);
   if(tipousuario==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarTipoUsuario(req = request,res = response){
    const tipousuario = await deleteTipoUsuario(req.params.id);
    if(tipousuario==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerTipoUsuarios,obtenerTipoUsuarioId,crearTipoUsuario,actualizarTipoUsuario,borrarTipoUsuario};
const {request,response} = require('express');
const {getAllTipoUsuarios, getOneTipoUsuario} = require('../DataLayer/tipousuario');
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




module.exports= {obtenerTipoUsuarios,obtenerTipoUsuarioId};
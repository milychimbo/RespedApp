const {request,response} = require('express');
const {getAllDirecciones, getOneDireccion, updateDireccion, deleteDireccion, createDireccion} = require('../models/direccion');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerDirecciones(req = request,res = response){
    const direcciones = await getAllDirecciones();
    if(direcciones.length>0)
    res.json(responseJson(200, "success", direcciones))
    else
    res.json(responseJson(204, "no existe"))
}

async function obtenerDireccionId(req = request,res = response){
    const direccion = await getOneDireccion(req.params.id);
    if(direccion!=null)
    res.json(responseJson(200, "success", direccion))
    else
    res.json(responseJson(204, "no existe"))
}

async function crearDireccion(req = request,res = response){
    const direccion = await createDireccion(req.body);
    if(Object.keys(direccion)[0]=="dataValues")
    res.json(responseJson(200, "success"))
    else
    res.json(responseJson(400, "no se pudo crear",direccion))
}

async function actualizarDireccion(req = request,res = response){
   const direccion = await updateDireccion(req.body);
   if(direccion==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarDireccion(req = request,res = response){
    const direccion = await deleteDireccion(req.params.id);
    if(direccion==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerDirecciones,obtenerDireccionId,crearDireccion,actualizarDireccion,borrarDireccion};
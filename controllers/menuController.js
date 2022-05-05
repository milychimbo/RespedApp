const {request,response} = require('express');
const {getMenu, updateMenu} = require('../models/menu');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerMenuID(req = request,res = response){
    const menu = await getMenu(1);
    if(menu!=null)
    res.json(responseJson(200, "success", menu))
    else
    res.json(responseJson(204, "no existe"))
}

async function actualizarMenu(req = request,res = response){
   const menu = await updateMenu(req.body);
   if(menu==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

module.exports= {obtenerMenuID,actualizarMenu};
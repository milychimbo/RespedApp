const {request,response} = require('express');
const {getMenu, updateMenu} = require('../models/menu');
const { responseJson } = require('../helpers/handleGenericFunction');

async function obtenerMenuID(req = request,res = response){
    const menu = await getMenu(1);
    if(menu!=null)
    res.status(200).json(responseJson(200, "success", menu))
    else
    res.status(404).json(responseJson(404, "no existe"))
}


module.exports= {obtenerMenuID};
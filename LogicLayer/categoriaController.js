const {request,response} = require('express');
const {getAllCategorias, updateCategoria, deleteCategoria, createCategoria} = require('../DataLayer/categoria');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerCategorias(req = request,res = response){
    const categorias = await getAllCategorias();
    if(categorias.length>0)
    res.status(200).json(responseJson(200, "success", categorias))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function crearCategoria(req = request,res = response){
    const categoria = await createCategoria(req.body);
    if(Object.keys(categoria)[0]=="dataValues")
    res.status(200).json(responseJson(200, "success"))
    else
    res.status(400).json(responseJson(400, "no se pudo crear",categoria))
}

async function actualizarCategoria(req = request,res = response){
   const categoria = await updateCategoria(req.body);
   if(categoria==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarCategoria(req = request,res = response){
    const categoria = await deleteCategoria(req.params.id);
    if(categoria==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerCategorias,crearCategoria,actualizarCategoria,borrarCategoria};
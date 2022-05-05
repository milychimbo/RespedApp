const {request,response} = require('express');
const {getAllCategorias, getOneCategoria, updateCategoria, deleteCategoria, createCategoria} = require('../models/categoria');
const { responseJson } = require('../helpers/handleGenericFunction');



async function obtenerCategorias(req = request,res = response){
    const categorias = await getAllCategorias();
    if(categorias.length>0)
    res.json(responseJson(200, "success", categorias))
    else
    res.json(responseJson(204, "no existe"))
}

async function obtenerCategoriaId(req = request,res = response){
    const categoria = await getOneCategoria(req.params.id);
    if(categoria!=null)
    res.json(responseJson(200, "success", categoria))
    else
    res.json(responseJson(204, "no existe"))
}

async function crearCategoria(req = request,res = response){
    const categoria = await createCategoria(req.body);
    if(Object.keys(categoria)[0]=="dataValues")
    res.json(responseJson(200, "success"))
    else
    res.json(responseJson(400, "no se pudo crear",categoria))
}

async function actualizarCategoria(req = request,res = response){
   const categoria = await updateCategoria(req.body);
   if(categoria==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarCategoria(req = request,res = response){
    const categoria = await deleteCategoria(req.params.id);
    if(categoria==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerCategorias,obtenerCategoriaId,crearCategoria,actualizarCategoria,borrarCategoria};
const {request,response} = require('express');
const { getAllProductos, getOneProducto, createProducto, updateProducto, deleteProducto, getCategoriaProductos } = require('../models/producto');
const { getAllCategorias } = require('../models/categoria');
const { updateMenu } = require('../models/menu');
const { responseJson } = require('../helpers/handleGenericFunction');



async function obtenerProductos(req = request,res = response){
    const productos = await getAllProductos();
    if(productos.length>0)
    res.json(responseJson(200, "success", productos))
    else
    res.json(responseJson(204, "no existe"))
}

async function obtenerProductosCategoria(req = request,res = response){
    const productos = await getCategoriaProductos(req.params.id);
    if(productos.length>0)
    res.json(responseJson(200, "success", productos))
    else
    res.json(responseJson(204, "no existe"))
}

async function obtenerProductoId(req = request,res = response){
    const producto = await getOneProducto(req.params.id);
    if(producto!=null)
    res.json(responseJson(200, "success", producto))
    else
    res.json(responseJson(204, "no existe"))
}

async function crearProducto(req = request,res = response){
    const producto = await createProducto(req.body);
    if(Object.keys(producto)[0]=="dataValues"){
    const categorias = await getAllCategorias();
    var catprodAll = [];
    categorias.forEach(async (categoria, index)=> {
        const productos = await getCategoriaProductos(categoria.idCategoria);
        let catprod = {
                "name": categoria.name,
                "productos": productos,
         }
         catprodAll.push({...catprod});
        if(index == categorias.length-1){
            let menuCompleto = {
                "idMenu": 1,
                "menu": catprodAll,
         }
            await updateMenu(menuCompleto);
        }
        
    });
    res.json(responseJson(200, "success"))}
    else
    res.json(responseJson(400, "no se pudo crear",producto))
}

async function actualizarProducto(req = request,res = response){
   const producto = await updateProducto(req.body);
   if(producto==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarProducto(req = request,res = response){
    const producto = await deleteProducto(req.params.id);
    if(producto==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerProductos,obtenerProductoId,obtenerProductosCategoria,crearProducto,actualizarProducto,borrarProducto};
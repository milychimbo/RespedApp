const {
    request,
    response
} = require('express');
const {
    getAllProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto,
} = require('../models/producto');
const {
    getAllCategorias
} = require('../models/categoria');
const {
    responseJson
} = require('../helpers/handleGenericFunction');


async function obtenerProductos(req = request, res = response) {
    const productos = await getAllProductos();
    if (productos.length > 0)
        res.status(200).json(responseJson(200, "success", productos))
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerMenu(req = request, res = response) {
    const categorias = await getAllCategorias();
    const productos = await getAllProductos();
    var aux = '{"CATEGORIAS":[]}';
    var obj = JSON.parse(aux);
    categorias.forEach(categoria => {
        
        var obj1 = new Array;
        productos.forEach(producto => {
            if(producto.IDCATEGORIA == categoria.IDCATEGORIA){
                
                obj1.push(producto);
            }
        });
        categoria.PRODUCTOS = obj1;
        obj['CATEGORIAS'].push(categoria);
    });
   res.status(200).json(responseJson(200, "success",obj))
}

async function obtenerProductoId(req = request, res = response) {
    const producto = await getOneProducto(req.params.id);
    if (producto != null)
        res.status(200).json(responseJson(200, "success", producto))
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function crearProducto(req = request, res = response) {
    const producto = await crearProducto(req.body);
    if (Object.keys(producto)[0]=="dataValues"){
        res.status(200).json(responseJson(200, "success"))}
        else
        res.status(400).json(responseJson(400, "no se pudo crear",producto))
}

async function actualizarProducto(req = request, res = response) {
    const producto = await updateProducto(req.body);
    if (producto == 1)
        res.status(201).json(responseJson(201, "success"))
    else
        res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarProducto(req = request, res = response) {
    const producto = await deleteProducto(req.params.id);
    if (producto == 1)
        res.status(201).json(responseJson(201, "success"))
    else
        res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports = {
    obtenerProductos,
    obtenerProductoId,
    obtenerMenu,
    crearProducto,
    actualizarProducto,
    borrarProducto
};
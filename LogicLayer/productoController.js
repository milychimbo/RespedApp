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
} = require('../DataLayer/producto');
const {
    getAllCategorias,getOneCategoria
} = require('../DataLayer/categoria');
const {
    responseJson
} = require('../helpers/handleGenericFunction');


async function obtenerProductos(req = request, res = response) {
    const productos = await getAllProductos();
    if (productos.length > 0){
    productos.forEach(producto => {
        producto.PRICE= addZeroes(producto.PRICE.toString());
    });
        res.status(200).json(responseJson(200, "success", productos))}
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerProductoCategoria(req = request, res = response) {
    const productos = await getAllProductos();
    const categoria = await getOneCategoria(req.params.id);
    if(categoria!=null ){
        console.log(categoria.IDCATEGORIA)
        var obj1 = new Array;
        productos.forEach(producto => {
        producto.PRICE= addZeroes(producto.PRICE.toString());
        
        if(producto.IDCATEGORIA == categoria.IDCATEGORIA){
            obj1.push(producto);
        }
    });
    categoria.PRODUCTOS = obj1;
    res.status(200).json(responseJson(200, "success",obj1))
    }
    else {
        res.status(400).json(responseJson(400, "no existe"))
    }
    
}


async function obtenerProductoId(req = request, res = response) {
    const producto = await getOneProducto(req.params.id);
    if (producto != null){
        producto.PRICE= addZeroes(producto.PRICE.toString());
        res.status(200).json(responseJson(200, "success", producto))}
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function crearProducto(req = request, res = response) {
    const producto = await createProducto(req.body);
    
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
        res.status(201).json(responseJson(201, "success",producto))
    else
        res.status(200).json(responseJson(200, "no hubo cambios",producto))
}

function addZeroes(num) {
    // Convert input string to a number and store as a variable.
        var value = Number(num);      
    // Split the input string into two arrays containing integers/decimals
        var res = num.split(".");     
    // If there is no decimal point or only one decimal place found.
        if(res.length == 1 || res[1].length < 3) { 
    // Set the number to two decimal places
            value = value.toFixed(2);
        }
    // Return updated or original number.
    return value;
    }

module.exports = {
    obtenerProductos,
    obtenerProductoId,
    obtenerProductoCategoria,
    crearProducto,
    actualizarProducto,
    borrarProducto
};
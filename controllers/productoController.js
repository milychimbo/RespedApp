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
    var menu = '{"menu":[]}';
    //var obj = JSON.parse(menu);
    


    /*var jsonStr = '{"theTeam":[{"teamId":"1","status":"pending"},{"teamId":"2","status":"member"},{"teamId":"3","status":"member"}]}';

    var obj = JSON.parse(jsonStr);
    obj['theTeam'].push({"teamId":"4","status":"pending"});
    jsonStr = JSON.stringify(obj);*/
    
    var aux2 = '{"categorias":[]}';
    var obj2 = JSON.parse(aux2);
    
    categorias.forEach(categoria => {
        
       /* var aux = '{"'+categoria.NAME+'":[]}';
        var auxi = "'"+categoria.NAME+"'";
        var obj = JSON.stringify(aux);*/
        
        var obj = new Array;
        productos.forEach(producto => {
            if(producto.IDCATEGORIA == categoria.IDCATEGORIA){
                
                obj.push(producto);
            }
        });
        categoria.productos = obj;
        var p = JSON.stringify(categoria)
        console.log(p)
        obj2['categorias'].push(categoria);
    });
   var obj1 = new Object();
   obj1.menu=obj2;
    if (menu.length > 0)
        res.status(200).json(responseJson(200, "success",obj1))
    else
        res.status(404).json(responseJson(404, "no existe"))
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
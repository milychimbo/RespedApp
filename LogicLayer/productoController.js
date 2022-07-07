const {
    request,
    response
} = require('express');
const {
    getAllProductos,
    createProducto,
    updateProducto,
    deleteProducto,
} = require('../DataLayer/producto');
const {
    responseJson
} = require('../helpers/handleGenericFunction');


async function obtenerProductos(req = request, res = response) {
    const productos = await getAllProductos();
    let respuestas = [];
    if (productos.length > 0) {
        for (const producto of productos) {
            if (producto.AVAILABILITY == true) {
                producto.PRICE = producto.PRICE.toFixed(2);
                respuestas = [
                    ...respuestas,
                    producto
                ]
            }
        }
        res.status(200).json(responseJson(200, "success", respuestas))
    } else
        res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerProductosTodo(req = request, res = response) {
    const productos = await getAllProductos();
    if (productos.length > 0) {
        for (const producto of productos) {
            producto.PRICE = producto.PRICE.toFixed(2);
        }
        res.status(200).json(responseJson(200, "success", productos))
    } else
        res.status(404).json(responseJson(404, "no existe"))
}

async function crearProducto(req = request, res = response) {
    const producto = await createProducto(req.body);

    if (Object.keys(producto)[0] == "dataValues") {
        res.status(200).json(responseJson(200, "success"))
    } else
        res.status(400).json(responseJson(400, "no se pudo crear", producto))
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
        res.status(201).json(responseJson(201, "success", producto))
    else
        res.status(200).json(responseJson(200, "no hubo cambios", producto))
}

module.exports = {
    obtenerProductos,
    obtenerProductosTodo,
    crearProducto,
    actualizarProducto,
    borrarProducto
};
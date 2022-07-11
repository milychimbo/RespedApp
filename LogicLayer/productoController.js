const {
    request,
    response
} = require('express');
const { getAllCategorias } = require('../DataLayer/categoria');
const {
    getAllProductos,
    createProducto,
    updateProducto,
    deleteProducto,
    getAllAviavilityProductos,
    getAllAviavilityProductosByCategory,
} = require('../DataLayer/producto');
const {
    responseJson
} = require('../helpers/handleGenericFunction');


async function obtenerProductos(req = request, res = response) {
    const productos = await getAllAviavilityProductos();
    if (productos.length > 0) {
        for (const producto of productos) {
            producto.PRICE = producto.PRICE.toFixed(2);
        }
        res.status(200).json(responseJson(200, "success", productos))
    } else
        res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerProductosPorCategoria(req = request, res = response) {
    const { category } = req.params;
    const categories = await getAllCategorias();
    let currentCategory;
    for (const cat of categories) {
        if (cat.NAME.toLowerCase() == category.toLowerCase()) {
            currentCategory = cat.IDCATEGORIA;
            break;
        }
    }
    if (currentCategory) {
        const productos = await getAllAviavilityProductosByCategory(currentCategory);
        if (productos.length > 0) {
            for (const producto of productos) {
                producto.PRICE = producto.PRICE.toFixed(2);
            }
            res.status(200).json(responseJson(200, "success", productos))
        } else {
            res.status(404).json(responseJson(404, "no existen productos"))
        }
    } else {
        return res.status(404).json(responseJson(404, "la categoria no existe"))
    }
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

// async function obtenerProductosTodo(req = request, res = response) {
//     const productos = await getAllProductos();
//     if (productos.length > 0) {
//         for (const producto of productos) {
//             producto.PRICE = producto.PRICE.toFixed(2);
//         }
//         res.status(200).json(responseJson(200, "success", productos))
//     } else
//         res.status(404).json(responseJson(404, "no existe"))
// }

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
    obtenerProductosPorCategoria,
    obtenerProductosTodo,
    crearProducto,
    actualizarProducto,
    borrarProducto
};
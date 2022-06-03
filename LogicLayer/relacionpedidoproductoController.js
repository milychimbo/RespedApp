const {request,response} = require('express');
const {getAllRelacionPedidoProducto,getPedidoProducto,createPedidoProducto } = require('../DataLayer/relacionpedidoproducto');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerPedidosProductos(req = request,res = response){
   
    const pedidosproductos = await getAllRelacionPedidoProducto();
    if(pedidosproductos.length>0)
    res.status(200).json(responseJson(200, "success", pedidosproductos))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerPedidoProducto(req = request,res = response){
    const pedidoproducto = await getPedidoProducto(req.params.id);
    if(pedidoproducto!=null)
    res.status(200).json(responseJson(200, "success", pedidoproducto))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function crearPedidoProducto(req = request,res = response){
    const pedidoproducto = await createPedidoProducto(req.body);
    if(Object.keys(pedidoproducto)[0]=="dataValues")
    res.status(200).json(responseJson(200, "success"))
    else
    res.status(400).json(responseJson(400, "no se pudo crear",pedidoproducto))
}

module.exports= {obtenerPedidosProductos,obtenerPedidoProducto,crearPedidoProducto};
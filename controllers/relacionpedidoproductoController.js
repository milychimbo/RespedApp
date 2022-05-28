const {request,response} = require('express');
const {getAllRelacionPedidoProducto,getPedidoProducto,getProductoPedido,createPedidoProducto,updatePedidoProducto,deletePedidoProducto } = require('../models/relacionpedidoproducto');
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

async function obtenerProductoPedido(req = request,res = response){
    const productopedido = await getProductoPedido(req.params.id);
    if(productopedido!=null)
    res.status(200).json(responseJson(200, "success", productopedido))
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

async function actualizarPedidoProducto(req = request,res = response){
   const pedidoproducto = await updatePedido(req.body);
   if(pedidoproducto==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarPedidoProducto(req = request,res = response){
    const pedidoproducto = await deletePedido(req.body);
    if(pedidoproducto==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerPedidosProductos,obtenerPedidoProducto,obtenerProductoPedido,crearPedidoProducto,actualizarPedidoProducto,borrarPedidoProducto};
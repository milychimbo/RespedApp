const {request,response} = require('express');
const {getAllPedidos, getOnePedido, updatePedido, deletePedido, createPedido} = require('../models/pedido');
const { responseJson } = require('../helpers/handleGenericFunction');



async function obtenerPedidos(req = request,res = response){
    const pedidos = await getAllPedidos();
    if(pedidos.length>0)
    res.json(responseJson(200, "success", pedidos))
    else
    res.json(responseJson(204, "no existe"))
}

async function obtenerPedidoId(req = request,res = response){
    const pedido = await getOnePedido(req.params.id);
    if(pedido!=null)
    res.json(responseJson(200, "success", pedido))
    else
    res.json(responseJson(204, "no existe"))
}

async function crearPedido(req = request,res = response){
    const pedido = await createPedido(req.body);
    if(Object.keys(pedido)[0]=="dataValues")
    res.json(responseJson(200, "success"))
    else
    res.json(responseJson(400, "no se pudo crear",pedido))
}

async function actualizarPedido(req = request,res = response){
   const pedido = await updatePedido(req.body);
   if(pedido==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarPedido(req = request,res = response){
    const pedido = await deletePedido(req.params.id);
    if(pedido==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerPedidos,obtenerPedidoId,crearPedido,actualizarPedido,borrarPedido};
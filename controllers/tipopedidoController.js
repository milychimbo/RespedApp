const {request,response} = require('express');
const {getAllTipoPedidos, getOneTipoPedido, updateTipoPedido, deleteTipoPedido, createTipoPedido} = require('../models/tipopedido');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerTipoPedidos(req = request,res = response){
    const tipopedidos = await getAllTipoPedidos();
    if(tipopedidos.length>0)
    res.status(200).json(responseJson(200, "success", tipopedidos))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerTipoPedidoId(req = request,res = response){
    const tipopedido = await getOneTipoPedido(req.params.id);
    if(tipopedido!=null)
    res.status(200).json(responseJson(200, "success", tipopedido))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function crearTipoPedido(req = request,res = response){
    const tipopedido = await createTipoPedido(req.body);
    if(Object.keys(tipopedido)[0]=="dataValues")
    res.status(200).json(responseJson(200, "success"))
    else
    res.status(400).json(responseJson(400, "no se pudo crear",tipopedido))
}

async function actualizarTipoPedido(req = request,res = response){
   const tipopedido = await updateTipoPedido(req.body);
   if(tipopedido==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarTipoPedido(req = request,res = response){
    const tipopedido = await deleteTipoPedido(req.params.id);
    if(tipopedido==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerTipoPedidos,obtenerTipoPedidoId,crearTipoPedido,actualizarTipoPedido,borrarTipoPedido};
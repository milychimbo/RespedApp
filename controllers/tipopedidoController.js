const {request,response} = require('express');
const {getAllTipoPedidos, getOneTipoPedido, updateTipoPedido} = require('../models/tipopedido');
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

async function actualizarTipoPedido(req = request,res = response){
   const tipopedido = await updateTipoPedido(req.body);
   if(tipopedido==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}


module.exports= {obtenerTipoPedidos,obtenerTipoPedidoId,actualizarTipoPedido};
const {request,response} = require('express');
const {getAllPedidosLocales, getOnePedidoLocal, createPedidoLocal} = require('../DataLayer/pedidolocal');
const {getOnePedido,createPedido,updatePedido} = require('../DataLayer/pedidototal');
const {getOneEstado} = require('../DataLayer/estado');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerPedidosLocales(req = request,res = response){
    const pedidos = await getAllPedidosLocales();
    if(pedidos.length>0)
    res.status(200).json(responseJson(200, "success", pedidos))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerPedidoLocalID(req = request,res = response){
    const pedido = await getOnePedidoLocal(req.params.id);
    if(pedido!=null){
        const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL)
        const state = await getOneEstado(pedidoTotal.IDSTATE)
        const pedidoJson={
            "IDPEDIDO": pedido.IDPEDIDO,
            "MESA": pedido.MESA,
            "VALORTOTAL": pedidoTotal.VALORTOTAL,
            "NOTE": pedidoTotal.NOTE,
            "STATE": state.STATE
        }
        res.status(200).json(responseJson(200, "success", pedidoJson))
    }
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function crearPedidoLocal(req = request,res = response){
    const pedidoTotalJson = {
        "VALORTOTAL": 0,
        "IDSTATE": 1
    }
    const pedidototal = await createPedido(pedidoTotalJson);
    if(Object.keys(pedidototal)[0]=="dataValues"){
         const pedidoJson = {
                "IDUSUARIO": req.body.IDUSUARIO,
                "IDPEDIDOTOTAL": pedidototal.IDPEDIDOTOTAL,
                "MESA": req.body.MESA
            }
            const pedido = await createPedidoLocal(pedidoJson);
            if(Object.keys(pedido)[0]=="dataValues"){
                res.status(200).json(responseJson(200, "success"))
               }
               else
               {
                res.status(400).json(responseJson(400, "no se pudo crear pedido local",pedido))
               }
               
        }
        else
        res.status(400).json(responseJson(400, "no se pudo crear pedido total",pedidototal))
}

async function actualizarPedidoTotal(req = request,res = response){
   const pedido = await updatePedido(req.body);
   if(pedido==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarPedido(req = request,res = response){
    const pedido = await deletePedido(req.params.id);
    if(pedido==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerPedidosLocales,obtenerPedidoLocalID,crearPedidoLocal,actualizarPedidoTotal,borrarPedido};
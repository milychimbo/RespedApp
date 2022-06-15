const {request,response} = require('express');
const {getAllPedidosLocales, getOnePedidoLocal, createPedidoLocal} = require('../DataLayer/pedidolocal');
const {getOnePedido,createPedido,updatePedido} = require('../DataLayer/pedidototal');
const {getOneEstado} = require('../DataLayer/estado');
const { responseJson } = require('../helpers/handleGenericFunction');
const { getOneProducto } = require('../DataLayer/producto');
const { generateUUID } = require('../middlewares/generateUUID');
const { createPedidoProducto } = require('../DataLayer/relacionpedidoproducto');


async function obtenerPedidosLocales(req = request,res = response){
    const pedidos = await getAllPedidosLocales();
    if(pedidos.length>0)
    res.status(200).json(responseJson(200, "success", pedidos))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function crearPedido(req = request,res = response){
    const listaProductos = req.body;
    let valorTotal=0;
    let infoProductos = [];
    if (Object.keys(req.body).length != 0) {
        listaProductos.forEach(async (idproducto,index) => {
            let producto = await getOneProducto(idproducto)
            let info = {
             "IDPRODUCTO": producto.IDPRODUCTO,
              "PRICE": producto.PRICE
            }
            infoProductos.push(info)
            valorTotal=valorTotal+producto.PRICE;
            if(index==listaProductos.length-1){
              const idState = 1;
              const numPedido = generateUUID();
              const pedidoJson={
                 "NUMPEDIDO": numPedido,
                 "VALORTOTAL": valorTotal,
                 "IDSTATE": idState
              }
              const pedidoTotal = await createPedido(pedidoJson)
              
              // AQUI CREAR RELACION
              infoProductos.forEach(async (el)=>{
                 
                 const relacionJson={
                     "IDPEDIDOTOTAL": pedidoTotal.IDPEDIDOTOTAL,
                     "IDPRODUCTO": el.IDPRODUCTO,
                     "PRICE": el.PRICE
                  }
                  await createPedidoProducto(relacionJson)
              })
              
              const respuesta={
                "NUMPEDIDO": numPedido,
                "NUMITEMS": listaProductos.length,
                "VALORTOTAL": valorTotal.toFixed(2)
             }
              res.status(200).json(responseJson(200, "success",respuesta))
              
            }
         });
    }
    else{
    res.status(404).json(responseJson(404, "no puede ser vacio"))
    }
    
    
   
    //res.status(200).json(responseJson(200, "success", listaProductos))
   /* const pedido = await getOnePedidoLocal(req.params.id);
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
    res.status(404).json(responseJson(404, "no existe"))*/
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


module.exports= {obtenerPedidosLocales,obtenerPedidoLocalID,crearPedido,crearPedidoLocal,actualizarPedidoTotal,borrarPedido};
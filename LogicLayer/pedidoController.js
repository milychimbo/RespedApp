const {request,response} = require('express');
const {getAllPedidosLocales, createPedidoLocal} = require('../DataLayer/pedidolocal');
const {createPedidoDomicilio,getAllPedidosDomicilio} = require('../DataLayer/pedidodomicilio');
const {createPedidoReserva,getAllPedidosReserva} = require('../DataLayer/pedidoreserva');
const {getAllPedidos,getOnePedido,createPedido,updatePedido,deletePedido} = require('../DataLayer/pedidototal');
const {getOneEstado} = require('../DataLayer/estado');
const {getOneDireccion} = require('../DataLayer/direccion');
const { responseJson } = require('../helpers/handleGenericFunction');
const { getOneProducto } = require('../DataLayer/producto');
const { generateUUID } = require('../middlewares/generateUUID');
const { createPedidoProducto,getPedidoProducto} = require('../DataLayer/relacionpedidoproducto');
const { getRelacion } = require('../DataLayer/relacionusuariodireccion');
const { getOneReserva } = require('../DataLayer/reserva');

async function obtenerPedidos(req = request,res = response){
    const pedidos = await getAllPedidos();
    if(pedidos.length>0)
    res.status(200).json(responseJson(200, "success", pedidos))
    else
    res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosLocales(req = request,res = response){
    const pedidos = await getAllPedidosLocales();
    const respuestas =[];
    if(pedidos.length>0){
        pedidos.forEach(async (pedido,index) =>{
            const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
            const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
            const arrayProductos = [];
            productos.forEach(async (producto,index1) =>{
                const productovar = await getOneProducto(producto.IDPRODUCTO)
                arrayProductos.push(productovar.NAME)
                if(index1==(productos.length-1)){
                    const estado = await getOneEstado(pedidoTotal.IDSTATE);
                    const respuesta = {
                        "IDPEDIDO": pedido.IDPEDIDO,
                        "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                        "PRODUCTOS": arrayProductos,
                        "ESTADO": estado.STATE,
                        "MESA": pedido.MESA,
                        "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                        "NOTE": pedidoTotal.NOTE
                    }
                    respuestas.push(respuesta);
                    if(index==(pedidos.length-1)){
                        res.status(200).json(responseJson(200, "success", respuestas))
                    }
                }
            })
            //const arrayProductos = await getOneProducto(pedido.IDPEDIDOTOTAL);
            
        })
    }
    else
    res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosDomicilio(req = request,res = response){
    const pedidos = await getAllPedidosDomicilio();
    const respuestas =[];
    if(pedidos.length>0){
        pedidos.forEach(async (pedido,index) =>{
            const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
            const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
            const arrayProductos = [];
            productos.forEach(async (producto,index1) =>{
                const productovar = await getOneProducto(producto.IDPRODUCTO)
                arrayProductos.push(productovar.NAME)
                if(index1==(productos.length-1)){
                    const estado = await getOneEstado(pedidoTotal.IDSTATE);
                    const relacion = await getRelacion(pedido.IDRELACIONUD);
                    const direccion = await getOneDireccion(relacion.IDDIRECCION);
                    const respuesta = {
                        "IDPEDIDO": pedido.IDPEDIDO,
                        "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                        "PRODUCTOS": arrayProductos,
                        "ESTADO": estado.STATE,
                        "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                        "NOTE": pedidoTotal.NOTE,
                        "DIRECCION": direccion
                    }
                    respuestas.push(respuesta);
                    if(index==(pedidos.length-1)){
                        res.status(200).json(responseJson(200, "success", respuestas))
                    }
                }
            })
            //const arrayProductos = await getOneProducto(pedido.IDPEDIDOTOTAL);
            
        })
    }
    else
    res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosReserva(req = request,res = response){
    const pedidos = await getAllPedidosReserva();
    const respuestas =[];
    if(pedidos.length>0){
        pedidos.forEach(async (pedido,index) =>{
            const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
            const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
            const arrayProductos = [];
            productos.forEach(async (producto,index1) =>{
                const productovar = await getOneProducto(producto.IDPRODUCTO)
                arrayProductos.push(productovar.NAME)
                if(index1==(productos.length-1)){
                    const estado = await getOneEstado(pedidoTotal.IDSTATE);
                    const reserva = await getOneReserva(pedido.IDRESERVA);
                    const respuesta = {
                        "IDPEDIDO": pedido.IDPEDIDO,
                        "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                        "PRODUCTOS": arrayProductos,
                        "ESTADO": estado.STATE,
                        "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                        "NOTE": pedidoTotal.NOTE,
                        "RESERVA": reserva
                    }
                    respuestas.push(respuesta);
                    if(index==(pedidos.length-1)){
                        res.status(200).json(responseJson(200, "success", respuestas))
                    }
                }
            })
            //const arrayProductos = await getOneProducto(pedido.IDPEDIDOTOTAL);
            
        })
    }
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
                "IDPEDIDOTOTAL": pedidoTotal.IDPEDIDOTOTAL,
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

async function crearPedidoLocal(req = request,res = response){
    const pedidoLocalJson = {
        "IDUSUARIO": req.currentToken.IDUSUARIO ,
        "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL,
        "MESA": req.body.MESA
    }

   const pedido = await createPedidoLocal(pedidoLocalJson);
    if(Object.keys(pedido)[0]=="dataValues"){
        const requestNota ={
            "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL,
            "NOTE": req.body.NOTE
        }
        await updatePedido(requestNota);
         res.status(200).json(responseJson(200, "success"))
     }
    else
    {
     res.status(400).json(responseJson(400, "no se pudo crear pedido local",pedido.parent.sqlMessage))
    }
}

async function crearPedidoDomicilio(req = request,res = response){
    const pedidoDomicilioJson = {
        "IDRELACIONUD": req.body.IDRELACIONUD ,
        "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL
    }

   const pedido = await createPedidoDomicilio(pedidoDomicilioJson);
    if(Object.keys(pedido)[0]=="dataValues"){
        const requestNota ={
            "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL,
            "NOTE": req.body.NOTE
        }
        await updatePedido(requestNota);
         res.status(200).json(responseJson(200, "success"))
     }
    else
    {
     res.status(400).json(responseJson(400, "no se pudo crear pedido a domicilio",pedido.parent.sqlMessage))
    }
}

async function crearPedidoReserva(req = request,res = response){
    const pedidoReservaJson = {
        "IDRESERVA": req.body.IDRESERVA ,
        "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL
    }
   const pedido = await createPedidoReserva(pedidoReservaJson);
    if(Object.keys(pedido)[0]=="dataValues"){
        const requestNota ={
            "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL,
            "NOTE": req.body.NOTE
        }
        await updatePedido(requestNota);
         res.status(200).json(responseJson(200, "success"))
     }
    else
    {
     res.status(400).json(responseJson(400, "no se pudo crear pedido de reserva",pedido.parent.sqlMessage))
    }
}



async function borrarPedido(req = request,res = response){
    const pedido = await deletePedido(req.params.id);
    if(pedido==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerPedidos,obtenerPedidosLocales,obtenerPedidosDomicilio,obtenerPedidosReserva,crearPedido,crearPedidoLocal,crearPedidoDomicilio,crearPedidoReserva,borrarPedido};
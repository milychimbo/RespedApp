const {request,response} = require('express');
const { responseJson } = require('../helpers/handleGenericFunction');
const {getAllReservas, getOneReserva, createReserva, updateReserva,deleteReserva} = require('../models/reserva');



async function obtenerReservas(req = request,res = response){
    const reservas = await getAllReservas();
    if(reservas.length>0)
    res.json(responseJson(200, "success", reservas))
    else
    res.json(responseJson(204, "no existe"))
}

async function obtenerReservaID(req = request,res = response){
    const reserva = await getOneReserva(req.params.id);
    if(reserva!=null)
    res.json(responseJson(200, "success", reserva))
    else
    res.json(responseJson(204, "no existe"))
}

async function crearReserva(req = request,res = response){
   const reserva = await createReserva(req.body);
   if(Object.keys(reserva)[0]=="dataValues")
    res.json(responseJson(200, "success"))
    else
    res.json(responseJson(400, "no se pudo crear",reserva))
}

async function actualizarReserva(req = request,res = response){
   const reserva = await updateReserva(req.body);
   if(reserva==1)
   res.json(responseJson(201, "success"))
   else
   res.json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarReserva(req = request,res = response){
    const reserva = await deleteReserva(req.params.id);
    if(reserva==1)
    res.json(responseJson(201, "success"))
    else
    res.json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerReservas,obtenerReservaID,crearReserva,actualizarReserva,borrarReserva};
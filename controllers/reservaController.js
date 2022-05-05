const {request,response} = require('express');
const {getAllReservas, getOneReserva, createReserva, updateReserva,deleteReserva} = require('../models/reserva');



async function obtenerReservas(req = request,res = response){
    const reservas = await getAllReservas();
    res.json(reservas)
}

async function obtenerReservaID(req = request,res = response){
    const user = await getOneReserva(req.params.id);
    res.json(user)
}

async function crearUsuario(req = request,res = response){
    const userObj = req.body;
   const user = await createReserva(userObj);
   res.send(user) //me devuelve el user
}

async function actualizarUsuario(req = request,res = response){
    const userObj = req.body;
   const user = await updateReserva(userObj);
   res.send(user) //me devuelve 1 si actualizo o 0 si no
}

async function borrarUsuario(req = request,res = response){
    const user = await deleteReserva(req.params.id);
    res.json(user)
}


module.exports= {obtenerUsuarios,obtenerUsuarioId,crearUsuario,actualizarUsuario,borrarUsuario};
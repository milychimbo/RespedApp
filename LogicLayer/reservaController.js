const {
    request,
    response
} = require('express');
const {
    responseJson
} = require('../helpers/handleGenericFunction');
const {
    getAllReservas,
    getOneReserva,
    getUsuarioReserva,
    createReserva,
    updateReserva,
    deleteReserva
} = require('../DataLayer/reserva');


async function obtenerReservas(req = request, res = response) {

    const reservas = await getAllReservas();
    if (reservas.length > 0)
        res.status(200).json(responseJson(200, "success", reservas))
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerUsuarioReserva(req = request,res = response){
    const reservas = await getUsuarioReserva(req.params.id);
    var obj1 = new Array;
    if(reservas.length>0){
        reservas.forEach(async (reserva,index)=> {
            const reservaResponse = await getOneReserva(reserva.IDRESERVA);
            obj1.push(reservaResponse);
            if(index==(reservas.length-1)){
                res.status(200).json(responseJson(200, "success", obj1))
            }
        });
    }
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerReservaID(req = request, res = response) {
    const reserva = await getOneReserva(req.params.id);
    if (reserva != null)
        res.status(200).json(responseJson(200, "success", reserva))
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function crearReserva(req = request, res = response) {
    const reserva = await createReserva(req.body);
    if (Object.keys(reserva)[0] == "dataValues")
        res.status(200).json(responseJson(200, "success"))
    else
        res.status(400).json(responseJson(400, "no se pudo crear", reserva))
}

async function actualizarReserva(req = request, res = response) {
    const reserva = await updateReserva(req.body);
    if (reserva == 1)
        res.status(201).json(responseJson(201, "success"))
    else
    {
        if(reserva[0]==0){
            res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
            
        }
        else{
            res.status(400).json(responseJson(400, "no se puede actualizar",reserva.parent.sqlMessage)) //me devuelve 1 si actualizo o 0 si no
        }
    }
}

async function borrarReserva(req = request, res = response) {

    const reserva = await deleteReserva(req.params.id);
    if (reserva == 1)
        res.status(201).json(responseJson(201, "success"))
    else
        res.status(200).json(responseJson(200, "no hubo cambios"))
}

module.exports = {
    obtenerReservas,
    obtenerReservaID,
    obtenerUsuarioReserva,
    crearReserva,
    actualizarReserva,
    borrarReserva
};
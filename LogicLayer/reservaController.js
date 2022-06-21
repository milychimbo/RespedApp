const {
    request,
    response
} = require('express');
const {
    responseJson
} = require('../helpers/handleGenericFunction');
const {
    getAllReservas,
    getReservasPorUsuario,
    createReserva,
    updateReserva,
    deleteReserva,
    getReservasPorEstado
} = require('../DataLayer/reserva');
const { generateUUID } = require('../middlewares/generateUUID');
const { getOneUser } = require('../DataLayer/usuario');
const { getOneEstado } = require('../DataLayer/estado2');


async function obtenerReservas(req = request, res = response) {
    const reservas = await getAllReservas();
   
    if (reservas.length > 0){
        reservas.forEach(async (reserva,index) => {
            //nombreusuario
            const usuario = await getOneUser(reserva.IDUSUARIO);
            let nombre = usuario.NAME;
            let apellido = usuario.LASTNAME;
            if(nombre==null){
                if(apellido==null){
                    nombre = usuario.USERNAME;
                }
                else{
                    nombre = usuario.LASTNAME;
                }
            }
            else{
                if(apellido!=null){
                    nombre = usuario.NAME+ " "+usuario.LASTNAME;
                }
            }
            //estadoreserva
            const estado = await getOneEstado(reserva.IDSTATE);
            const reservaJson={
                "IDRESERVA": reserva.IDRESERVA,
                "NUMRESERVA": reserva.NUMRESERVA,
                "NAME": nombre,
                "PEOPLE": reserva.PEOPLE,
                "NOTE": reserva.NOTE,
                "RESERVATIONDATE": reserva.RESERVATIONDATE,
                "RESERVATIONTIME": reserva.RESERVATIONTIME,
                "STATE": estado.STATE
            }
            arrayReservas.push(reservaJson);
            if(index==(reservas.length-1)){
                res.status(200).json(responseJson(200, "success", arrayReservas))
            }
        });
    }
    else
        res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerReservasUsuario(req = request, res = response) {
    const reservas = await getReservasPorUsuario(req.currentToken.IDUSUARIO);
    const arrayReservas = [];
    if (reservas.length>0){
        reservas.forEach(async (reserva,index) => {
            //estadoreserva
            const estado = await getOneEstado(reserva.IDSTATE);
            const reservaJson={
                "IDRESERVA": reserva.IDRESERVA,
                "NUMRESERVA": reserva.NUMRESERVA,
                "PEOPLE": reserva.PEOPLE,
                "NOTE": reserva.NOTE,
                "RESERVATIONDATE": reserva.RESERVATIONDATE,
                "RESERVATIONTIME": reserva.RESERVATIONTIME,
                "STATE": estado.STATE
            }
            arrayReservas.push(reservaJson);
            if(index==(reservas.length-1)){
                res.status(200).json(responseJson(200, "success", arrayReservas))
            }
        });
    }
        
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerReservasPorEstado(req = request, res = response) {
    const reservas = await getReservasPorEstado(req.params.id);
    const arrayReservas = [];
    if (reservas.length>0){
        reservas.forEach(async (reserva,index) => {
            //nombreusuario
            const usuario = await getOneUser(reserva.IDUSUARIO);
            let nombre = usuario.NAME;
            let apellido = usuario.LASTNAME;
            if(nombre==null){
                if(apellido==null){
                    nombre = usuario.USERNAME;
                }
                else{
                    nombre = usuario.LASTNAME;
                }
            }
            else{
                if(apellido!=null){
                    nombre = usuario.NAME+ " "+usuario.LASTNAME;
                }
            }
            //estadoreserva
            const reservaJson={
                "IDRESERVA": reserva.IDRESERVA,
                "NUMRESERVA": reserva.NUMRESERVA,
                "NAME": nombre,
                "PEOPLE": reserva.PEOPLE,
                "NOTE": reserva.NOTE,
                "RESERVATIONDATE": reserva.RESERVATIONDATE,
                "RESERVATIONTIME": reserva.RESERVATIONTIME,
                "STATE": reserva.IDSTATE
            }
            arrayReservas.push(reservaJson);
            if(index==(reservas.length-1)){
                res.status(200).json(responseJson(200, "success", arrayReservas))
            }
        });
    }
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function crearReserva(req = request, res = response) {
   const reservaJson={
        "NUMRESERVA": generateUUID(),
        "IDUSUARIO": req.currentToken.IDUSUARIO,
        "PEOPLE": req.body.PEOPLE,
        "NOTE": req.body.NOTE,
        "RESERVATIONDATE": req.body.RESERVATIONDATE,
        "RESERVATIONTIME": req.body.RESERVATIONTIME,
        "IDSTATE": 1
    }
    const reserva = await createReserva(reservaJson);
    if (Object.keys(reserva)[0] == "dataValues")
        res.status(200).json(responseJson(200, "success",reserva.IDRESERVA))
    else
        res.status(400).json(responseJson(400, "no se pudo crear", reserva.parent.sqlMessage))
}

async function actualizarReserva(req = request, res = response) {
    if(req.body.IDSTATE==1){
            res.status(200).json(responseJson(200, "no hubo cambios"))
    }
    else{
        const reserva = await updateReserva(req.body);
        if (reserva == 1){
            if(req.body.IDSTATE==2){
                //ENVIAR WHATSAPP
                res.status(201).json(responseJson(201, "success"))
            }
            if(req.body.IDSTATE==3){
                //no hacer nadsa
                res.status(201).json(responseJson(201, "success"))
            }
            if(req.body.IDSTATE==4){
                //ENVIAR WHATSAPP
                res.status(201).json(responseJson(201, "success"))
            }
        }
        // res.status(201).json(responseJson(201, "success"))
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
    
}

async function enviarWpp(req = request, res = response) {
    
    // res.status(200).json(responseJson(200, "se mando")) //me devuelve 1 si actualizo o 0 si no
    //  res.status(400).json(responseJson(400, "no se puede mandar")) //me devuelve 1 si actualizo o 0 si no
          
    
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
    obtenerReservasPorEstado,
    obtenerReservasUsuario,
    crearReserva,
    actualizarReserva,
    borrarReserva
};
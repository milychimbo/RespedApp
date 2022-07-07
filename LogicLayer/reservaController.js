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
    getReservasPorEstado
} = require('../DataLayer/reserva');
const { generateUUID } = require('../middlewares/generateUUID');
const { getOneUser } = require('../DataLayer/usuario');
const { getOneEstado } = require('../DataLayer/estado2');
const { enviarEmail } = require('../helpers/enviarMail');
const correo = require('../views/correo.js')


async function obtenerReservasUsuario(req = request, res = response) {//ARREGLADO
    const reservas = await getReservasPorUsuario(req.currentToken.IDUSUARIO);
    let arrayReservas = [];
    if (reservas.length>0){
        for (const reserva of reservas) {
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
            arrayReservas = [
                ...arrayReservas,
                reservaJson
            ]
        }
        res.status(200).json(responseJson(200, "success", arrayReservas))
    }
        
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerReservasPorEstado(req = request, res = response) { //ARREGLADO
    const reservas = await getReservasPorEstado(req.params.id);
    let arrayReservas = [];
    if (reservas.length>0){
        for (const reserva of reservas) {
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
            arrayReservas = [
                ...arrayReservas,
                reservaJson
            ]
            
        }
        res.status(200).json(responseJson(200, "success", arrayReservas))
    }
    else
        res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerReservasHoy(req = request, res = response) { //ARREGLADO
    const year = new Date().getFullYear();
    let month = new Date().getUTCMonth()+1;
    if(month<10){
        month="0"+month;
    }
    let day = new Date().getDate();
    if(day<10){
        day="0"+day;
    }
    const hoy=year+"-"+month+"-"+day
    let arrayReservas=[];
    const reservas = await getAllReservas();
    if (reservas.length > 0){
    for (const reserva of reservas) {
        if(hoy==reserva.RESERVATIONDATE){
            if(reserva.IDSTATE==2){
                const usuarioResponse = await getOneUser(reserva.IDUSUARIO);
                const nombre=usuarioResponse.NAME?usuarioResponse.NAME:"";
                const apellido=usuarioResponse.LASTNAME?usuarioResponse.LASTNAME:"";
                let persona=nombre+" "+apellido;
                if(persona==" "){
                    persona = usuarioResponse.USERNAME;
                }
                const reservaJson ={
                    "NUMRESERVA": reserva.NUMRESERVA,
                    "HORA": reserva.RESERVATIONTIME,
                    "NOMBRE": persona
                }
                    arrayReservas = [
                        ...arrayReservas,
                        reservaJson
                    ]
            }
        }
    }
        res.status(200).json(responseJson(200, "success", arrayReservas))
    }
    else
        res.status(404).json(responseJson(404, "no existe"))
}
async function crearReserva(req = request, res = response) {
    var mailOptions = {
        from: 'noreplyfdcoz@gmail.com',
        to: req.currentToken.EMAIL,
        subject: 'Tu reserva ha sido recibida',
        html: correo.reservaMail
      };
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
    if (Object.keys(reserva)[0] == "dataValues"){
        res.status(200).json(responseJson(200, "success",reserva.IDRESERVA));
        enviarEmail(mailOptions);
    }
       
    else
        res.status(400).json(responseJson(400, "no se pudo crear", reserva.parent.sqlMessage))
}

async function actualizarReserva(req = request, res = response) { //ARREGLADO
    if(req.body.IDSTATE==1){
            res.status(200).json(responseJson(200, "no hubo cambios"))
    }
    else{
        const reserva = await updateReserva(req.body);
        if (reserva == 1){
            if(req.body.IDSTATE==2){
                var mailOptions = {
                    from: 'noreplyfdcoz@gmail.com',
                    to: req.currentToken.EMAIL,
                    subject: 'Tu reserva ha sido confirmada',
                    html: correo.reservaConfirmadaMail
                  };
                res.status(201).json(responseJson(201, "success"))
                enviarEmail(mailOptions);
            }
            if(req.body.IDSTATE==3){
                res.status(201).json(responseJson(201, "success"))
            }
            if(req.body.IDSTATE==4){
                var mailOptions = {
                    from: 'noreplyfdcoz@gmail.com',
                    to: req.currentToken.EMAIL,
                    subject: '¡Oh no! Tu reserva ha sido rechazada',
                    html: correo.reservaRechazadaMail
                  };
                res.status(201).json(responseJson(201, "success"))
                enviarEmail(mailOptions);
            }
        }
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


module.exports = {
    obtenerReservasPorEstado,
    obtenerReservasUsuario,
    obtenerReservasHoy,
    crearReserva,
    actualizarReserva
};
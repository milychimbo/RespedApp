const {request,response} = require('express');
const {getOneDireccion,updateDireccion, deleteDireccion, createDireccion} = require('../DataLayer/direccion');
const {getUsuarioDireccion,createUsuarioDireccion} = require('../DataLayer/relacionusuariodireccion');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerUsuarioDireccion(req = request,res = response){
    const direcciones = await getUsuarioDireccion(req.params.id);
    var obj1 = new Array;
    if(direcciones.length>0){
        direcciones.forEach(async (direccion,index)=> {
            const direccionResponse = await getOneDireccion(direccion.IDDIRECCION);
            obj1.push(direccionResponse);
            if(index==(direcciones.length-1)){
                res.status(200).json(responseJson(200, "success", obj1))
            }
        });
    }
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function crearDireccion(req = request,res = response){
    let direccionJson;
    let relacionJson;
    if(req.body.REFERENCE){
        direccionJson={
            "STREET1": req.body.STREET1,
            "STREET2": req.body.STREET2,
            "REFERENCE": req.body.REFERENCE,
        }
    }
    else{
        direccionJson={
            "STREET1": req.body.STREET1,
            "STREET2": req.body.STREET2
        }
    }
    const direccion = await createDireccion(direccionJson);
    if(Object.keys(direccion)[0]=="dataValues"){
       relacionJson={
           "IDUSUARIO": req.body.IDUSUARIO,
           "IDDIRECCION": direccion.IDDIRECCION,
       }
        const relacion = await createUsuarioDireccion(relacionJson);
        console.log(relacionJson)
        if(Object.keys(relacion)[0]=="dataValues")
            res.status(200).json(responseJson(200, "success"));
         else{
             await deleteDireccion(direccion.IDDIRECCION);
             res.status(400).json(responseJson(400, "no se pudo crear",relacion.parent.sqlMessage));
         }
             
    }
    else
    {
        res.status(400).json(responseJson(400, "no se pudo crear",direccion.message))
    }
    
}

async function actualizarDireccion(req = request,res = response){
   const direccion = await updateDireccion(req.body);
   if(direccion==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}

async function borrarDireccion(req = request,res = response){
    const direccion = await deleteDireccion(req.params.id);
    if(direccion==1)
   res.status(201).json(responseJson(201, "success"))
   else
   res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports= {obtenerUsuarioDireccion,crearDireccion,actualizarDireccion,borrarDireccion};
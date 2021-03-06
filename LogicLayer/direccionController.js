const { request, response } = require('express');
const { getOneDireccion, updateDireccion, deleteDireccion, createDireccion } = require('../DataLayer/direccion');
const { getUsuarioDireccion, updateUsuarioDireccion, createUsuarioDireccion } = require('../DataLayer/relacionusuariodireccion');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerUsuarioDireccion(req = request, res = response) {
    const direcciones = await getUsuarioDireccion(req.currentToken.IDUSUARIO);
    let resultDirecciones = [];
    
    if (direcciones.length > 0) {
        for (const relacionDireccion of direcciones) {
            const direccionResponse = await getOneDireccion(relacionDireccion.IDDIRECCION);
            if (direccionResponse != null) {
                const newAddress = direccionResponse;
                newAddress.dataValues.DEFAULTDIR = relacionDireccion.DEFAULTDIR;
                newAddress.dataValues.IDRELACIONUD = relacionDireccion.IDRELACIONUD;

                resultDirecciones = [
                    ...resultDirecciones,
                    newAddress.dataValues
                ]
            }
        }
        res.status(200).json(responseJson(200, "success", resultDirecciones))
    }
    else {
        res.status(404).json(responseJson(404, "no existe", direcciones));
    }
}

async function obtenerDireccionId(req = request, res = response) {
    const direccion = await getOneDireccion(req.params.id);
    if (direccion != null) {
        res.status(200).json(responseJson(200, "success", direccion))
    }
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function crearDireccion(req = request, res = response) {
    let direccionJson;
    let relacionJson;
    if (req.body.REFERENCE) {
        direccionJson = {
            "STREET1": req.body.STREET1,
            "STREET2": req.body.STREET2,
            "REFERENCE": req.body.REFERENCE,
            "NAME": req.body.NAME,
            "PHONEDIR": req.body.PHONEDIR
        }
    }
    else {
        direccionJson = {
            "STREET1": req.body.STREET1,
            "STREET2": req.body.STREET2,
            "NAME": req.body.NAME,
            "PHONEDIR": req.body.PHONEDIR
        }
    }
    const direccion = await createDireccion(direccionJson);
    relacionJson = {
        "IDUSUARIO": req.currentToken.IDUSUARIO,
        "IDDIRECCION": direccion.IDDIRECCION,
        "DEFAULTDIR": req.body.DEFAULTDIR,
    }
    var aux = 0
    if (Object.keys(direccion)[0] == "dataValues") {
        const direcciones = await getUsuarioDireccion(req.currentToken.IDUSUARIO);
        if (direcciones.length > 0) {
            if (req.body.DEFAULTDIR == true) {
                direcciones.forEach(async (direccionx) => {
                    if (direccionx.DEFAULTDIR == true) {
                        const update = {
                            "IDRELACIONUD": direccionx.IDRELACIONUD,
                            "DEFAULTDIR": false,
                        }
                        const respuesta = await updateUsuarioDireccion(update)
                        if (respuesta != 1) {
                            aux++;
                            await deleteDireccion(direccion.IDDIRECCION);
                            res.status(400).json(responseJson(400, "no se pudo crear", respuesta));
                        }
                    }
                });

            }
            if (aux == 0) {
                const relacion = await createUsuarioDireccion(relacionJson);
                if (Object.keys(relacion)[0] == "dataValues")
                    res.status(200).json(responseJson(200, "success"));
                else {
                    await deleteDireccion(direccion.IDDIRECCION);
                    res.status(400).json(responseJson(400, "no se pudo crear", relacion.parent.sqlMessage));
                }
            }
        }
        else {
            relacionJson = {
                "IDUSUARIO": req.currentToken.IDUSUARIO,
                "IDDIRECCION": direccion.IDDIRECCION,
                "DEFAULTDIR": true,
            }
            const relacion = await createUsuarioDireccion(relacionJson);
            if (Object.keys(relacion)[0] == "dataValues")
                res.status(200).json(responseJson(200, "success"));
            else {
                await deleteDireccion(direccion.IDDIRECCION);
                res.status(400).json(responseJson(400, "no se pudo crear", relacion.parent.sqlMessage));
            }
        }


    }
    else {
        res.status(400).json(responseJson(400, "no se pudo crear", direccion.message))
    }

}

async function actualizarDireccion(req = request, res = response) { //CORREGIDO
    const direccionJson = {
        "IDDIRECCION": req.body.IDDIRECCION,
        "STREET1": req.body.STREET1,
        "STREET2": req.body.STREET2,
        "REFERENCE": req.body.REFERENCE,
        "NAME": req.body.NAME,
        "PHONEDIR": req.body.PHONEDIR
    }
    if (req.body.DEFAULTDIR) {
        const direcciones = await getUsuarioDireccion(req.currentToken.IDUSUARIO);
        let aux=0;
        if (direcciones.length > 0) {
            for (const direccionx of direcciones) {
                if (direccionx.IDDIRECCION == req.body.IDDIRECCION) {
                        aux++;
                        for (const direcciony of direcciones) {
                            if (direcciony.IDDIRECCION != req.body.IDDIRECCION) {
                                const update1 = {
                                    "IDRELACIONUD": direcciony.IDRELACIONUD,
                                    "DEFAULTDIR": false,
                                }
                                await updateUsuarioDireccion(update1);
                            }
                        }
                        const update = {
                            "IDRELACIONUD": direccionx.IDRELACIONUD,
                            "DEFAULTDIR": true,
                        }
                        const respuesta = await updateUsuarioDireccion(update)
                        if (respuesta == 1) {
                            await updateDireccion(direccionJson);
                            res.status(201).json(responseJson(201, "success"))
                        }
                        else {
                            res.status(200).json(responseJson(200, "no hubo cambios 1"));
                        }
                }
            }
            if(aux<1){
                res.status(400).json(responseJson(400, "no se encontro la direccion"));
            }
        }
        else {
            res.status(400).json(responseJson(400, "no tiene direcciones"));

        }
    }
    else {
        const direccion = await updateDireccion(direccionJson);
        if (direccion == 1)
            res.status(201).json(responseJson(201, "success"))
        else
            res.status(200).json(responseJson(200, "no hubo cambios 2")) //me devuelve 1 si actualizo o 0 si no
    }

}

async function borrarDireccion(req = request, res = response) { //corregido
    const direcciones = await getUsuarioDireccion(req.currentToken.IDUSUARIO);
    let aux=0;
    if (direcciones.length > 0) {
        for (const direccionx of direcciones) {
            if (direccionx.IDDIRECCION == req.params.id) {
                aux++;
                if (direccionx.DEFAULTDIR == true) {
                    res.status(400).json(responseJson(400, "no se puede borrar una direccion por defecto"));
                }
                else {
                    const direccion = await deleteDireccion(req.params.id);
                    if (direccion == 1)
                        res.status(201).json(responseJson(201, "success"))
                    else
                        res.status(200).json(responseJson(200, "no hubo cambios"))
                }
            }
        }
        if(aux<1){
            res.status(400).json(responseJson(400, "no se encontro la direccion"));
        }
    }
    else {
        res.status(400).json(responseJson(400, "no tiene direcciones"));
    }

}


module.exports = { obtenerUsuarioDireccion, obtenerDireccionId, crearDireccion, actualizarDireccion, borrarDireccion };
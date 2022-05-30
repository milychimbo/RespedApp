const {request,response} = require('express');
const {getAllEstados, getOneEstado, updateEstado, deleteEstado, createEstado} = require('../models/estado');
const { responseJson } = require('../helpers/handleGenericFunction');


async function obtenerEstados(req = request,res = response){
    const estados = await getAllEstados();
    if(estados.length>0)
    res.status(200).json(responseJson(200, "success", estados))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

async function obtenerEstadoId(req = request,res = response){
    const estado = await getOneEstado(req.params.id);
    if(estado!=null)
    res.status(200).json(responseJson(200, "success", estado))
    else
    res.status(404).json(responseJson(404, "no existe"))
}

module.exports= {obtenerEstados,obtenerEstadoId};
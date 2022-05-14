const {
    request,
    response
} = require('express');
const {
    getOneRestaurant,
    updateRestaurante
} = require('../models/restaurante');
const {
    responseJson
} = require('../helpers/handleGenericFunction');

async function obtenerRestauranteID(req = request, res = response) {
    const restaurante = await getOneRestaurant(req.params.id);
    if (restaurante != null)
        res.status(200).json(responseJson(200, "success", restaurante))
    else
        res.status(404).json(responseJson(404, "no existe"))
}

async function actualizarRestaurante(req = request, res = response) {
    const restaurante = await updateRestaurante(req.body);
    if (restaurante == 1)
        res.status(200).json(responseJson(201, "success"))
    else
        res.status(200).json(responseJson(200, "no hubo cambios")) //me devuelve 1 si actualizo o 0 si no
}



module.exports = {
    obtenerRestauranteID,
    actualizarRestaurante
};
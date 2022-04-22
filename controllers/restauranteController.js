const {request,response} = require('express');
const {getOneRestaurant, updateRestaurante} = require('../models/restaurante');


async function obtenerRestauranteID(req = request,res = response){
    const restaurante = await getOneRestaurant(req.params.id);
    res.json(restaurante)
}

async function actualizarRestaurante(req = request,res = response){
    const restauranteObj = req.body;
   const restaurante = await updateRestaurante(restauranteObj);
   res.send(restaurante) //me devuelve 1 si actualizo o 0 si no
}



module.exports= {obtenerRestauranteID,actualizarRestaurante};
const {request,response} = require('express');
const { responseJson } = require('../helpers/handleGenericFunction');

async function getToken(req = request,res = response){
    const token = "esteesmitoken";
    res.json(responseJson(200, "success", token))
}

module.exports= {getToken};
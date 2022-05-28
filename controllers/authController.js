const {request,response} = require('express');
const {getAllUsers} = require('../models/usuario');
const { responseJson } = require('../helpers/handleGenericFunction');
const { verifyPassword } = require('../helpers/handleBCrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || '123';


async function login(req = request,res = response){
    
    const { USERNAME, PASSWORD} = req.body;
    const users = await getAllUsers();
    const usersL = users.length;
    var i =0;
    users.forEach( user => {
        i=i+1;
        if(user.USERNAME == USERNAME){
            const match = verifyPassword(PASSWORD, user.PASSWORD);
                if (match) {
                    i=usersL+1;
                    const userToken = {
                        IDUSUARIO: user.IDUSUARIO,
                        USERNAME: user.USERNAME
                    }
                    const token = jwt.sign(userToken, secret);
                    res.status(200).json(responseJson(200, "matchea",token))
                    
                } else {
                    i=usersL+1;
                    res.status(400).json(responseJson(400, "contraseña incorrecta"))
                    
                }
        }
        else{
            if(i==usersL)
            {
                res.status(404).json(responseJson(404, "no existe"))
            }
        }
    });

    
}

module.exports= {login};
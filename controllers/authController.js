const {request,response} = require('express');
const {getAllUsers,getOneUser} = require('../models/user');
const { responseJson } = require('../helpers/handleGenericFunction');
const { verifyPassword } = require('../helpers/handleBCrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || '123';


async function login(req = request,res = response){
    
    const { userName, password} = req.body;
    const users = await getAllUsers();
    const usersL = users.length;
    var i =0;
    users.forEach( user => {
        i=i+1;
        if(user.userName == userName){
            const match = verifyPassword(password, user.password);
                if (match) {
                    i=usersL+1;
                    const userToken = {
                        id: user.idUsuario,
                        username: user.userName
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
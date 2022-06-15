const {request,response} = require('express');
const {getAllUsers} = require('../DataLayer/usuario');
const { responseJson } = require('../helpers/handleGenericFunction');
const { verifyPassword } = require('../helpers/handleBCrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 'CDjNU7uuZWazUSQsScR/P5RYwSeTsm2I0HLCUXKWnHY';


async function login(req = request,res = response){
    
    const USERNAME = req.query.USERNAME;
    const PASSWORD = req.query.PASSWORD;
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
                    const token = jwt.sign(userToken, secret,{expiresIn:'1h'});
                    const time= 1000*60*60;
                    res.cookie("SESSION_ID",token,{maxAge:time}).status(200).json(responseJson(200, "matchea",token))
                    
                    
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
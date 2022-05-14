const {request,response} = require('express');
const {getAllUsers,getOneUser} = require('../models/user');
const { responseJson } = require('../helpers/handleGenericFunction');
const { verifyPassword } = require('../helpers/handleBCrypt');


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
                   /* const payloadToken = {
                        tipoUsuario: user.tipoUsuario,
                        id: user.idUsuario
                    }
                    const token = await tokenSign(payloadToken);
                    res.cookie('token_session', token);
                    res.redirect('/');*/
                    i=usersL+1;
                    res.json(responseJson(200, "matchea"))
                    
                } else {
                    /*req.flash('type-error', "403");
                    res.redirect('/login');*/
                    i=usersL+1;
                    res.json(responseJson(204, "contraseña incorrecta"))
                    
                }
        }
        else{
            if(i==usersL)
            {
                res.json(responseJson(400, "no existe"))
            }
        }
    });

    
}

module.exports= {login};
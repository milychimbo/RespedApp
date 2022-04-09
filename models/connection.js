const mysql = require('mysql');

// Coloca aquí tus credenciales
const connection = mysql.createConnection({
    host: "localhost",
    database: "bdd_respedapp",
    user: "root",
    password: "root",
    charset: "utf8mb4"
});

connection.connect((err) =>{
    if(err) throw err;
    console.log("Conexion realizada con exito");
})

module.exports = connection;
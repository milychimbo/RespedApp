const express = require('express');
const morgan = require('morgan');


const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({ status: 200, message: "hola" })
});
app.get('/api', (req, res) => {
    res.json({ status: 400, message: "bad request" });
});

var cors = require('cors')
var whitelist = ['https://respedapp.onrender.com', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use('/api/usuario', require('./routes/api/usuario'));
app.use('/api/direccion', require('./routes/api/direccion'));
app.use('/api/auth', require('./routes/api/auth'));

// app.use('/api/estado', require('./routes/api/estado'));
// app.use('/api/tipousuario', require('./routes/api/tipousuario'));
// app.use('/api/tipopedido', require('./routes/api/tipopedido'));
// app.use('/api/relacion', require('./routes/api/relacion'));

app.use('/api/reserva', require('./routes/api/reserva'));
// app.use('/api/categoria', require('./routes/api/categoria'));
// app.use('/api/producto', require('./routes/api/producto'));
app.use('/api/pedido', require('./routes/api/pedido'));



app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});

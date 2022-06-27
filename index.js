const express = require('express');
const morgan = require('morgan');
const cors = require('cors')


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({ status: 200, message: "hola" })
});
app.get('/api', (req, res) => {
    res.json({ status: 400, message: "bad request" });
});

app.get('/kill',function(req, res){
  res.end()
});
/*var whitelist = ['https://respedapp.onrender.com', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}*/


app.use('/api/usuario', require('./routes/api/usuario'));
app.use('/api/direccion', require('./routes/api/direccion'));
app.use('/api/auth', require('./routes/api/auth'));

// app.use('/api/estado', require('./routes/api/estado'));
// app.use('/api/tipousuario', require('./routes/api/tipousuario'));
// app.use('/api/tipopedido', require('./routes/api/tipopedido'));
// app.use('/api/relacion', require('./routes/api/relacion'));
app.use('/api/pedido', require('./routes/api/pedido'));
app.use('/api/reserva', require('./routes/api/reserva'));
app.use('/api/categoria', require('./routes/api/categoria'));
app.use('/api/producto', require('./routes/api/producto'));



app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});

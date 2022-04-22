const express = require('express')
const morgan = require('morgan');



const app = express();
const port = 8000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send(`<h1>Hello!</h1>`)
});
app.get('/api', (req, res) => {
    res.json({ status: 400, message: "bad request" });
});


app.use('/api/user', require('./routes/api/user'));
app.use('/api/restaurante', require('./routes/api/restaurante'));


app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});

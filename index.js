const express = require('express')
const bodyParser =  require("body-parser");

const app = express();
const port = 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(`<h1>Hello!</h1>`)
});

app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});

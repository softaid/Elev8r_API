const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var Container = require('plus.container');

// create express app
const app = express();

app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const env = "development";

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.all('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (request.method == 'OPTIONS') {
        response.status(200).end();
    } else {
        next();
    }
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Elev8r API" });
});

app.get('/documentImage/:imgUrl', function (req, res) {
    console.log(req.params.imgUrl);
    res.sendFile(__dirname + "/attachment/documentCollection/" + req.params.imgUrl );
})

 require('./app.routes')(env, app, Container);

 //app.use('/', require('./route.js'));

// listen for requests
app.listen(3600, () => {
    console.log("Server is listening on port 3600");
});



module.exports = app;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./DB/database_connection');
var routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello World');
})
                
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
                   
    console.log("NodeJS app listening at http://%s:%s", host, port)
})

app.use('/api',routes);

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
     ;

/**mongoose instance connection url connection*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/manageCommand', {useMongoClient:true});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./app/routes/routes'); /**importing route*/
routes(app); /**register the route*/


app.listen(port);


console.log('Rest project Manage Commmand server started on: ' + port);
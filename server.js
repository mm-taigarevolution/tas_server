var express = require('express'),
app = express(),
port = process.env.PORT || 27017,
mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment'),
bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var connection = mongoose.connect('mongodb://localhost/tas_db', {
	useMongoClient: true
});
autoIncrement.initialize(connection);

// create after auto-increment has been initialized
var Model = require('./api/models/model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');
routes(app); //register the route

app.listen(port);

console.log('Taiga Auction System: RESTful API server started on: ' + port);
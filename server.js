var express = require('express'),
    fs = require('fs');
    

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    mongoose = require('mongoose');  

//connect to mongodb
var connect = function () {
  var options = {server: 
                  {socketOptions: 
                    {keepAlive: 1}}};
  mongoose.connect(config.db, options);
}
connect();

mongoose.connection.on('error', function(err) {
  console.log(err);
});

mongoose.connection.on('disconnected', function() {
  connect();
});


//bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) 
    require(models_path + '/' + file);
});



var app = express();

require('./config/express')(app, config);

require('./config/routes')(app);

var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port '+port);


exports = module.exports = app;

var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
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
  if (file.split('.').pop() == 'js') 
    require(models_path + '/' + file);
});




require('./config/express')(app, config);

require('./config/routes')(app);

var port = process.env.PORT || config.port;
server.listen(port);

app.locals.port = port;
app.locals.domain = config.domain + ':' + config.port;


console.log('Express app started on port '+port);

// temp for socket.io
io.on('connection', function(socket) {
  socket.on('changeTo', function(data) {
    io.sockets.emit('goto', 
      { indexh: data.indexh,
        indexv: data.indexv});
  });
});


exports = module.exports = app;

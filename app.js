
/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');


var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(serveStatic('public'));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// routes
app.use('/', require('./routes/static_pages').static_pages);

app.get('/signup', require('./routes/users').signup);
app.use('/users', require('./routes/users').users);



server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function(socket) {
  socket.on('change', function(data) {
    console.log('haha');
    console.log(data.indexh);
    io.sockets.emit('goto', 
      {indexh: data.indexh,
       indexv: data.indexv});
  });
});

app.locals.addSections = function() {
  console.log('hello');
  var r = "";
  fs.readdir('./public/images/tmp/', function(err, files){
    files.forEach(function(file) {
      r = r + "<section data-background=\"images/tmp/"+file+"\"></section>"; 
    });
  });

  return r;
};


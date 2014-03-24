
/**
 * Module dependencies.
 */

var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/dashboard', routes.dashboard);
app.get('/upload', routes.upload);
app.post('/upload', routes.doUpload);
app.get('/client', routes.client);
app.get('/controller', routes.controller);


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


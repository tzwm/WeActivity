var express = require('express'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    winston = require('winston'),
    helpers = require('view-helpers'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    errorhandler = require('errorhandler'),
    pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app, config) {

  app.set('showStackError', true);

  app.use(serveStatic(config.root + '/public'));

  if (env == 'development') {
    app.use(errorhandler());
  }

  // Logging
  // Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    }
  } else {
    log = 'dev';
  }
  // Don't log during tests
  if (env !== 'test')
    app.use(morgan(log));

  // set views path, template engine and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');


  // cookieParser should be above session
  app.use(cookieParser());

  // bodyParser should be above methodOverride
  app.use(bodyParser());

  // express/mongo session storage
  app.use(session({
    secret: pkg.name,
    store: new mongoStore({
      url: config.db,
      collection : 'sessions'
    })
  }));

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // should be declared after session and flash
  app.use(helpers(pkg.name));
}

var static_pages = require('express').Router();

static_pages.use(function(req, res, next){
  return next();
});

var showIndex = function(req, res, next) {
  res.render('index', { title: 'WeActivity' } );
}

static_pages.get('/', showIndex);
static_pages.get('/index', showIndex);

static_pages.get('/try', function(req, res, next){
  res.render('try', { title: 'WeActivity' });
});


module.exports.static_pages = static_pages;

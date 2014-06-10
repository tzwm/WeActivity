var static_pages = require('../app/controllers/static_pages'),
    users = require('../app/controllers/users');

module.exports = function(app) {
  //static pages routes
  app.get('/', static_pages.index);
  app.get('/try', static_pages.try);
  app.get('/explore', static_pages.explore);

  //user routes 
  app.get('/signup', users.new);
  app.get('/users/new', users.new);
  app.post('/users', users.create);
}
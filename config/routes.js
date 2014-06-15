var static_pages = require('../app/controllers/static_pages'),
    users = require('../app/controllers/users'),
    tryit = require('../app/controllers/tryit'),
    groups = require('../app/controllers/groups');

module.exports = function(app) {
  //static pages routes
  app.get('/', static_pages.index);
  app.get('/explore', static_pages.explore);

  //try routes
  app.get('/tryit', tryit.show);
  app.post('/tryit/new', tryit.create);

  //user routes 
  app.get('/signup', users.new);
  app.get('/users/new', users.new);
  app.post('/users', users.create);

  //session routes
  app.get('/login', users.login);
  app.get('/logout', users.logout);
  app.post('/users/session', users.session);

  //group routes
  app.get('/group/new', groups.new);
  app.get('/groups', groups.getall);
  app.post('/groups', groups.create);
}

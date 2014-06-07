var users = require('express').Router();

users.use(function(req, res, next) {
  return next();
});

exports.signup = function(req, res, next) {
  res.render('signup', { title: 'WeActivity' });
};

module.exports.users = users;

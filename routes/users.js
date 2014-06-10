var User = require('../models/user');
//var mongoose = require('mongoose'),
    //User = mongoose.model('User');

var users = require('express').Router();

users.use(function(req, res, next) {
  next();
});

exports.signup = function(req, res, next) {

  res.render('signup', { title: 'WeActivity' });
};

module.exports.users = users;

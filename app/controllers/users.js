var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.new = function(req, res) {
  res.render('users/signup');
}

exports.create = function(req, res) {
  console.log(req.body);
  var user = new User(req.body);
  user.save(function(err) {
    if(err) {
      console.log(err);
      req.flash('error', err);
      return res.render('users/signup');
    } 
    
    req.flash('success', 'signup successfull');
    req.session.user = user;
    res.redirect('/');
  });
}


exports.login = function(req, res) {
  res.render('users/login');
}

exports.logout = function(req, res) {
  req.session.user = null;
  req.flash('success', 'logout successful');
  res.redirect('/');
}


var login = function(req, res) {
  //var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  //delete req.session.returnTo;
  //res.redirect(redirectTo);

  User.authenticate(req.body, function(err, user, data) {
    if(err){
      console.log(err);
      req.flash('error', err);
      return res.redirect('/login');
    }

    if(!user){
      console.log(data.message);
      req.flash('error', data.message);
      return res.redirect('/login');
    }
    
    req.session.user = user;
    req.flash('success', 'login successful');
    res.redirect('/');
  });
}

exports.session = login;

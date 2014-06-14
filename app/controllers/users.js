var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.new = function(req, res) {
  res.render('signup');
}

exports.create = function(req, res) {
  var user = new User(req.body);
  user.save(function(err) {
    if(err) {
      console.log(err);
      return res.render('signup');
    } 

    res.redirect('/');
  });
}


exports.login = function(req, res) {
  res.render('login');
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}


var login = function(req, res) {
  //var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  //delete req.session.returnTo;
  //res.redirect(redirectTo);

  User.authenticate(req.body, function(err, user, data) {
    if(err){
      console.log(err);
      res.redirect('/login');
      return;
    }

    if(!user){
      console.log(data.message);
      res.redirect('/login');
      return;
    }

    res.redirect('/');
  });
}

exports.session = login;

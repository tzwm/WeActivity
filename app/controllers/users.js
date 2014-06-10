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

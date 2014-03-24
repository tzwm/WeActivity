
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.dashboard = function(req, res){
  res.render('dashboard', { title: 'Dashboard' });
};

exports.upload = function(req, res){
  res.render('upload', { title: 'Upload' });
};

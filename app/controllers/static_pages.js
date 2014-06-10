exports.index = function(req, res) {
  res.render('index', { title: 'WeActivity' });
}

exports.try = function(req, res) {
  res.render('try');
}

exports.explore = function(req, res) {
  res.render('explore');
}

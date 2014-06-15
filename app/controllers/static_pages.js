exports.index = function(req, res) {
  res.render('index', { title: 'WeActivity' });
}

exports.explore = function(req, res) {
  res.render('explore');
}

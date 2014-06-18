exports.index = function(req, res) {
  res.render('home/index', { title: 'WeActivity' });
};

exports.explore = function(req, res) {
  res.render('home/explore');
};

exports.test = function(req, res) {
  res.render('activity/show');
};

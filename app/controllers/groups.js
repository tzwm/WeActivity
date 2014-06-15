var mongoose = require('mongoose'),
    Group = mongoose.model('Group');

var addGroupPage = 'addgroup',
	loginUrl = '/login',
	homeUrl = '/';

exports.new = function(req, res) {
	res.render(addGroupPage);
};

exports.create = function(req, res) {
	if (!req.session.user) {
		req.flash('error', 'not logged in');
		return res.redirect(loginUrl);
	}

	var group = new Group(req.body);
	group.save(function(err) {
		if (err) {
			console.log(err);
			req.flash('error', err);
			return res.render(addGroupPage);
		}

		req.flush('success', 'adding new group successfully');
		res.render(homeUrl);
	});
};
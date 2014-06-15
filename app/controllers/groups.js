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
	console.log(req.session.user);

	var group = new Group(req.body);
	group.adminUsers.push(req.session.user.username);
	group.save(function(err) {
		if (err) {
			console.log(err);
			req.flash('error', err);
			return res.render(addGroupPage);
		}

		req.flash('success', 'adding new group successfully');
		res.render(homeUrl);
	});
};
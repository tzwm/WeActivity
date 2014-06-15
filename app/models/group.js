var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment');
	connection = mongoose.connection;
autoIncrement.initialize(connection);

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	groupId: { type: Number, required: true, index: { unique: true } },
	name: { type: String, required: true, index: { unique: true } },
	introduction: { type: String },
	startTime: { type: Date, default: Date.now},
	endTime: { type: Date, required: true },
	lectures: [ Number ],
	isUnderway: { type: Boolean, default: false },
	adminUsers: [ String ]
});

//Validators
GroupSchema.path('name').validate(function(name) {
	return name != null && name.length;
}, 'Invalid name of group');

//Methods
GroupSchema.methods.addAdminUser = function(username, handleError) {
	var User = mongoose.model('User');
	User.findByUsername(username, function(err, user) {
		if (err) {
			return handleError(err);
		}
		if (user) {
			this.adminUsers.push(username);
		}
	});
};



//Statics

//findById - callback(err, group)
GroupSchema.statics.findById = function(groupId, callback) {
	this.findOne({'groupId': groupId}).exec(callback);
};

//findAll - callback(err, groups)
GroupSchema.statics.findAll = function(callback) {
	this.find({}).exec(callback);
};

GroupSchema.plugin(autoIncrement.plugin, { model: 'Group', field: 'groupId', startAt: 1 });
mongoose.model('Group', GroupSchema);
var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment');
	connection = mongoose.connection;
autoIncrement.initialize(connection);

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	groupId: { type: Number, required: true, index: { unique: true } },
	name: { type: String, required: true, index: { unique: true } },
	introduction: { type: String },
	startTime: { type: Date, required: true, default: Date.now},
	endTime: { type: Date, required: true },
	lectures: [ Number ],
	isUnderway: { type: Boolean, default: false },
	adminUsers: [ String ]
});

//Validators
GroupSchema.path('name').validate(function(name) {
	return name.length;
}, 'Invalid name of group');

//Methods
GroupSchema.methods.addAdminUser = function(username, callback) {

};

//Statics
GroupSchema.statics.findGroupById = function(groupId, callback) {
	this.findOne({'groupId': groupId}).exec(callback);
};

GroupSchema.plugin(autoIncrement.plugin, { model: 'Group', field: 'groupId', startAt: 1 });
mongoose.model('Group', GroupSchema);
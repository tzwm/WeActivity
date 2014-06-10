/*var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/we_activity');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var User = new Schema({
  username : String,
  password : String,
  email    : String,
  create_at: Date
});

*/

module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	var UserSchema = new Schema({
  		username : String,
  		password : String,
  		email    : String,
  		create_at: Date
	});

	return mongoose.model("User", UserSchema);
};
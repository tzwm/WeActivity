var mongoose = require('mongoose'),
    crypto   = require('crypto');

//mongoose.connect('mongodb://localhost/we_activity');

var Schema = mongoose.Schema;

var VAILD_EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var UserSchema = new Schema({
  username: { type: String, required: true,
               index: { unique: true } },
  hashed_password: { type: String, required: true},
  salt: { type: String, require: true },
  email: { type: String, required: true, 
               match: VAILD_EMAIL_REGEX,
               index: { unique: true } },
  create_at: { type: Date, default: Date.now }
});


// Validates 
//UserSchema.virtual('password').validate(function(password) {
  //return password.length >= 6; 
//}, 'Password length should be greater than or equal to 6.');

UserSchema.path('username').validate(function(username) {
  return username.length >= 4;
}, 'Username length should be greater than or equal to 4.');

UserSchema.path('hashed_password').validate(function(hashed_password) {
  return hashed_password.length;
}, 'Password cannot be blank.');


// Getters
UserSchema.virtual('password').get(function() {
    return this._password;
  });


// Setters
function toLower(v) {
  return v.toLowerCase();
}

UserSchema.path('email').set(toLower);

UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
 

// Methods
UserSchema.methods = {
  makeSalt : function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }, 

  encryptPassword : function(password) {
    if(!password)
      return '';
    
    var encrypred;
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex');
      return encrypred;
    } catch (err) {
      console.log(err);
      return '';
    }
  },

  authenticate : function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  }

}


//Statics 
UserSchema.statics.authenticate = function(data, callback) {
  var u = this.findOne({username: data.username}, function(err, user){
    if(err) 
      return callback(err);

    if(!user)
      return callback(null, false, { message: 'Unknown user' });

    if(!user.authenticate(data.password)) {
      return callback(null, false, { message: 'Invalid password' });
    }

    return callback(null, user);
  });
}
//findByUsername - callback(err, name)
UserSchema.statics.findByUsername = function(username, callback) {
  this.findOne({'username': username}).exec(callback);
};


//module.exports = mongoose.model('User', UserSchema);
mongoose.model('User', UserSchema);

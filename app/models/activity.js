var
  mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  connection = mongoose.connection;

autoIncrement.initialize(connection);

var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  activityId: { type: Number, required: true, index: { unique: true } },
  groupId: { type: Number, required: true, index: { unique: true } },
  name: { type: String, required: true, index: { unique: true } },
  introduction: { type: String },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  speakers: [ String ],
  isUnderway: { type: Boolean, default: false }
});

//Validators
ActivitySchema.path('name').validate(function (name) {
  return name != null && name.length;
}, 'Invalid name of activity');

ActivitySchema.plugin(autoIncrement.plugin, { model: 'Activity', field: 'activityId', startAt: 1 });
mongoose.model('Activity', ActivitySchema);
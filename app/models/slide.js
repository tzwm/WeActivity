var mongoose = require('mongoose'),
  BaseN = require('basen');

var Schema = mongoose.Schema;

var SlideSchema = new Schema({
  oldname: { type: String, required: true },
  filename: {
    type: String,
    required: true,
    index: {
      unique: true
    }},
  page_count: { type: Number },
  controller_url: { type: String },
  client_url: { type: String },
  is_tmp: { type: Boolean },
  create_at: { type: Date, default: Date.now }
});


var makeShortStr = function () {
  var basen = new BaseN();
  var tmp = new Date().valueOf() * Math.random() * 4444;
  tmp = tmp % basen.decode('ZZZZ');
  tmp = tmp + '';
  tmp = basen.encode(tmp);
  while (tmp.length < 4)
    tmp = '0' + tmp;

  return tmp;
};


SlideSchema.pre('save', function (next) {
  // need check repeat in db
  this.controller_url = makeShortStr();
  this.client_url = makeShortStr();

  next();
});

mongoose.model('Slide', SlideSchema);

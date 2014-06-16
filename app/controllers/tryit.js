var formidable = require('formidable');

exports.show = function(req, res) {
  res.render('home/tryit');
}

exports.create = function(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = './tmp';
  form.maxFieldsSize = 20 * 1024 * 1024;

  form.parse(req, function(err, fields, files) {
    if(err){
      console.log(err);
      return;
    }

    req.flash('success', 'upload successful');
    console.dir(files);
  });
}

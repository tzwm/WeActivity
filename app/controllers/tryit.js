var
  formidable = require('formidable'),
  mongoose = require('mongoose'),
  Slide = mongoose.model('Slide');

exports.show = function (req, res) {
  res.render('home/tryit');
};

exports.create = function (req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = './upload_files';
  form.maxFieldsSize = 20 * 1024 * 1024;

  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      return;
    };

    var uploadSuccess = true;
    var slide = new Slide();
    var filename = files.slide.path;
    slide.oldname = files.slide.name;
    filename = filename.substring(filename.lastIndexOf('/') + 1, filename.length);
    slide.filename = filename;
    slide.save(function (err) {
      if (err) {
        console.log(err);
        uploadSuccess = false;
      }
    });

//    req.flash('success', 'upload successful');
  });
};

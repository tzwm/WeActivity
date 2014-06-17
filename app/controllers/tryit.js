var
  formidable = require('formidable'),
  mongoose = require('mongoose'),
  Slide = mongoose.model('Slide'),
  ppt2png = require('ppt2png');

exports.show = function (req, res) {
  res.render('home/tryit');
};


function getQRCode(data) {
  var API = 'https://api.qrserver.com/v1/create-qr-code/?size=320x320&data='

  return API+data;
}

function doError(err, req, res) {
  console.log(err);
  req.flash('error', 'upload error');
}

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

    var slide = new Slide();
    var filename = files.slide.path;
    slide.oldname = files.slide.name;
    filename = filename.substring(filename.lastIndexOf('/') + 1, filename.length);
    slide.filename = filename;
    slide.is_tmp = true;
    slide.save(function(err, product) {
      if(err) {
        doError(err, req, res);
      }
    });

    var dirname = filename.substring(0, filename.lastIndexOf('.'));
    ppt2png(files.slide.path, './public/img/slides/'+dirname+'/slides', function(err) {
      if(err){
        doError(err, req, res);
      }
    });

    res.statusCode = 200;
    res.end();
  });
}


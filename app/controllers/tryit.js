var
  env = process.env.NODE_ENV || 'development',
  config = require('../../config/config')[env],
  formidable = require('formidable'),
  mongoose = require('mongoose'),
  Slide = mongoose.model('Slide'),
  exec = require('child_process').exec,
  fs = require('fs');

exports.show = function (req, res) {
  res.render('home/tryit');
};


function getQRCode(data) {
  var API = 'https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=';

  return API+data;
}

function doError(err, req, res) {
  console.log(err);
  req.flash('error', 'upload error');
  res.statusCode = 500;
  res.end();
}

function pdf2png(input, output, callback) {
  exec('convert -resize 1200 -density 200 ' + input + ' ' + output+'.png', 
    function (error, stdout, stderr) {
      if (error !== null) {
        callback(error);
        return;
      }

      callback(null);
    });
}

function ppt2png(input, output, callback) {
  exec('unoconv -f pdf -o ' + output + '.pdf ' + input, 
    function(error, stdout, stderr) {
      if (error !== null) {
        callback(error);
        return;
      }

      pdf2png(output+'.pdf', output, function(err){
        fs.unlink(output+'.pdf', function(err) {
          if(err) {
            console.log(err);
          }

        });

        callback(err);
      });
    });
}

function saveToDB(oldname, filename, callback) {
  var slide = new Slide();
  slide.oldname = oldname;
  slide.filename = filename;
  slide.is_tmp = true;

  slide.save(function(err, product) {
    if(err) {
      callback(err);
      return;   
    }

    var domain = 'http://' + config.domain + ':' + config.port;
    var data = {};
    data.clientURL = domain + '/c/' + product.client_url;
    data.controllerURL = domain + '/s/' + product.controller_url;
    data.clientImg = getQRCode(data.clientURL);
    data.controllerImg = getQRCode(data.controllerURL);

    callback(null, data);
  });
}

exports.create = function (req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = './upload_files';
  form.maxFieldsSize = 20 * 1024 * 1024;

  form.parse(req, function (err, fields, files) {
    if (err) {
      doError(err, req, res);
      return;
    }

    var filename = files.slide.path;
    filename = filename.substring(filename.lastIndexOf('/') + 1, filename.length);
    var extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
    extension = extension.toLowerCase();

    var dirname = filename.substring(0, filename.lastIndexOf('.'));
    dirname = './public/img/slides/' + dirname;

    if(extension == 'ppt' || extension == 'pptx') {
      ppt2png(files.slide.path, dirname + '/slides', function(err) {
        if(err){
          doError(err, req, res);
          return;
        }

        saveToDB(files.slide.name, filename, function(err, data) {
          if(err){
            doError(err, req, res);
            return;
          }


          res.statusCode = 200;
          res.end(JSON.stringify(data));
        });
      });

      return;
    }

    if(extension == 'pdf') {
      fs.mkdirSync(dirname);
      pdf2png(files.slide.path, dirname + '/slides', function(err) {
        if(err){
          doError(err, req, res);
          return;
        }

        saveToDB(files.slide.name, filename, function(err, data) {
          if(err){
            doError(err, req, res);
            return;
          }

          res.statusCode = 200;
          res.end(JSON.stringify(data));
        });
      });

      return;
    } 

    
    doError('invalid extension', req, res);
  });
};



/*
 * GET home page.
 */

var util = require('util');
var formidable = require('formidable');
var ppt2png = require('ppt2png');
var fs = require('fs');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.dashboard = function(req, res){
  res.render('dashboard', { title: 'Dashboard' });
};

exports.upload = function(req, res){
  res.render('upload', { title: 'Upload' });
};

exports.doUpload = function(req, res){
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = "./tmp";
  form.maxFieldsSize = 20 * 1024 * 1024;

  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));

    ppt2png(files.test.path, './public/images/tmp/img', function(err){
      if(err != null){
        console.log(err);
      } else {
        fs.unlink('./public/images/tmp/img.pdf', function(err){
          if(err != null){
            console.log(err);
          } else {
            console.log('success');
          }
        });
      }
    });
  });
};

exports.client = function(req, res){
  var r = "";
  
  fs.readdir('./public/images/tmp/', function(err, files){
    files.forEach(function(file) {
      console.log(file);
      r = r + "<section data-background=\"images/tmp/"+file+"\"></section>"; 
    });

    console.log(r);
    res.render('slide_layouts/reveal_client', { title: 'client', data: r });
  });

};

exports.controller = function(req, res){
  var r = "";
  
  fs.readdir('./public/images/tmp/', function(err, files){
    files.forEach(function(file) {
      console.log(file);
      r = r + "<section data-background=\"images/tmp/"+file+"\"></section>"; 
    });

    console.log(r);
    res.render('slide_layouts/reveal_controller', { title: 'controller', data: r });
  });

};



/*
 * GET home page.
 */

var util = require('util');
var formidable = require('formidable');

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
  });
};

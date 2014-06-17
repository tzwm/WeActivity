var mongoose = require('mongoose'),
  Slide = mongoose.model('Slide'),
  fs = require('fs');


function compare(a, b) {
  a = a.substring(a.lastIndexOf('-')+1, a.length);
  b = b.substring(b.lastIndexOf('-')+1, b.length);
  a = parseInt(a);
  b = parseInt(b);

  return a - b;
}

function render(req, res, side) {
  var opt = {};
  opt[side+'_url'] = req.param('id');
  Slide.findOne(opt,
    function(err, slide){
      if(err) {
        console.log('can\'t find this slide');
        return res.redirect('/');
      }

      var filename = slide.filename;
      filename = filename.substring(0, filename.lastIndexOf('.'));
      var data = fs.readdirSync('./public/img/slides/'+filename);
      for(var i = 0; i < data.length; i++) {
        data[i] = "/img/slides/"+filename+"/"+data[i];
      }
      data.sort(compare);
      res.render('layouts/slides/reveal-'+side, {directories: data});
    });
}

exports.client = function(req, res) {
  render(req, res, 'client');
}

exports.controller = function(req, res) {
  render(req, res, 'controller');
}

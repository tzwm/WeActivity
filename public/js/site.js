/**
 * Created by Limbo on 2014/4/17.
 */

// for slides
(function () {
  var
    $dropzone = $('#dropzone'),
    $dropZoneMessage = $dropzone.find('span'),
    $btnSelectFile = $('#btn-select-file'),
    $btnUpload = $('#btn-upload'),
    $btnControl = $('#btn-control'),
    $inputFile = $('#input-select-file'),
    $mask = $('#mask'),
    $progressBar = $mask.find('.progress-bar'),
    $stepControl = $('#step-controlling-page'),
    $stepShare = $('#step-share'),
    formData = null;

  $btnSelectFile.on('click', function () {
    $inputFile.click();
  });

  $inputFile.on('change', function () {
    var filename = $(this).val();
    // need to check file extension
    filename = filename.substring(filename.lastIndexOf('\\') + 1);
    $dropZoneMessage.html(filename);

    formData = new FormData($inputFile[0]);
  });

  $dropzone
    .on('dragover', function (e) {
      e.preventDefault();
      e.stopPropagation();
    })
    .on('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var file = e.originalEvent.dataTransfer.files[0];
      $dropZoneMessage.html(file.name);
      formData = new FormData(file);

    });

  $('#input-select-file').fileupload({
    dataType: 'json',
    done: function(e, data) {
      $progressBar.addClass('progress-bar-success').text('Upload successfully!');
      $stepControl.removeClass('hidden');
      setTimeout(function () {
        $mask.addClass('hidden');
      }, 1000);
      setTimeout(function () {
        $('body').animate({ scrollTop: $stepControl.offset().top }, 1000);
      }, 500);
    }
  });
/*  $btnUpload.on('click', function () {*/
    //$mask.removeClass('hidden');
    //$progressBar
      //.removeClass('progress-bar-danger')
      //.removeClass('progress-bar-success').
      //text('Uploading');

    //$.ajax({
      //url: '/tryit/new',
      //type: 'POST',
      //contentType: false,
      //processData: false,
      //data: formData,
      //success: function () {
        //$progressBar.addClass('progress-bar-success').text('Upload successfully!');
        //$stepControl.removeClass('hidden');
        //setTimeout(function () {
          //$mask.addClass('hidden');
        //}, 1000);
        //setTimeout(function () {
          //$('body').animate({ scrollTop: $stepControl.offset().top }, 1000);
        //}, 500);
      //},
      //error: function () {
        //$dropzone.removeClass('dropzone-normal').addClass('dropzone-error');
        //$progressBar.addClass('progress-bar-danger').text('Upload failed');
        //setTimeout(function () {
          //$mask.addClass('hidden');
        //}, 1000);
      //}
    //});
  /*});*/

  $btnControl.on('click', function () {
    $stepShare.removeClass('hidden');
    $('body').animate({ scrollTop: $stepShare.offset().top }, 1000);
  });
}());

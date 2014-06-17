/**
 * Created by Limbo on 2014/4/17.
 */

// for slides
(function () {
  var
    $dropzone = $('#dropzone'),
    $dropZoneMessage = $dropzone.find('span'),
    $btnSelectFile = $('#btn-select-file'),
    $btnControl = $('#btn-control'),
    $inputFile = $('#input-select-file'),
    $mask = $('#mask'),
    $progressBar = $mask.find('.progress-bar'),
    $stepControl = $('#step-controlling-page'),
    $stepShare = $('#step-share'),
    formData = null,
    handleUpload = function(formData) {
      $.ajax({
        url: '/tryit/new',
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'json',
        data: formData,
        enctype: 'multipart/form-data',
        beforeSend: function() {
          $mask.removeClass('hidden');
          $progressBar
            .removeClass('progress-bar-danger')
            .removeClass('progress-bar-success').
            text('Uploading');
        },
        success: function (data) {
          // temp for testing
          $('#step-controlling-page .content .thumbnail img').attr('src', data.controllerImg);
          $('#step-share .content img').attr('src', data.clientImg);

          $progressBar.addClass('progress-bar-success').text('Upload successfully!');
          $stepControl.removeClass('hidden');
          setTimeout(function () {
            $mask.addClass('hidden');
          }, 1000);
          setTimeout(function () {
            $('body').animate({ scrollTop: $stepControl.offset().top }, 1000);
          }, 500);
        },
        error: function () {
          $dropzone.removeClass('dropzone-normal').addClass('dropzone-error');
          $progressBar.addClass('progress-bar-danger').text('Upload failed');
          setTimeout(function () {
            $mask.addClass('hidden');
          }, 1000);
        }
      });
    };

  $btnSelectFile.on('click', function () {
    $inputFile.click();
  });

  $inputFile.on('change', function () {
    var filename = $(this).val();
    // need to check file extension
    filename = filename.substring(filename.lastIndexOf('\\') + 1);
    $dropZoneMessage.html(filename);

    formData = new FormData();
    formData.append('slide', $inputFile[0].files[0]);
    handleUpload(formData);
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

      formData = new FormData();
      formData.append('slide', file);
      handleUpload(formData);
    });

  $btnControl.on('click', function () {
    $stepShare.removeClass('hidden');
    $('body').animate({ scrollTop: $stepShare.offset().top }, 1000);
  });
}());

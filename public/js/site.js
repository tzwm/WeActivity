/**
 * Created by Limbo on 2014/4/17.
 */

// for slides
(function () {
  var
    $btnGetStart = $('#btn-get-start'),
    $dropzone = $('#dropzone'),
    $dropZoneMessage = $dropzone.find('span'),
    $btnSelectFile = $('#btn-select-file'),
    $btnControl = $('#btn-control'),
    $inputFile = $('#input-select-file'),
    $mask = $('#mask'),
    $progressBar = $mask.find('.progress-bar'),
    $stepsPanel = $('#steps-panel'),
    $steps = $stepsPanel.find('.steps'),
    $stepBack = $steps.find('.headbar > span'),
    $stepUpload = $('#step-upload'),
    $stepControl = $('#step-controlling-page'),
    $stepShare = $('#step-share'),
    formData = null,
    handleUpload = function (formData) {
      $.ajax({
        url: '/tryit/new',
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'json',
        data: formData,
        enctype: 'multipart/form-data',
        beforeSend: function () {
          $mask.removeClass('hidden');
          $progressBar
            .removeClass('progress-bar-danger')
            .removeClass('progress-bar-success').
            text('Uploading');
        },
        success: function (data) {
          // change the
          $btnControl.attr('href', data.controllerURL);
          $stepControl.find('img').attr('src', data.controllerImg);
          $stepShare.find('img').attr('src', data.clientImg);
          $stepShare.find('.share-link > a').attr('href', data.clientURL).text(data.clientURL);

          $progressBar.addClass('progress-bar-success').text('Upload successfully!');

          setTimeout(function () {
            $mask.addClass('hidden');
          }, 1000);
          setTimeout(function () {
            $steps.animate({
              top: -$stepUpload.height()
            }, 1000);
            $stepUpload.animate({
              opacity: 0
            }, 1000);
            $stepControl
              .removeClass('hidden')
              .css({opacity: 0})
              .animate({
                opacity: 1
              }, 1000);
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

  $btnGetStart.on('click', function () {
    $stepsPanel.removeClass('hidden');
    $stepUpload
      .removeClass('hidden')
      .css({opacity: 0})
      .animate({
        opacity: 1
      }, 500);
  });

  // for upload
  $btnSelectFile.on('click', function () {
    $inputFile.click();
  });
  $inputFile.on('change', function () {
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

      formData = new FormData();
      formData.append('slide', file);
      handleUpload(formData);
    });

  $btnControl.on('click', function () {
    console.log($steps.css('top') + '  ' + $stepControl.height());
    $steps.animate({
      top: -$stepControl.height() + $steps.position().top
    }, 1000);
    $stepControl.animate({
      opacity: 0
    }, 1000);
    $stepShare
      .removeClass('hidden')
      .css({opacity: 0})
      .animate({
        opacity: 1
      }, 1000);
  });

  $stepBack.on('click', function() {
    $stepsPanel.addClass('hidden');
    $steps.css({
      top: 0
    });
    $stepControl.addClass('hidden');
    $stepShare.addClass('hidden');
  });
}());

// for activity list
(function () {
  var $activityList = $('#activity-list');
  $activityList
    .find('.shot')
    .on('mouseover', '.item-description', function () {
      $(this).stop().animate({
        opacity: 1
      }, 200);
    })
    .on('mouseleave', '.item-description', function () {
      $(this).stop().animate({
        opacity: 0
      }, 200);
    });
}());

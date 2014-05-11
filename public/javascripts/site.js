/**
 * Created by Limbo on 2014/4/17.
 */

(function () {
  var uploadFile = function () {
    $
      .ajax({
        url: '/upload'

      })
      .done(function () {

      })
  };


  $('.navbar-nav > li')
    .on('mouseenter mouseleave', function () {
      $(this).toggleClass('open');
    })
}());
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
//    $('a[href*="#"]:not([href="#"])').removeClass("active");
//    $(this).addClass("active");
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


$.fn.toggleSlider = function() {
    if ($('#table-content').is(":visible")) {
        $('#table-slider img').attr('src',"img/arrow_right.png");
    } else {
        $('#table-slider img').attr('src',"img/arrow_left.png");
    }
    $('#table-content').toggle();
};

$(function() {
  $('#table-slider').click(function() {
      $.fn.toggleSlider();
    });
});

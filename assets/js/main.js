$(document).ready(function(){
  $('a.tile').nivoLightbox();
  $('.js-hide').css('display', 'none');
  $('.sdm-registration-form input').change(function(e) {
    console.log(e);
    console.log(this);
  });
  $('.datepicker').pickadate({
    selectYears: 30,
    selectMonths: true,
    max: true,
  });
});

if (window.addEventListener) {
  window.addEventListener('load', WHCheckCookies, false);
}
else if (window.attachEvent) {
  window.attachEvent('onload', WHCheckCookies);
}

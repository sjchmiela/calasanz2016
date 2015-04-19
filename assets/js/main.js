$(document).ready(function(){
  $('a.tile').nivoLightbox();
  $('.js-hide').css('display', 'none');
});

if (window.addEventListener) {
  window.addEventListener('load', WHCheckCookies, false);
} 
else if (window.attachEvent) {
  window.attachEvent('onload', WHCheckCookies);
}
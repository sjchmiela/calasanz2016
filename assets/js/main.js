$(document).ready(function(){
  $('a.tile').nivoLightbox();
  $('.js-hide').css('display', 'none');
  $('.sdm-registration-form input').change(function(e) {

    function hideAllWithClass(className) {
      var ids = ['#tooOld', '#tooYoung', '#schp20', '#schp21', '#schp22', '#schp23', '#schp', '#hosts'];
      for(var i = 0; i<ids.length; i++) { $(ids[i]).addClass(className); }
    }

    if(this.name == 'birthdate') {
      var wyd_beginning = moment('20160724', 'YYYYMMDD');
      var birthdate = moment(this.value, 'YYYY-MM-DD');
      var age = wyd_beginning.diff(birthdate, 'years');
      $('#age').removeClass('hidden');
      $('#age span').text(age);
      hideAllWithClass('hidden-1');
      if(age <= 13) {
        $('#tooYoung').removeClass('hidden-1');
      } else if(age >= 14 && age <= 15) {
        $('#schp22').removeClass('hidden-1');
        $('#schp23').removeClass('hidden-1');
      } else if(age >= 16 && age <= 17) {
        $('#schp22').removeClass('hidden-1');
        $('#schp23').removeClass('hidden-1');
        $('#schp').removeClass('hidden-1');
        $('#hosts').removeClass('hidden-1');
      } else if(age >= 18 && age <= 30) {
        $('#schp20').removeClass('hidden-1');
        $('#schp21').removeClass('hidden-1');
        $('#schp').removeClass('hidden-1');
        $('#hosts').removeClass('hidden-1');
      } else {
        $('#tooOld').removeClass('hidden-1');
      }
    } else if (this.name == 'participation') {
      hideAllWithClass('hidden-2');
      if(this.value == 'A') {
        $('#schp20').removeClass('hidden-2');
        $('#schp22').removeClass('hidden-2');
        $('#schp').removeClass('hidden-2');
      } else {
        $('#schp21').removeClass('hidden-2');
        $('#schp23').removeClass('hidden-2');
      }
    } else if (this.name == 'details') {
      hideAllWithClass('hidden-3');
      if(this.value == 'required') {
        $('#schp22').removeClass('hidden-3');
        $('#schp').removeClass('hidden-3');
      } else {
        $('#schp21').removeClass('hidden-3');
        $('#schp20').removeClass('hidden-3');
      }
    }
  });
  $('.datepicker').pickadate({
    selectYears: 30,
    selectMonths: true,
    max: true,
    format: 'yyyy-mm-dd',
  });
});

if (window.addEventListener) {
  window.addEventListener('load', WHCheckCookies, false);
}
else if (window.attachEvent) {
  window.attachEvent('onload', WHCheckCookies);
}

$(document).ready(function(){
  $('a.tile').nivoLightbox();
  $(".registration-option").hide();
  $('.js-hide').css('display', 'none');
  $('#current_student').show();
  $("#chosenOption").hide();
  document.state = {};
  $('.sdm-registration-form input').change(function(e) {

    if(this.name == 'current_student') {
      updateRegistrationForm('current_student', (this.value == '1'));
    } else if(this.name == 'alumnus') {
      updateRegistrationForm('alumnus', (this.value == '1'));
    } else if(this.name == 'other_connection') {
      updateRegistrationForm('other_connection', (this.value == '1'));
    } else if(this.name == 'birthdate') {
      var birthdate = moment(this.value, 'YYYY-MM-DD');
      $('#age').removeClass('hidden');
      wyd_beginning = moment('2016-07-25', 'YYYY-MM-DD');
      var age = wyd_beginning.diff(birthdate, 'years');
      $('#age span').text(age);
      if(birthdate.isBefore('1986-07-25')) {
        updateRegistrationForm('birthdate', 'old');
      } else if(birthdate.isSameOrBefore('1998-07-25')) {
        updateRegistrationForm('birthdate', 'mature');
      } else if(birthdate.isAfter('1998-07-25')) {
        updateRegistrationForm('birthdate', 'immature');
      }
    } else if (this.name == 'lodging') {
      updateRegistrationForm('lodging', (this.value == '1'));
    } else if (this.name == 'participation') {
      updateRegistrationForm('participation', this.value);
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

function ask(question) {
  $('#' + question).show();
  console.log('shown question #' + question);
}

function group(identifier) {
  $(identifier).show();
  $(identifier + " h4").text("Opcja rejestracji dla Ciebie");
}

function updateRegistrationForm(field, val) {
  $(".registration-option").hide();
  console.log('updateRegistrationForm(' + field + ', ' + val + ')');
  q = [
    'current_student', // 0
    'alumnus', // 1
    'other_connection', // 2
    'birthdate', // 3
    'lodging', // 4
    'participation' // 5
  ];
  var changeIndex = -1;
  var newState = {};
  for(var i = q.length - 1; i >= 0; i--) {
    if(field === q[i]) {
      changeIndex = i;
      newState[field] = val;
      continue;
    }
    if(changeIndex >= 0) {
      newState[q[i]] = document.state[q[i]];
    } else {
      $('#' + q[i]).hide();
      var inputs = $('#' + q[i] + ' input');
      for(var j = 0; j < inputs.length; j++) {
        var input = inputs[j];
        if(input.type == 'text') {
          input.value = '';
        } else if(input.type == 'radio') {
          input.checked = false;
        }
      }
    }
  }

  if(changeIndex < 0) {
    return;
  }

  if(newState[q[0]] === true) {
    // current_student
    if(newState[q[3]] === 'immature') {
      if(newState[q[4]] === true) {
        // infoA2nocleg1
        group('#infoA2nocleg1');
      } else if(newState[q[4]] === false) {
        if(newState[q[5]] === 'full') {
          // info22
          group('#info22');
        } else if (newState[q[5]] === 'part') {
          // info23
          group('#info23');
        } else {
          // ask participation
          ask(q[5]);
        }
      } else {
        ask(q[4]);
      }
    } else if(newState[q[3]] === 'mature') {
      if(newState[q[4]] === true) {
        // infoA2nocleg2
        group('#infoA2nocleg2');
      } else if(newState[q[4]] === false) {
        if(newState[q[5]] === 'full') {
          // info20
          group('#info20');
        } else if (newState[q[5]] === 'part') {
          // info21
          group('#info21');
        } else {
          ask(q[5]);
        }
      } else {
        ask(q[4]);
      }
    } else if(newState[q[3]] === 'old') {
      // too old
      group('#tooOld');
    } else {
      ask(q[3]);
    }
  } else if (newState[q[0]] === false) {
    // maybe alumnus
    if(newState[q[1]] === true) {
      // alumnus
      if(newState[q[3]] === 'immature') {
        if(newState[q[4]] === true) {
          // infoA2nocleg1
          group('#infoA2nocleg1');
        } else if(newState[q[4]] === false) {
          if(newState[q[5]] === 'full') {
            // info22
            group('#info22');
          } else if (newState[q[5]] === 'part') {
            // info23
            group('#info23');
          } else {
            ask(q[5]);
          }
        }
      } else if(newState[q[3]] === 'mature') {
        if(newState[q[4]] === true) {
          // infoA2nocleg2
          group('#infoA2nocleg2');
        } else if(newState[q[4]] === false) {
          if(newState[q[5]] === 'full') {
            // info20
            group('#info20');
          } else if (newState[q[5]] === 'part') {
            // info21
            group('#info21');
          } else {
            ask(q[5]);
          }
        } else {
          ask(q[4]);
        }
      } else if(newState[q[3]] === 'old') {
        // too old
        group('#tooOld');
      } else {
        ask(q[3]);
      }
    } else if(newState[q[1]] === false) {
      if(newState[q[2]] === true) {
        // other connection
        if(newState[q[3]] === 'immature') {
          // no registration for too young
          group('#nonAuthorized');
        } else if(newState[q[3]] === 'mature') {
          if(newState[q[4]] === true) {
            // infoA2nocleg2
            group('#infoA2nocleg2');
          } else if(newState[q[4]] === false) {
            if(newState[q[5]] === 'full') {
              // info20
              group('#info20');
            } else if (newState[q[5]] === 'part') {
              // info21
              group('#info21');
            } else {
              ask(q[5]);
            }
          }
        } else if(newState[q[3]] === 'old') {
          // too old
          group('#tooOld');
        } else {
          ask(q[3]);
        }
      } else if (newState[q[2]] === false) {
        // go to krakow2016
        group('#globalRegister');
      } else {
        ask(q[2]);
      }
    } else {
      ask(q[1]);
      // ask if alumnus
    }
  } else {
    ask(q[0]);
    // ask if c_s
  }
  document.state = newState;
}

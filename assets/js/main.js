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
      document.birthdate_moment = birthdate;
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
    selectYears: 60,
    selectMonths: true,
    min: '1950-01-01',
    max: '2010-12-31',
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

var groupFormLinks = {
  '#infoA2nocleg1': {
    'student': "https://docs.google.com/forms/d/1yx-C14CD4mVXaSwvscx3POqM40fmvABNe3CkHhaEKnA/viewform?entry.2073369867=",
    'alumnus': "https://docs.google.com/forms/d/17Uck_t494UGnpKQCcz3ydd7rg241EQbJVEhKnMER-rk/viewform?entry.2073369867="
  },
  '#infoA2nocleg2': {
    'student': "https://docs.google.com/forms/d/1CWNBCcISxgSXQlBVnlCcOoSH0800n2oX8QAC-9s8jp8/viewform?entry.2073369867=",
    'alumnus': "https://docs.google.com/forms/d/1eI6WBbLBEwAKr5UpguLu7vGcJsiB_EKIjhmylumhwI0/viewform?entry.2073369867=",
    'connected': "https://docs.google.com/forms/d/1LSLcQ5H0ArEOC3OtNSxa5jiD4eLDORfozyshTBY-RfU/viewform?entry.2073369867="
  },
  '#info20': {
    'student': "https://docs.google.com/forms/d/1eiqTzljYMEqkEhKFIrhZu1KZ7XQLDLfxzthAzfjPL7A/viewform?entry.2073369867=",
    'alumnus': "https://docs.google.com/forms/d/1zNuImq_kgxhtF6sL6j9H3-5NSrBKN5BVRpsU0CnehWw/viewform?entry.2073369867=",
    'connected': "https://docs.google.com/forms/d/10HvkW2NBMg-QcZH19fnL_8WHj8SJ7TphS4TT_TglkVQ/viewform?entry.2073369867="
  },
  "#info21": {
    'student': "https://docs.google.com/forms/d/1jCJwQneRklp08-H-Dg8FgjuezzjOLpyYHYIk-PsnCIo/viewform?entry.2073369867=",
    'alumnus': "https://docs.google.com/forms/d/1nz0AtaFcZ6Lj_gDKnDrKkuXwcCO3oRPizfYpqQiPMaM/viewform?entry.2073369867=",
    'connected': "https://docs.google.com/forms/d/1_S-BCTLZkXhG2CYMpLKxOerXlfRkvTup0r2nmI-Z_Qc/viewform?entry.2073369867="
  },
  "#info22": {
    'student': "https://docs.google.com/forms/d/1C3BuUm3sVFu7t0SOE8f47LwM03bb6ebh7y6GaZQoG7A/viewform?entry.1601380937=",
    'alumnus': "https://docs.google.com/forms/d/1hBiJjCve4j7MR0X9p8eTSyAnBOhf-AmNl9gMe2lEMUo/viewform?entry.654144946="
  },
  "#info23": {
    'student': "https://docs.google.com/forms/d/1q5Tf5AVS3KLqPULembh8J0C0EfoPrhNt4A4peepRIlg/viewform?entry.2073369867=",
    'alumnus': "https://docs.google.com/forms/d/1hSrjl97H_a-cY3mOe-v6T-uR1pOLNOedtWpVEwR50rw/viewform?entry.2073369867="
  }
};

function group(identifier, student, alumnus, connected) {
  $(identifier).show();
  var link_href = "";
  if (student) {
    link_href = groupFormLinks[identifier]['student'];
  } else if (alumnus) {
    link_href = groupFormLinks[identifier]['alumnus'];
  } else if (connected) {
    link_href = groupFormLinks[identifier]['connected'];
  }
  $(identifier + " .form_link").attr('href', link_href + document.birthdate_moment.format("YYYY-MM-DD"));
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
        group('#infoA2nocleg1', newState[q[0]], newState[q[1]], newState[q[2]]);
      } else if(newState[q[4]] === false) {
        if(newState[q[5]] === 'full') {
          // info22
          group('#info22', newState[q[0]], newState[q[1]], newState[q[2]]);
        } else if (newState[q[5]] === 'part') {
          // info23
          group('#info23', newState[q[0]], newState[q[1]], newState[q[2]]);
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
        group('#infoA2nocleg2', newState[q[0]], newState[q[1]], newState[q[2]]);
      } else if(newState[q[4]] === false) {
        if(newState[q[5]] === 'full') {
          // info20
          group('#info20', newState[q[0]], newState[q[1]], newState[q[2]]);
        } else if (newState[q[5]] === 'part') {
          // info21
          group('#info21', newState[q[0]], newState[q[1]], newState[q[2]]);
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
          group('#infoA2nocleg1', newState[q[0]], newState[q[1]], newState[q[2]]);
        } else if(newState[q[4]] === false) {
          if(newState[q[5]] === 'full') {
            // info22
            group('#info22', newState[q[0]], newState[q[1]], newState[q[2]]);
          } else if (newState[q[5]] === 'part') {
            // info23
            group('#info23', newState[q[0]], newState[q[1]], newState[q[2]]);
          } else {
            ask(q[5]);
          }
        } else {
          ask(q[4]);
        }
      } else if(newState[q[3]] === 'mature') {
        if(newState[q[4]] === true) {
          // infoA2nocleg2
          group('#infoA2nocleg2', newState[q[0]], newState[q[1]], newState[q[2]]);
        } else if(newState[q[4]] === false) {
          if(newState[q[5]] === 'full') {
            // info20
            group('#info20', newState[q[0]], newState[q[1]], newState[q[2]]);
          } else if (newState[q[5]] === 'part') {
            // info21
            group('#info21', newState[q[0]], newState[q[1]], newState[q[2]]);
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
            group('#infoA2nocleg2', newState[q[0]], newState[q[1]], newState[q[2]]);
          } else if(newState[q[4]] === false) {
            if(newState[q[5]] === 'full') {
              // info20
              group('#info20', newState[q[0]], newState[q[1]], newState[q[2]]);
            } else if (newState[q[5]] === 'part') {
              // info21
              group('#info21', newState[q[0]], newState[q[1]], newState[q[2]]);
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

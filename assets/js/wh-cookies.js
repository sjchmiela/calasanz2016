function WHCreateCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = "; expires=" + date.toGMTString();
  document.cookie = name+"="+value+expires+"; path=/";
}
function WHReadCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function GAReportView() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-49622711-4', 'auto');
      ga('send', 'pageview');
}

function WHCloseCookiesWindow() {
    WHCreateCookie('cookies_accepted', 'T', 365);
    GAReportView();
    document.getElementById('cookies-message-container').removeChild(document.getElementById('cookies-message'));
}

function WHCheckCookies() {
    if(WHReadCookie('cookies_accepted') != 'T') {
        var cookieTranslations = {
          'en': {
            'explanation': 'This site uses (cookies), thanks to which our site may work better.',
            'button': 'I understand'
          },
          'es': {
            'explanation': 'Esta página web usa \'cookies\' que ayudenla actuar mejor.',
            'button': 'Entiendo'
          },
          'it': {
            'explanation': 'Questa pagina utilizza i file cookie.',
            'button': 'Capisco'
          },
          'pl': {
            'explanation': 'Ta strona używa ciasteczek (cookies), dzięki którym nasz serwis może działać lepiej.',
            'button': 'Rozumiem'
          }
        };
        var message_container = document.createElement('div');
        message_container.id = 'cookies-message-container';
        var cookieTranslation = cookieTranslations[document.getElementsByTagName("html")[0].lang];
        if(cookieTranslation == undefined) {
          cookieTranslation = cookieTranslations['en'];
        }
        var html_code = '<div id="cookies-message"><p>'+cookieTranslation['explanation']+' <a href="javascript:WHCloseCookiesWindow();" id="accept-cookies-checkbox" name="accept-cookies" >'+cookieTranslation['button']+'</a></div>';
        message_container.innerHTML = html_code;
        document.body.appendChild(message_container);
    } else {
        GAReportView();
    }
}
function WHCheckCookies() {
    if(WHReadCookie('cookies_accepted') != 'T') {
        var message_container = document.createElement('div');
        message_container.id = 'cookies-message-container';
        var html_code = '<div id="cookies-message"><p>Esta página web usa \'cookies\' que ayudenla actuar mejor. <a href="javascript:WHCloseCookiesWindow();" id="accept-cookies-checkbox" name="accept-cookies" >Entiendo</a></div>';
        message_container.innerHTML = html_code;
        document.body.appendChild(message_container);
    } else {
        GAReportView();
    }
}

window.onload = WHCheckCookies;
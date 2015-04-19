function WHCheckCookiesEn() {
    if(WHReadCookie('cookies_accepted') != 'T') {
        var message_container = document.createElement('div');
        message_container.id = 'cookies-message-container';
        var html_code = '<div id="cookies-message"><p>This site uses (cookies), thanks to which our site may work better. <a href="javascript:WHCloseCookiesWindow();" id="accept-cookies-checkbox" name="accept-cookies" >I understand</a></div>';
        message_container.innerHTML = html_code;
        document.body.appendChild(message_container);
    } else {
        GAReportView();
    }
}
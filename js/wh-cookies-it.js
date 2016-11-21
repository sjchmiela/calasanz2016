function WHCheckCookiesIt() {
    if(WHReadCookie('cookies_accepted') != 'T') {
        var message_container = document.createElement('div');
        message_container.id = 'cookies-message-container';
        var html_code = '<div id="cookies-message"><p>Questa pagina utilizza i file cookie. <a href="javascript:WHCloseCookiesWindow();" id="accept-cookies-checkbox" name="accept-cookies" >Capisco</a></div>';
        message_container.innerHTML = html_code;
        document.body.appendChild(message_container);
    } else {
        GAReportView();
    }
}
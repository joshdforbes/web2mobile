rough working prototype of a bookmarklet to send a url from PC to a cellphone as a text message

[a link](javascript:(function(){var elem=document.createElement('script');elem.setAttribute('type','text/javascript');elem.setAttribute('src','http://www.joshdforbes.com/web2mobile/web2mobile.js?t='+(new Date().getTime()));document.body.appendChild(elem);})())

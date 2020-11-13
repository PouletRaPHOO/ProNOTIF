$(function(){
    chrome.storage.sync.get(['URL','Auth','Password'], function(Authentifications){
        $('#ID').text(Authentifications.Auth);
    })
})
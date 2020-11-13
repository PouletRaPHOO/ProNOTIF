$(function(){
    $('#subAuth').click(function(){
        var URL = $('#URL').val();
        var Auth = $('#Auth').val();
        var Password = $('#Password').val();
        if(URL&&Password&&Auth) {
            chrome.storage.sync.get({'URL':URL, 'Auth':Auth,'Password':Password}, function(){
                close();
            })
        }
    })
})
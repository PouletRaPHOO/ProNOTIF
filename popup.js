$(function(){

    chrome.storage.sync.get(['Adresse','Password','Auth'], function(authentifications){
        console.log(authentifications.Adresse)
        $('#url').val(authentifications.Adresse),
        $('#Auth').val(authentifications.Auth),
        $('#Password').val(authentifications.Password);
    })


    $('#subAuth').click(function(){
        console.log("test")
        var URL = $('#url').val();
        var Auth = $('#Auth').val();
        var Password = $('#Password').val();
        if(URL&&Password&&Auth) {
            chrome.storage.sync.set({'Adresse':URL, 'Auth':Auth,'Password':Password}, function(){
                close();
            })
        }
    })
})
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
            chrome.storage.sync.set({'Adresse':URL, 'Auth':Auth,'Password':Password}, async function(test) {
                testUrl = `https://us-central1-pronote-login-api-ext.cloudfunctions.net/app/pronote/lastmessage/?url=${test.Adresse}&username=${test.Auth}&password=${test.Password}`
                response= await jQuery.ajax(TestUrl)
                if (typeof response === Object) {
                    var notifLogged = {
                        type: 'basic',
                        iconUrl ='logos/logo128.png',
                        title ='Bien Connecté',
                        message ='Vous etes bien connecté sur la session Pronote de (à mettre plus tard avec une nouvelle URL)'
                    };
                    chrome.notifications.create("Logged",notifLogged)
                } else {
                    var notifLogged = {
                        type: 'basic',
                        iconUrl ='logos/logo128.png',
                        title ='Erreur de Connexion',
                        message ='Uh oh Looks like you got the Wrong passwords'
                    };
                }
            })
        }
    })
})
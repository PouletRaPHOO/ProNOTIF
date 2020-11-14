$(function(){

    chrome.storage.sync.get(['Adresse','Password','Auth'], function(authentifications){
        console.log(authentifications.Adresse)
        $('#url').val(authentifications.Adresse),
        $('#Auth').val(authentifications.Auth),
        $('#Password').val(authentifications.Password);
    })


    $('#password').on( "keyup", function(e){
        if (e.keyCode == 13) {
        var URL = $('#url').val();
        var Auth = $('#id').val();
        var Password = $('#password').val();
        if(URL&&Password&&Auth) {
            chrome.storage.sync.set({'Adresse':URL, 'Auth':Auth,'Password':Password}, async function() {
                console.log(URL, Auth, Password)
                testUrl = `https://us-central1-pronote-login-api-ext.cloudfunctions.net/app/pronote/lastmessage/?url=${URL}&username=${Auth}&password=${Password}`
                response = await jQuery.ajax({
                    url: testUrl,
                    type: 'GET',
                    dataType: 'json',
                    success: (data) => {
                        return data
                    },
                    error: () => {
                        return "500"
                    }
                })
                console.log(response)
                if (response === "500") {
                    const notifLogged = {
                        type: 'basic',
                        iconUrl: 'logos/logo128.png',
                        title: 'Mauvais identifiants',
                        message: 'Un problème est survenu lors de la connexion à Pronote'
                    };
                    chrome.notifications.create("Logged", notifLogged)
                } else if (response.length === 4) {
                    const notifLogged = {
                        type: 'basic',
                        iconUrl: 'logos/logo128.png',
                        title: 'Vous êtes connecté',
                        message: 'Votre compte Pronote a bien été connecté'
                    };
                    chrome.notifications.create("Logged", notifLogged)
                }
            })
        }
    }})
})
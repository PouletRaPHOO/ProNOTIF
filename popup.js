$(function() {
    chrome.storage.sync.get('status', function(connected){
        if (connected.status) {
            $('#disconnected-container').hide();
            $('#connected-container').css('display', 'flex');
        }
    })

    $('#connect').on("click", async function(){
        $('#loading').show()
        $('#disconnected-container').hide();
        const adresse = $('#url').val().split("?")[0];
        var id = $('#id').val();
        var password = $('#password').val();
        if(adresse&&id&&password) {
                testUrl = `https://us-central1-pronote-login-api-ext.cloudfunctions.net/app/pronote/lastmessage/?url=${adresse}&username=${id}&password=${password}`
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
                    let save = {}
                    save["adresse"] = adresse
                    save["id"] = id
                    save["password"] = password
                    chrome.storage.sync.set(save, function() {
                        let connected = {}
                        connected["status"] = true
                        chrome.storage.sync.set(connected, function() {
                            let messages = {}
                            messages[0] = {
                                title: response[0].title,
                                date: response[0].date
                            }
                            messages[1] = {
                                title: response[1].title,
                                date: response[1].date
                            }
                            messages[2] = {
                                title: response[2].title,
                                date: response[2].date
                            }
                            messages[3] = {
                                title: response[3].title,
                                date: response[3].date
                            }
                            chrome.storage.sync.set(messages, function(){
                                let lien = {};
                                lien['url'] = testUrl
                                chrome.storage.sync.set(lien, function(){
                                    $('#connected-container').css('display', 'flex');
                                    $('#loading').hide();
                                })
                            })
                        })
                    })
                }
    }})

    $('#disconnect').on("click", async function(){
        document.getElementById('auth-form').reset()
        $('#disconnected-container').show();
        $('#connected-container').hide();
        chrome.storage.sync.clear()
    })
})
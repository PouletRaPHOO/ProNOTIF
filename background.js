const checkId = () => {
    chrome.storage.sync.get('status', function(connected) {
        if (connected.status) {
            const parse = (date) => {
                date = new Date(date)
                return date
            }
            chrome.storage.sync.get(['0', '1', '2', '3'], function(oldMessages) {
                chrome.storage.sync.get('url', async function(lien) {
                    const url = lien.url
                    response = await $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        success: (data) => {
                            return data
                        }
                    })
                    .fail(function () {
                        const notifLogged = {
                            type: 'basic',
                            iconUrl: 'logos/logo128.png',
                            title: 'Mauvais identifiants',
                            message: 'Un problème est survenu lors de la connexion à Pronote, veuillez vous déconnecter'
                        };
                        chrome.notifications.create("Logged", notifLogged)
                    }).catch(()=>{ return })

                    if (response[0].title) {
                        for (let k = 0; k < response.length; k++) {
                            console.log(`call api | titre du message n°${k+1} : ${response[k].title}`);
                            console.log(`call storage | titre du message n°${k+1} : ${oldMessages[k].title}`);
                            if (response[k].title !== oldMessages[k].title) {
                                date = parse(response[k].date)
                                mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
                                joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
                                dateString = `${joursSemaine[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]} ${date.getFullYear()}`
                                
                                const notif = {
                                    type: 'basic',
                                    iconUrl: 'logos/logo128.png',
                                    title: response[k].title,
                                    message: dateString,
                                    requireInteraction: true,
                                    buttons: [{
                                        title: "Marqué comme lu",
                                        iconUrl: "./logos/draft.svg"
                                    }]
                                };
            
                                chrome.notifications.create("Notification Pronote", notif)
                                let messages = {}
                                    messages[0] = {
                                        title: response[0].title,
                                        date: response[0].date,
                                        content: response[0].htmlContent
                                    }
                                    messages[1] = {
                                        title: response[1].title,
                                        date: response[1].date,
                                        content: response[1].htmlContent
                                    }
                                    messages[2] = {
                                        title: response[2].title,
                                        date: response[2].date,
                                        content: response[2].htmlContent
                                    }
                                    messages[3] = {
                                        title: response[3].title,
                                        date: response[3].date,
                                        content: response[3].htmlContent
                                    }
                                chrome.storage.sync.set(messages, function() {
                                    chrome.storage.sync.get('number', function(badge) {
                                        let number = badge.number + 1
                                        if (number < 0) {
                                            number = 0
                                        }
                                        chrome.browserAction.setBadgeText({
                                            "text": number.toString()
                                        })
                                    })
                                })
                                break;
                            }
                        }
                    }
                    else {
                        return
                    }
                    
                })
            })
        }
    })
    setTimeout(checkId, 10000);
};checkId();

chrome.browserAction.setBadgeText({"text": "0"}, () => {
    let badge = {}
    badge["number"] = 0
    chrome.storage.sync.set(badge, function(){})
});

chrome.notifications.onButtonClicked.addListener((notificationId) => {
    chrome.storage.sync.get('number', function(badge) {
        let number = badge.number - 1
        if (number < 0) {
            number = number = 0
        }
        chrome.browserAction.setBadgeText({
            "text": number.toString()
        })
        chrome.notifications.clear(notificationId)
    })
})

chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.notifications.clear(notificationId)
})



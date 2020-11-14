function checkId() {
    chrome.storage.sync.get('status', function(connected){
        if (connected.status) {
            const parse = (date) => {
                date = new Date(date)
                return date
            }
            chrome.storage.sync.get(['0', '1', '2', '3'], function(oldMessages){

                chrome.storage.sync.get('url', async function(lien) {
                    const url = lien.url
                    response = await $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'json',
                        success: (data) => {
                            return data
                        },
                        error: () => {
                            return "500"
                        }
                    })
                    if (response.length === 4) {
                        for (let k = 0; k < response.length; k++) {
                            if (response[k].title !== oldMessages[k].title) {
                                date = parse(response[k].date)
                                mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
                                joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
                                dateString = `${joursSemaine[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]} ${date.getFullYear()}`
                                
                                const notif = {
                                    type: 'basic',
                                    iconUrl: 'logos/logo128.png',
                                    title: response[k].title,
                                    message: dateString
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
                                })
                                break;
                            } else {
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
                            })
                            break;
                            }
                        }
                    }
                    else {
                        console.log("nonnn")
                    }
                    
                })
            })
        }
    })
    setTimeout(checkId,60000*3);
}

checkId()
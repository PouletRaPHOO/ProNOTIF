$(function(){

    mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    const parse = (date) => {
        date = new Date(date)
        return date
    }
    const jourSem = (date) => {
        let i=0
        while (i!== date.getDay()&&i>6) {
            date=joursSemaine[i]
        }
        return date
    }
    const moisAn = (date) => {
        let i=0
        while (i!== date.getMonth()) {
            date=mois[i]
        }
    }


    chrome.storage.sync.get(["0","1","2","3"], function(Distribution){
        for (let i=0;i<Object.keys(Distribution).length;i++) {
            console.log(Distribution[i])
            $(`#msg${i}`).html(Distribution[i].content)
            $(`#title${i}`).text(Distribution[i].title)
            dateOriginal =parse(Distribution[i].date)
            dateMsg = `${jourSem(dateOriginal)}${dateOriginal.getDate}${moisAn(dateOriginal)}${dateOriginal.getYear}`
            $(`#date${i}`).text(dateMsg)
        }
    })
})
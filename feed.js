$(function(){
    chrome.storage.sync.get('url', function(connected){
        selectorsIcon = document.querySelectorAll(".icon-go-see");
        for (let i = 0; i < selectorsIcon.length; i++) {
            selectorsIcon[i].addEventListener("click", function (e) {
                url = connected.url.split('?')[1].split('=')[1].split("&")[0] + "?login=true";
                var win = window.open(url, '_blank');
                win.focus();
            });
        }
    })
    $('.menu-container').css('display',"block");
    $('#inbox-button').on("click", () => {
        window.location.href = "popup.html"
    })

    mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    const parse = (date) => {
        date = new Date(date)
        return date}
    const jourSem = (date) => {
        let i=0
        Jour=date.getDay()
        while (i!== Jour && i<6) {
            date=joursSemaine[i]
            i++}
        return date}
    const moisAn = (date) => {
        let i=0
        Mois=date.getMonth()
        while (i!== Mois && i<11) {
            date=mois[i]
            i++}
        return date}
    chrome.storage.sync.get(["0","1","2","3"], function(Distribution){
        for (let i = 0; i < Object.keys(Distribution).length; i++) {
            $(`#msg-${i} .message-content`).html(Distribution[i].content)
            $(`#msg-${i} .message-title h3`).text(Distribution[i].title)
            dateOriginal = parse(Distribution[i].date)
            dateMsg = `${jourSem(dateOriginal)} ${dateOriginal.getDate()} ${moisAn(dateOriginal)} ${dateOriginal.getFullYear()}`
            $(`#msg-${i} .message-title span`).text(dateMsg)
        }
    })
})
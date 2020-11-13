function checkId() {
    chrome.storage.sync.get(['Adresse','Password','Auth'], function(authentifications){
        console.log(authentifications.Adresse)
        Adresse = authentifications.Adresse;
        Auth = authentifications.Auth;
        Password =authentifications.Password;
    })
    setTimeout(checkId,60000);
}
setTimeout(checkId,1000)

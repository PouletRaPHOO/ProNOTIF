
chrome.storage.sync.get(['Adresse','Password','Auth'], function(authentifications){
    console.log(authentifications.Adresse)
    Adresse = authentifications.Adresse;
    Auth = authentifications.Auth;
    Password =authentifications.Password;
})
console.log("pouet")
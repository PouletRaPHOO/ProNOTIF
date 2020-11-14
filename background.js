function checkId() {
    chrome.storage.sync.get(['adresse','password','id'], function(authentifications){
        adresse = authentifications.adresse;
        id = authentifications.id;
        password =authentifications.password;
        console.log(adresse, id, password)
    });
}

checkId()
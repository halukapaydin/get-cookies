function showCookiesForTab(tabs) {
    //get the first tab object in the array
    let tab = tabs.pop();

    //get all cookies in the domain
    const gettingAllCookies = browser.cookies.getAll({url: tab.url});
    gettingAllCookies.then((cookies) => {
        //set the header of the panel
        const activeTabUrl = document.getElementById('header-title');
        const text = document.createTextNode("Cookies at: " + tab.url);
        activeTabUrl.appendChild(text);

        let cookieJson = "No cookies in this tab."
        if (cookies && cookies.length > 0) {
            cookieJson = cookiesToString(cookies);
        }
        let cookieJsonElement = document.getElementById("cookieJson");
        cookieJsonElement.value = cookieJson;
    });

    let localStorageGet = browser.storage.local.get();
    localStorageGet.then((items)=>{
        let localStorageJsonElement = document.getElementById("localStorageJson");
        localStorageJsonElement.value = JSON.stringify(items);
    }, (error)=>{
        let localStorageJsonElement = document.getElementById("localStorageJson");
        localStorageJsonElement.value = JSON.stringify(error);
    });

}
function cookiesToString(cookies) {
    let join = cookies.map(cookie=>{
        return JSON.stringify({
            name : cookie.name,
            value : cookie.value,
            path : cookie.path,
            domain : cookie.domain,
            isHttpOnly : cookie.isHttpOnly,
            expiry : cookie.expiry
        })
    });
    return JSON.stringify(join);
}


//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
    return browser.tabs.query({currentWindow: true, active: true});
}

function copyCookieJson() {
    const copyText = document.getElementById("cookieJson");
    copyText.select();
    document.execCommand("copy");
}

function copyLocalStorageJson() {
    const copyText = document.getElementById("localStorageJson");
    copyText.select();
    document.execCommand("copy");
}
document.getElementById("copyCookieJson").addEventListener("click", copyCookieJson);
document.getElementById("copyLocalStorageJson").addEventListener("click", copyLocalStorageJson);
getActiveTab().then(showCookiesForTab);
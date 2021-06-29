var cookieJson;

function showCookiesForTab(tabs) {
    //get the first tab object in the array
    let tab = tabs.pop();

    //get all cookies in the domain
    var gettingAllCookies = browser.cookies.getAll({url: tab.url});
    gettingAllCookies.then((cookies) => {

        //set the header of the panel
        var activeTabUrl = document.getElementById('header-title');
        var text = document.createTextNode("Cookies at: " + tab.url);
        var cookieList = document.getElementById('cookie-list');
        activeTabUrl.appendChild(text);

        if (cookies.length > 0) {
            cookieJson = cookiesToString(cookies);
            let jsonElement = document.getElementById("json");
            jsonElement.value = cookieJson;
        } else {
            let p = document.createElement("p");
            let content = document.createTextNode("No cookies in this tab.");
            let parent = cookieList.parentNode;

            p.appendChild(content);
            parent.appendChild(p);
        }
    });
}
function cookiesToString(cookies) {
    let join = cookies.map(cookie=>{
        return JSON.stringify(cookie)
    });
    return JSON.stringify(join);
}


//get active tab to run an callback function.
//it sends to our callback an array of tab objects
function getActiveTab() {
    return browser.tabs.query({currentWindow: true, active: true});
}

function copy() {
    var copyText = document.getElementById("json");
    copyText.select();
    document.execCommand("copy");
}

document.getElementById("copy").addEventListener("click", copy);
getActiveTab().then(showCookiesForTab);
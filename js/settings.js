function readSetting(name) {
    return JSON.parse(localStorage.getItem(name));
    // return JSON.parse(Cookies.get(name));
}

function hasSetting(name) {
    var val = localStorage.getItem(name);
    return val !== null && val !== "undefined";
    // return Cookies.get(name) !== undefined;
}

function saveSetting(name, value) {
    var json = JSON.stringify(value);
    localStorage.setItem(name, json);
    // return Cookies.get(name, json);
}

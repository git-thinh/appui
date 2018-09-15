
var CF = {
    //API_URL_SRC_JS_WORKER: 'https://raw.githubusercontent.com/git-thinh/appui/master/api.js',
    API_URL_SRC_JS_UNDERSCORE: 'http://localhost:60000/underscore.min.js',
    API_URL_SRC_JS_WORKER: 'http://localhost:60000/api.js',
};

var URI_KEY = {
    JS_WORKER: 'JS_WORKER',
    JS_UNDERSCORE: 'URI_JS_UNDERSCORE',
    JS_CONFIG: 'URI_JS_CONFIG',
}

var API_KEY = {
    CACHE_URI: 'CACHE_URI',
};

var PRJ = {};


function f_load(url, type) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    if (type == 'text') return xhr.responseText;
    return JSON.parse(xhr.responseText);
}


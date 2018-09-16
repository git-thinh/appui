//https://drive.google.com/file/d/1FjcvppjaJ-f-b8LihqCjg-gBLZF7WMHb/view
//https://docs.google.com/document/d/1FjcvppjaJ-f-b8LihqCjg-gBLZF7WMHb/export?format=txt
//https://drive.google.com/uc?export=download&id=1FjcvppjaJ-f-b8LihqCjg-gBLZF7WMHb
//https://raw.githubusercontent.com/git-thinh/appui/master/_.txt

//https://htmlpreview.github.io/

//https://raw.githubusercontent.com/git-thinh/appui/master/index.html

//https://rawgit.com/git-thinh/appui/master/index.html
//https://cdn.rawgit.com/git-thinh/appui/master/index.html

//file:///D:/Projects/appui/index.html
//http://localhost:60000/index.html

// #region [ CONFIG ]

var APP = {
    HOST: '',
    URL: '',
    TEXT: '',
};

var CF = {
    API_URL_SRC_JS_UNDERSCORE: 'lib/underscore.min.js',
    API_URL_SRC_JS_WORKER: 'api.js',
};

var URI_KEY = {
    JS_WORKER: 'JS_WORKER',
    JS_UNDERSCORE: 'URI_JS_UNDERSCORE',
    JS_CONFIG: 'URI_JS_CONFIG',
}

var API_KEY = {
    APP_INFO: 'APP_INFO',
    CACHE_URI: 'CACHE_URI',
};

var PRJ = {};

// #endregion

function f_load(url, type) {
    if (url.indexOf('http') != 0) url += APP.HOST + url;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    console.log(url, { status: xhr.status, statusText: xhr.statusText });
    if (type == 'text') return xhr.responseText;
    return JSON.parse(xhr.responseText);
}

// #region [ DOM - BLOB ]

function f_dom_addJs(key, url, f_callback) { f_dom_addJsAppend(key, url, null, null, f_callback); }

function f_dom_addJsAppend(key, url, appendBefore, appendAfter, f_callback) {
    var text = f_load(url, 'text');
    if (appendBefore) text = appendBefore + text;
    if (appendAfter) text += appendAfter;

    var blob = f_blob_createUrlText(key, url, text, 'text/javascript');

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('for', key);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', blob.blobUrl);
    script.onload = function () {
        var isChrome25 = navigator.userAgent.indexOf('Chrome/25') != -1;
        setTimeout(function () { f_callback(blob); }, (isChrome25 ? 70 : 30));
    };
    head.appendChild(script);
}

function f_blob_createUrlText(key, url, text, type) {
    window.URL = window.URL || window.webkitURL;
    var blob = new Blob([text], { type: type });
    var blobUrl = window.URL.createObjectURL(blob);
    return { Key: key, Url: url, blobUrl: blobUrl, Text: text, Type: type, Blob: blob };
}

// #endregion

// #region [ MAIN - FRAME ]

var API;
function f_main_uiInit(host, blobUrlConfig, textConfig) {
    APP.HOST = host;
    APP.TEXT = textConfig;
    APP.URL = blobUrlConfig;
    console.log('APP', APP);

    //Load underScore
    var usJs = f_load(CF.API_URL_SRC_JS_UNDERSCORE, 'text');
    var underScoreMsg = f_blob_createUrlText(URI_KEY.JS_UNDERSCORE, CF.API_URL_SRC_JS_UNDERSCORE, usJs, 'text/javascript');

    //Setup worker
    var apiJs = usJs + ' ; ' + APP.TEXT + ' ; ' + f_load(CF.API_URL_SRC_JS_WORKER, 'text');
    var apiMsg = f_blob_createUrlText(URI_KEY.JS_WORKER, CF.API_URL_SRC_JS_WORKER, apiJs, 'text/javascript');

    API = new Worker(apiMsg.blobUrl);
    API.onmessage = function (e) {
        var m = e.data;
        if (m == null) return;
        switch (m.Key) {
            case 'API_LOG':
                console.log(m.Value1, m.Value2);
                break;
            default:
                console.log(m);
                break;
        }
    };

    //console.log(underScoreMsg.Url, underScoreMsg);
    //console.log(apiMsg.Url, apiMsg);

    API.postMessage({ Key: API_KEY.APP_INFO, Input: APP });
    API.postMessage({ Key: API_KEY.CACHE_URI, Input: apiMsg });
    API.postMessage({ Key: API_KEY.CACHE_URI, Input: underScoreMsg });
}

//function f_main_uiReady() {
//    /* DOMContentLoaded may fire before your script has a chance to run, so check before adding a listener */
//    if (document.readyState === "loading") {
//        document.addEventListener("DOMContentLoaded", f_main_uiInit);
//    } else {
//        console.log('DOMContentLoaded already fired');
//        f_main_uiInit();
//    }
//}

//function f_fame_uiReady() { }

// #endregion


/***************************/


// #region [ CONFIG ]

APP = {
    HOST: '',
    URL: '',
    TEXT: '',
};

CF = {
    API_URL_SRC_JS_CONFIG: 'http://localhost:60000/config.js',
    API_URL_SRC_JS_UNDERSCORE: 'http://localhost:60000/lib/underscore.min.js',
    API_URL_SRC_JS_WORKER: 'http://localhost:60000/api.js',
    //API_URL_SRC_JS_WORKER: 'https://raw.githubusercontent.com/git-thinh/appui/master/api.js',
};

URI_KEY = {
    JS_WORKER: 'JS_WORKER',
    JS_UNDERSCORE: 'URI_JS_UNDERSCORE',
    JS_CONFIG: 'URI_JS_CONFIG',
}

API_KEY = {
    APP_INFO: 'APP_INFO',
    CACHE_URI: 'CACHE_URI',
};

PRJ = {};

// #endregion

if (!self['console']) {
    self.console = {};
    self.console.info = function () { };
    self.console.log = function (v1, v2) { self.postMessage({ Key: 'API_LOG', Value1: v1, Value2: v2 }); };
    self.console.warn = function () { };
    self.console.error = function () { };
}

var CACHE_URI = {};

var API_ID = 'api-id-xxxxx-xxxx-4xxx-yxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

self.addEventListener('message', function (e) {    
    //console.log('API:', e.data);

    var m = e.data;
    if (m == null) return;
    var input = m.Input;

    switch (m.Key) {
        case API_KEY.APP_INFO:
            APP = input;
            console.log('API -> ' + m.Key, input);
            break;
        case API_KEY.CACHE_URI:
            console.log('API -> ' + m.Key, input);
            break;
        case 'TEST':
            console.log('API: UI -> CONNECTED ...');

            var blob = new Blob(['body { background-color: yellow; }'], { type: 'text/css' });
            self.postMessage(blob);

            break;
        default:
            //if (e.data.Url != null || (Array.isArray(e.data) && e.data.length > 0 && e.data[0].Url != null)) {
            //    f_request_Api(e, e.ports[0]);
            //} else {
            //    Via.OnMessage(e.data);
            //}
            break;
    }
}, false);
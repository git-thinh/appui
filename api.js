
/***************************/
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
        case API_KEY.CACHE_URI:
            console.log('API: -> CACHE_URI:', input);

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
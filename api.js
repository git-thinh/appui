var API_ID = 'api-id-xxxxx-xxxx-4xxx-yxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

// #region [ LOG ]

var WS_LOG, LOG_OPEN = false;

if ('WebSocket' in self) {
    WS_LOG = new WebSocket('ws://localhost:11111');
    WS_LOG.onopen = function () { f_log1(API_ID); LOG_OPEN = true; };
    WS_LOG.onclose = function () { };
    WS_LOG.onmessage = function (e) { if (_view) console.log(e.data); };
}

function f_log1(data) {
    if (WS_LOG && data && LOG_OPEN) {
        if (typeof data == 'string')
            WS_LOG.send(data);
        else
            WS_LOG.send(JSON.stringify(data));
    }
}

function f_log2(data1, data2) {
    if (WS_LOG && LOG_OPEN) {
        var s = '';
        if (data1) { if (typeof data1 == 'string') s = data1; else s = JSON.stringify(data1); }
        if (data2) { if (typeof data2 == 'string') s += ' ===== ' + data2; else s += ' ===== ' + JSON.stringify(data2); }
        WS_LOG.send(s);
    }
}

// #endregion

self.addEventListener('message', function (e) {

    self.postMessage({ 'API: ====> data: ': e.data });

    switch (e.data) {
        case 'CONNECT':
            f_log1('API: UI -> CONNECTED ...');

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
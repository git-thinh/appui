var API_ID = 'api-id-xxxxx-xxxx-4xxx-yxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

// #region [ LOG ]

var WS_LOG;

if ('WebSocket' in self) {
    WS_LOG = new WebSocket('ws://192.168.81.216:56789');
    WS_LOG.onopen = function () { };
    WS_LOG.onclose = function () { };
    WS_LOG.onmessage = function (e) { if (_view) console.log(e.data); };
}

function f_log1(data) {
    if (WS_LOG && data) {
        if (typeof data == 'string')
            WS_LOG.send(data);
        else
            WS_LOG.send(JSON.stringify(data));
    }
}

function f_log2(data1, data2) {
    if (WS_LOG) {
        var s = '';
        if (data1) { if (typeof data1 == 'string') s = data1; else s = JSON.stringify(data1); }
        if (data2) { if (typeof data2 == 'string') s += ' ===== ' + data2; else s += ' ===== ' + JSON.stringify(data2); }
        WS_LOG.send(s);
    }
}

// #endregion

var MSG_UI;
self.addEventListener('message', function (e) {
    var sender = e.ports[0];
    if (sender == null) sender = self;

    sender.postMessage({ '====> data: ': e.data });

    switch (e.data) {
        case 'CONNECT':
            MSG_UI = e.ports[0];
            MSG_UI.onmessage = function (evt) {
                //f_log('SERVICE_API => ', evt.data);
            };
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

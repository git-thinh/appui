var MSG_UI;

self.console.log('123');

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

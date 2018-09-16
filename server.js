
var http = require('http');

http.createServer(function (req, res) {

    var urls = {
        local: ['http://192.168.0.103:60000/api.js'],
        online:[]
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(urls));

}).listen(12345);

console.log('http://*:12345');
'use strict';
var http = require('http');

var port = process.env.PORT || 8080;

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

server.listen(port);

console.log("Server running at http://127.0.0.1:8000/");

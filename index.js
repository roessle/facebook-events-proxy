'use strict';
var http = require('http');
var https = require('https');

var page = "gasthof.roessle"
var port = process.env.PORT || 8080;
var appId = process.env.FB_APP_ID
var appSecret = process.env.FB_APP_SECRET

var baseURL = "https://graph.facebook.com";
var tokenURL = "#{baseURL}/oauth/access_token?client_id=#{appID}&client_secret=#{appSecret}&grant_type=client_credentials";

var accessToken = appId + "|" + appSecret
var path = "/v2.5/" + page + "/events?access_token=" + accessToken + "&format=json"
var httpOptions = {
  hostname: "graph.facebook.com",
  port: 443,
  path: path,
  method: "GET",
  headers: {
    'Accept': "application/json"
  }
};


var server = http.createServer(function (request, response) {
  https.get(httpOptions, function(fbRes) {
    console.log(fbRes);
    if (fbRes.statusCode === 200) {
      response.writeHead(fbRes.statusCode, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": fbRes.headers["content-type"],
        "ETag": fbRes.headers["etag"],
        "facebook-api-version": fbRes.headers["facebook-api-version"]
      });
      fbRes.pipe(response, {end:true});
    } else {
      response.writeHead(fbRes.statusCode, {"Content-Type": "application/json"});
      response.end({ message: "error" });
    }
  });
});

server.listen(port);

console.log("Server running at port " + port + "\n");

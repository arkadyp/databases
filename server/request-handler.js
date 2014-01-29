/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var _ = require('underscore');
var fs = require('fs');

var msgs = fs.readFileSync('storage.txt', 'utf8');

if(msgs[0] === ',') { //remove leading comma
  msgs = msgs.slice(1);
}
msgs = '[' + msgs + ']';

var storage = {"results": JSON.parse(msgs)};

var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  // console.log("Serving request type " + request.method + " for url " + request.url);

  var endResponse = function(statusCode, messages) {
    messages = messages || storage;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages));
  };

  var serveIndex = function() {
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/html";
    response.writeHead(200, headers);
    response.end(fs.readFileSync('client/index.html'));
  };

  var buildCustomMessages = function(options) {
    var messages = {};

    //filter by roomname
    console.log(options);
    if('where' in options) {
      var roomname = JSON.parse(options.where).roomname;
      messages.results = _.filter(storage.results, function(message){
        if(message.roomname === roomname) {
          return message;
        }
      });
    } else {
      messages.results = storage.results.slice(0);
    }

    //order by
    if(options.order === '-createdAt') {
      messages.results.sort(function(a,b) {
        a = new Date(a.createdAt);
        b = new Date(b.createdAt);
        return b - a;
      });
    }

    // console.log(options.limit);
    if (options.limit){
      messages.results = messages.results.slice(0, options.limit);
    }

    return messages;
  }

  var url = require('url').parse(request.url);

  var urlParse = require('url').parse(request.url, true, true);

  if(url.path.slice(0, 8) !== '/classes'){
    endResponse(404);
  } else {
    if(request.method === 'OPTIONS') {
      endResponse(200);
    } else if (request.method === "POST" && url.path.slice(url.path.length - 5, url.path.length) === '/send'){
      var msg = "";
      request.on('data', function (data) {
        msg += data;
      });
      request.on('end', function() {
        msg = JSON.parse(msg);
        msg.createdAt = new Date();
        msg.updatedAt = new Date();
        storage.results.unshift(msg);
        fs.appendFile('storage.txt', ',' + JSON.stringify(msg),'utf8', function(){
          console.log("Storage updated with: ", JSON.stringify(msg));
        });
        endResponse(201);
      })
    } else if(request.method === 'GET'){
      var reqOptions = require('querystring').parse(url.path);
      // console.log(reqOptions);
      var messages = buildCustomMessages(reqOptions);
      endResponse(200, messages);
    } else {
      endResponse(404);
    }
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.handleRequest = handleRequest;

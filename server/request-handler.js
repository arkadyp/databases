/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var testResponse = {"results":
  [
    {"username":"pinky_pie","text":"Oh, gosh. Node is sooOOoo hard!","roomname":"nodejs","createdAt":"2014-01-27T20:27:40.528Z","updatedAt":"2014-01-27T20:27:40.528Z","objectId":"ltH2Va7xKe"},
    {"username":"bv","text":"Nothing life the smell of node in the morning ","roomname":"nodejs","createdAt":"2014-01-27T20:18:58.670Z","updatedAt":"2014-01-27T20:18:58.670Z","objectId":"e1T2TkeKCg"},
    {"username":"bv","text":"...","roomname":"main","createdAt":"2014-01-27T20:01:08.511Z","updatedAt":"2014-01-27T20:01:08.511Z","objectId":"6bTN1V0Dnp"},
    {"username":"aut","text":"hiya","roomname":"main","createdAt":"2014-01-27T19:57:55.977Z","updatedAt":"2014-01-27T19:57:55.977Z","objectId":"QA9OcXO3cq"},
    {"username":"David","text":"tesstststs","roomname":"heeeeeeeeeeelp","createdAt":"2014-01-27T19:56:17.881Z","updatedAt":"2014-01-27T19:56:17.881Z","objectId":"vrA125C5BU"},
  ]
};

var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);
  var url = require('url').parse(request.url);
  console.log(url);


  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  response.write(JSON.stringify(testResponse));
  response.end();
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = handleRequest;

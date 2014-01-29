/* Import node's http module: */
var http = require("http");
var handler = require("./request-handler");
var fs = require('fs');

var port = 8080;
var ip = "127.0.0.1";

var routes = {
  "/"                                              : {'path':'client/index.html',                                     'type':'text/html'},
  "/index.html"                                    : {'path':'client/index.html',                                     'type':'text/html'},
  "/styles/styles.css"                             : {'path':'client/styles/styles.css',                              'type':'text/css'},
  "/scripts/app.js"                                : {'path':'client/scripts/app.js',                                 'type':'text/javascript'},
  "/bower_components/jquery/jquery.min.js"         : {'path':'client/bower_components/jquery/jquery.min.js',          'type':'text/javascript'},
  "/bower_components/underscore/underscore-min.js" : {'path':'client/bower_components/underscore/underscore-min.js',  'type':'text/javascript'},
  "/bower_components/jquery/jquery.min.map"        : {'path':'client/bower_components/jquery/jquery.min.map',         'type':'text/javascript'},
  "/bower_components/underscore/underscore-min.map": {'path':'client/bower_components/underscore/underscore-min.map', 'type':'text/javascript'},
};

var server = http.createServer(function(req,res){
  
  if (!req.url.match("classes")){
    var router = function(req,res){
      if (routes[req.url]){
        var html = fs.readFileSync(routes[req.url].path, 'utf8');
        res.writeHead(200, {'Content-Type': routes[req.url].type});
        res.end(html);
      } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<html><head><link rel="stylesheet" href="/styles/styles.css"></head><body style="text-align: center"><h1>IDIOT</h1></body></html>');
      }
    }
    router(req,res);
  }
  handler.handleRequest(req, res);

});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
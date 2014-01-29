/* Import node's http module: */
var http = require("http");
var handler = require("./request-handler");
var fs = require('fs');
/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */
var port = 8080;

/* For now, since you're running this server on your local machine,
 * we'll have it listen on the IP address 127.0.0.1, which is a
 * special address that always refers to localhost. */
var ip = "127.0.0.1";

/* We use node's http module to create a server. Note, we called it 'server', but
we could have called it anything (myServer, blahblah, etc.). The function we pass it (handleRequest)
will, unsurprisingly, handle all incoming requests. (ps: 'handleRequest' is in the 'request-handler' file).
Lastly, we tell the server we made to listen on the given port and IP. */

var server = http.createServer(function(req,res){
  console.log(req.url);
 if(req.url === "/"){ //req.url has the pathname, check if it conatins '.html'
    var html = fs.readFileSync('client/index.html', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  } else if(req.url.indexOf('.html') != -1){ //req.url has the pathname, check if it conatins '.html'
    var html = fs.readFileSync('client/index.html', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  } else if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'
    var css = fs.readFileSync('client/styles/styles.css', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(css);
  } else if(req.url.indexOf('app.js') != -1){ //req.url has the pathname, check if it conatins '.js'
    var app = fs.readFileSync('client/scripts/app.js', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(app);
  } else if(req.url.indexOf('config.js') != -1){ //req.url has the pathname, check if it conatins '.js'
    var config = fs.readFileSync('client/scripts/config.js', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(config);
  } else if(req.url.indexOf('jquery.min.js') != -1){ //req.url has the pathname, check if it conatins '.js'
    var jquery = fs.readFileSync('client/bower_components/jquery/jquery.min.js', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(jquery);
  } else if(req.url.indexOf('underscore-min.js') != -1){ //req.url has the pathname, check if it conatins '.js'
    var underscore = fs.readFileSync('client/bower_components/underscore/underscore-min.js', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(underscore);
  } else if(req.url.indexOf('jquery.min.map') != -1){ //req.url has the pathname, check if it conatins '.js'
    var jquery = fs.readFileSync('client/bower_components/jquery/jquery.min.map', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(jquery);
  } else if(req.url.indexOf('underscore-min.map') != -1){ //req.url has the pathname, check if it conatins '.js'
    var underscore = fs.readFileSync('client/bower_components/underscore/underscore-min.map', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(underscore);
  }

  handler.handleRequest(req, res);
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */

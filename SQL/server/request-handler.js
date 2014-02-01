var _ = require('underscore');
var fs = require('fs');
var helpers = require('./http-helpers');
var database = require('./database');

var objectId = 1;

var messages = [
  {
    username: 'bob',
    text: 'hello world',
    objectId: objectId
  }
];

var getAll = function(request, response) {
  console.log('GET attempt');
  var querystring = "select a.username, b.text from users a left join messages b on a.id = b.id_users;";
  database.queryDB(querystring, function(err, data){
    if(err) { throw err; }
    helpers.sendResponse(response, {'results': data}, 200);
  });
};

var createMessage = function(request, response) {
  console.log('post attempt');
  helpers.sendResponse(response, null);
};

var corsOptions = function(request, response) {
  console.log('OPTIONS attempt');
  helpers.sendResponse(response, null);
};

var methods = {
  'GET': getAll,
  'POST': createMessage,
  'OPTIONS': corsOptions
};

module.exports = function(request, response) {
  var method = methods[request.method];
  method ? method(request, response) : helpers.sendResponse(response, null, 404);
};
















// var msgs = fs.readFileSync('storage.txt', 'utf8');

// if(msgs[0] === ',') { //remove leading comma
//   msgs = msgs.slice(1);
// }
// msgs = '[' + msgs + ']';

// var storage = {"results": JSON.parse(msgs)};

// var handleRequest = function(request, response) {

//   var endResponse = function(statusCode, messages) {
//     messages = messages || storage;
//     var headers = defaultCorsHeaders;
//     headers['Content-Type'] = "text/plain";
//     response.writeHead(statusCode, headers);
//     response.end(JSON.stringify(messages));
//   };

//   var buildCustomMessages = function(options) {
//     var messages = {};

//     //filter by roomname
//     console.log(options);
//     if('where' in options) {
//       var roomname = JSON.parse(options.where).roomname;
//       messages.results = _.filter(storage.results, function(message){
//         if(message.roomname === roomname) {
//           return message;
//         }
//       });
//     } else {
//       messages.results = storage.results.slice(0);
//     }

//     //order by
//     if(options.order === '-createdAt') {
//       messages.results.sort(function(a,b) {
//         a = new Date(a.createdAt);
//         b = new Date(b.createdAt);
//         return b - a;
//       });
//     }

//     // console.log(options.limit);
//     if (options.limit){
//       messages.results = messages.results.slice(0, options.limit);
//     }

//     return messages;
//   }

//   var url = require('url').parse(request.url);

//   var urlParse = require('url').parse(request.url, true, true);

//   if(url.path.slice(0, 8) !== '/classes'){
//     endResponse(404);
//   } else {
//     if(request.method === 'OPTIONS') {
//       endResponse(200);
//     } else if (request.method === "POST" && url.path.slice(url.path.length - 5, url.path.length) === '/send'){
//       var msg = "";
//       request.on('data', function (data) {
//         msg += data;
//       });
//       request.on('end', function() {
//         msg = JSON.parse(msg);
//         msg.createdAt = new Date();
//         msg.updatedAt = new Date();
//         storage.results.unshift(msg);
//         fs.appendFile('storage.txt', ',' + JSON.stringify(msg),'utf8', function(){
//           console.log("Storage updated with: ", JSON.stringify(msg));
//         });
//         endResponse(201);
//       })
//     } else if(request.method === 'GET'){
//       var reqOptions = require('querystring').parse(url.path);
//       var messages = buildCustomMessages(reqOptions);
//       endResponse(200, messages);
//     } else {
//       endResponse(404);
//     }
//   }

// };

// var defaultCorsHeaders = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10 // Seconds.
// };

// module.exports.handleRequest = handleRequest;

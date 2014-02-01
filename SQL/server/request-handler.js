var _ = require('underscore');
var fs = require('fs');
var helpers = require('./http-helpers');
var database = require('./database');
var url = require('url');

var buildQueryString = function(req){
  var options = require('querystring').parse(req.url);
  var responseStr = "select b.username, a.text, c.roomname from messages a inner join users b on a.id_users = b.id inner join rooms c on c.id = a.id_rooms;";

  if(options.where) {
    options.where = JSON.parse(options.where);
    console.log(options.where);
    if(options.where.roomname) {
      responseStr = responseStr.substring(0, responseStr.length - 1); //slice off semi colon
      responseStr += " and c.roomname = \"" + options.where.roomname + "\";";
    }
  }

  if (options.order === "-createdAt"){
    responseStr = responseStr.substring(0, responseStr.length - 1); //slice off semi colon
    responseStr += " order by a.created_at desc;";
  }

  if (options.limit){
    responseStr = responseStr.substring(0, responseStr.length - 1); //slice off semi colon
    responseStr += " LIMIT 0, " + options.limit + ";";
  }

console.log(responseStr);
return responseStr;

// { '/classes/': '',
//   order: '-createdAt',
//   limit: '15',
//   where: '{"roomname":"room2"}' }
// */

  // if (options.where.roomname){
    // SELECT * FROM #temp LIMIT 0, ????
  // }

/*
select b.username, a.text, c.roomname 
from messages a 
left join users b 
on a.id_users = b.id 
left join rooms c 
on c.id = a.id_rooms;";
*/


/*
select a.username, b.text
into #temp
from users a
left join messages b
  on a.id = b.id_users
  1.) and roomname = 
  2.) order by _______

select *
from #temp
limit 0, ?????
*/

  //check for room

  //check limit

  //check order
/*
{ '/classes/': '',
  order: '-createdAt',
  limit: '15',
  where: '{"roomname":"room2"}' }
*/
  // var responseStr = ";";
  // return responseStr;
};

var getMessages = function(req, response) {
  console.log('GET attempt');
  var querystring = buildQueryString(req);
  database.queryDB(querystring, function(err, data){
    if(err) { throw err; }
    helpers.sendResponse(response, {'results': data}, 200);
  });
};

var createMessage = function(req, response) {
  console.log('post attempt');
  helpers.sendResponse(response, null);
};

var corsOptions = function(req, response) {
  console.log('OPTIONS attempt');
  helpers.sendResponse(response, null);
};

var methods = {
  'GET': getMessages,
  'POST': createMessage,
  'OPTIONS': corsOptions
};

module.exports = function(req, response) {
  var method = methods[req.method];
  method ? method(req, response) : helpers.sendResponse(response, null, 404);
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

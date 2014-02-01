var _ = require('underscore');
var fs = require('fs');
var helpers = require('./http-helpers');
var database = require('./database');
var url = require('url');

var buildGetQueryString = function(req){
  var options = require('querystring').parse(req.url);
  var responseStr = "select b.username, a.text, c.roomname from messages a inner join users b on a.id_users = b.id inner join rooms c on c.id = a.id_rooms;";

  //filter roomname
  if(options.where) {
    options.where = JSON.parse(options.where);
    if(options.where.roomname) {
      responseStr = responseStr.substring(0, responseStr.length - 1); //slice off semi colon
      responseStr += " and c.roomname = \"" + options.where.roomname + "\";";
    }
  }

  //order messages chronologically
  if (options.order === "-createdAt"){
    responseStr = responseStr.substring(0, responseStr.length - 1); //slice off semi colon
    responseStr += " order by a.created_at desc;";
  }

  //limit # of msgs
  if (options.limit){
    responseStr = responseStr.substring(0, responseStr.length - 1); //slice off semi colon
    responseStr += " LIMIT 0, " + options.limit + ";";
  }

  return responseStr;
};
var buildPostQueryString = function(message, cb){
  var userId, roomId;

  var lookupUserId = function(cb){
    database.queryDB("select distinct id from users where username = \"" + message.username + "\";", function(err, rows, fields){
      if(rows[0]) {
        userId = rows[0].id;
      }
      cb();
    });
  };

  var createNewUser = function(username, cb){
    database.queryDB("insert into users (username, created_at) values ('" + username + "', now());", function(){
        lookupUserId(cb);
    });
  };

  var continueQuery = function(){
    database.queryDB("select distinct id from rooms where roomname = \"" + message.roomname + "\";", function(err, rows, fields){
      roomId = rows[0].id;
      console.log("user: " + userId + " and room: " + roomId);
      cb('insert into messages (id_users, id_rooms, text, created_at) values (' + userId + ',' + roomId + ',\"' + message.text + '\", now());');
    });
  };

  lookupUserId(function(){
    if(!userId) {
      createNewUser(message.username, continueQuery);
    } else {
      continueQuery();
    }
  });
};


var getMessages = function(req, response) {
  console.log('GET attempt');
  var querystring = buildGetQueryString(req);
  database.queryDB(querystring, function(err, data){
    if(err) { throw err; }
    helpers.sendResponse(response, {'results': data}, 200);
  });
};

var createMessage = function(req, response) {
  console.log('post attempt');
  helpers.collectData(req, function(message){
    buildPostQueryString(message, function(postQuery){
      database.queryDB(postQuery, function(err, data){
        if (err) throw err;
        helpers.sendResponse(response, data, 200);
      });
    });

  });
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

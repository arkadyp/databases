var _ = require('underscore');
var fs = require('fs');
var helpers = require('./http-helpers');
var database = require('./database');
var url = require('url');

var getMessages = function(req, response) {
  console.log('GET attempt');
  helpers.sendResponse(response, null);
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

/*
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
*/
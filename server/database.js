/////////////////////////////////////////////////////
//SET UP DATABASE CONNECTION
/////////////////////////////////////////////////////
var mysql = require('mysql');
var dbConnection;

exports.createDBConnection = function(){
  dbConnection = mysql.createConnection({
    user: "root",
    password: "",
    database: "blackopps"
  });
  dbConnection.connect();
};

exports.queryDB = function(queryString, cb) {
  dbConnection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    cb(err, rows, fields);
  });
};

exports.closeDBConnection = function(){
  if(dbConnection) {
    dbConnection.end();
  }
};
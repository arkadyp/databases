var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.sendResponse = function(response, object, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(object));
};

exports.collectData = function(request, cb){
  var collected = "";
  request.on('data', function(data){
    collected += data;
  });
  request.on('end', function(){
    cb(JSON.parse(collected));
  });
};
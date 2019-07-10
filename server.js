
var http = require('http');
var app = require('./app'); 
var port = 8080; 

var server = http.createServer(app);
server.listen(port); 
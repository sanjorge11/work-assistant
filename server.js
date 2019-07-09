
var http = require('http');
var port = 8080; 

var server = http.createServer(function (req, res) {
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("hello world"); 
  
    res.end(); 

  });
server.listen(port); 